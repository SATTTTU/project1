"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSetLocation } from "../api/post-location"
import { usegetLocation } from "../api/get-location"

export const UserLocation = () => {
  // Location data states
  const [location, setLocation] = useState(null)
  const [place, setPlace] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")

  // Status states
  const [locationError, setLocationError] = useState("")
  const [backendError, setBackendError] = useState("")
  const [permissionStatus, setPermissionStatus] = useState("prompt")
  const [isLocationFetched, setIsLocationFetched] = useState(false)
  const [isCheckingExistingLocation, setIsCheckingExistingLocation] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Location API hooks
  const { mutateAsync: getLocationAsync } = usegetLocation()
  const { mutateAsync: setLocationAsync } = useSetLocation()

  // Check permission status
  const checkPermissionStatus = async () => {
    if (!("permissions" in navigator)) {
      console.log("Permissions API not supported")
      return
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" })
      setPermissionStatus(result.state)

      result.onchange = () => {
        setPermissionStatus(result.state)
        if (result.state === "denied") {
          setIsLocationFetched(false)
        }
      }
    } catch (error) {
      console.error("Error checking permission:", error)
    }
  }

  // Fetch location using the browser's geolocation API
  const fetchLocation = async () => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by this browser.")
      return
    }

    setLocationError("")
    setBackendError("")
    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setPermissionStatus("granted")

        try {
          const API_KEY = import.meta.env.VITE_ROUTE_API_KEY
          const response = await axios.get(
            `https://api.openrouteservice.org/geocode/reverse?point.lat=${latitude}&point.lon=${longitude}&api_key=${API_KEY}`,
          )

          if (!response.data.features.length) {
            throw new Error("Could not find place name.")
          }

          const properties = response.data.features[0].properties
          const placeName = properties.label
          const cityName = properties.locality || properties.region || properties.country
          const street = properties.street || ""
          const locality = properties.locality || ""
          const region = properties.region || ""
          const country = properties.country || ""
          const fullAddress = `${street}, ${locality}, ${region}, ${country}`.replace(/, ,/g, "").trim()

          setPlace(placeName)
          setCity(cityName)
          setAddress(fullAddress)

          try {
            await setLocationAsync({
              latitude,
              longitude,
              city: cityName,
              address: fullAddress,
            })
            localStorage.setItem("locationSaved", "true")
            setIsLocationFetched(true)
          } catch (error) {
            if (error.response?.status === 400) {
              setBackendError("Your location is already stored.")
              localStorage.setItem("locationSaved", "true")
              setIsLocationFetched(true)
            } else {
              setBackendError("Error sending location to backend.")
            }
            console.error("Error sending location:", error)
          }
        } catch (error) {
          setLocationError("Error fetching address details.")
          console.error("Error fetching address:", error)
        }

        setIsLoading(false)
      },
      (error) => {
        setIsLoading(false)

        if (error.code === 1) {
          setPermissionStatus("denied")
          setLocationError("Location access was denied. Please enable location access in your browser settings.")
        } else if (error.code === 2) {
          setLocationError("Location information is unavailable.")
        } else if (error.code === 3) {
          setLocationError("The request to get user location timed out.")
        } else {
          setLocationError(error.message || "Error getting location.")
        }

        console.error("Geolocation error:", error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  // First, check if we have existing location data
  useEffect(() => {
    checkPermissionStatus()

    const checkExistingLocation = async () => {
      try {
        const response = await getLocationAsync()
        
        if (response?.data?.latitude && response?.data?.longitude) {
          setLocation({
            latitude: response.data.latitude,
            longitude: response.data.longitude,
          })
          if (response.data.city) setCity(response.data.city)
          if (response.data.address) setAddress(response.data.address)
          setIsLocationFetched(true)
          return
        }
        
        // If no existing location, trigger the browser prompt
        fetchLocation()
      } catch (error) {
        console.error("Error fetching existing location:", error)
        // If error checking existing location, try geolocation
        fetchLocation()
      } finally {
        setIsCheckingExistingLocation(false)
      }
    }

    checkExistingLocation()
  }, [getLocationAsync])

  const handleRetryLocation = () => {
    fetchLocation()
  }

  return (
      <div className="mb-4">
      

      {isCheckingExistingLocation && (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Checking for existing location data...</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Processing location data...</p>
        </div>
      )}

{/* {isLocationFetched && location && (
  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
    <h3 className="font-medium mb-2">Your Location</h3>
    <div className="space-y-1 text-sm">
      <p>Latitude: {location?.latitude?.toFixed?.(6) ?? 'N/A'}</p>
      <p>Longitude: {location?.longitude?.toFixed?.(6) ?? 'N/A'}</p>
      {city && <p>City: {city}</p>}
      {address && <p>Address: {address}</p>}
    </div>
  </div>
)} */}

      {locationError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{locationError}</p>
          {permissionStatus === "denied" && (
            <button
              onClick={handleRetryLocation}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          )}
        </div>
      )}

      {backendError && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800">{backendError}</p>
        </div>
      )}
    </div>
  )
}