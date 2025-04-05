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

  // Check permission status and handle previously denied permissions
  const checkPermissionStatus = async () => {
    if (!("permissions" in navigator)) {
      console.log("Permissions API not supported, will try geolocation directly")
      return "unknown"
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" })
      console.log("Current permission status:", result.state)
      setPermissionStatus(result.state)

      result.onchange = () => {
        console.log("Permission status changed to:", result.state)
        setPermissionStatus(result.state)
      }
      
      return result.state
    } catch (error) {
      console.error("Error checking permission:", error)
      return "unknown"
    }
  }

  // Request permission explicitly
  const requestPermission = () => {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        console.log("Geolocation not supported")
        resolve(false)
        return
      }

      // This will trigger the permission prompt if not previously set
      navigator.geolocation.getCurrentPosition(
        () => {
          console.log("Permission granted")
          resolve(true)
        },
        (error) => {
          console.log("Permission check failed:", error.message)
          resolve(false)
        },
        { timeout: 3000, maximumAge: 0 }
      )
    })
  }

  // Fetch location using the browser's geolocation API
  const fetchLocation = async (retryAttempt = false) => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by this browser.")
      return
    }

    setLocationError("")
    setBackendError("")
    setIsLoading(true)
    
    // If this is a retry attempt, try to request permission first
    if (retryAttempt) {
      const currentStatus = await checkPermissionStatus()
      console.log("Current permission status on retry:", currentStatus)
      
      if (currentStatus === "denied") {
        setLocationError("Location access is denied. Please enable location in your browser settings and refresh the page.")
        setIsLoading(false)
        return
      }
      
      const permissionGranted = await requestPermission()
      if (!permissionGranted) {
        setLocationError("Could not get permission for location access.")
        setIsLoading(false)
        return
      }
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("Successfully got position")
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
        setPermissionStatus("granted")

        try {
          const API_KEY = import.meta.env.VITE_ORS_API_KEY
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
        console.error("Geolocation error:", error.code, error.message)

        if (error.code === 1) {
          // Permission denied
          setPermissionStatus("denied")
          setLocationError("Location access was denied. Please enable location access in your browser settings and refresh the page.")
        } else if (error.code === 2) {
          setLocationError("Location information is unavailable.")
        } else if (error.code === 3) {
          setLocationError("The request to get user location timed out.")
        } else {
          setLocationError(error.message || "Error getting location.")
        }
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
    const initializeLocation = async () => {
      // First check permission status
      const initialPermission = await checkPermissionStatus()
      
      // If permission is already denied, show appropriate message
      if (initialPermission === "denied") {
        setLocationError("Location access is denied. Please enable location in your browser settings and refresh the page.")
        setIsCheckingExistingLocation(false)
        return
      }
      
      try {
        // Try to get existing location from backend
        console.log("Checking for existing location data...")
        const response = await getLocationAsync()
        
        // If we have success but null data, we need to get location from browser
        if (response?.success === true && response?.data === null) {
          console.log("Response indicates no location stored, will try browser geolocation")
          await fetchLocation()
          return
        }
        
        // If we have actual location data, use it
        if (response?.data?.latitude && response?.data?.longitude) {
          console.log("Found existing location data, using it")
          setLocation({
            latitude: response.data.latitude,
            longitude: response.data.longitude,
          })
          if (response.data.city) setCity(response.data.city)
          if (response.data.address) setAddress(response.data.address)
          setIsLocationFetched(true)
        } else {
          // No valid location data, try browser geolocation
          console.log("No valid location data found, trying browser geolocation")
          await fetchLocation()
        }
      } catch (error) {
        console.error("Error fetching existing location:", error)
        // If error checking existing location, try geolocation
        await fetchLocation()
      } finally {
        setIsCheckingExistingLocation(false)
      }
    }

    initializeLocation()
  }, [getLocationAsync])

  const handleRetryLocation = async () => {
    await fetchLocation(true)
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

      {locationError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{locationError}</p>
          <button
            onClick={handleRetryLocation}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {permissionStatus === "denied" ? "Update Settings & Try Again" : "Try Again"}
          </button>
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