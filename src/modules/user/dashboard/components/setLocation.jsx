"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useSetLocation } from "../api/post-location"
import { usegetLocation } from "../api/get-location"
import { toast } from "react-toastify" // Add this import for toast notifications

export const UserLocation = () => {
  // Location data states
  const [, setLocation] = useState(null)
  const [, setPlace] = useState("")
  const [, setCity] = useState("")
  const [, setAddress] = useState("")

  // Status states
  const [, setLocationError] = useState("")
  const [, setBackendError] = useState("")
  const [, setPermissionStatus] = useState("prompt")
  const [, setIsLocationFetched] = useState(false)
  const [, setIsCheckingExistingLocation] = useState(true)
  const [, setIsLoading] = useState(false)

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
        { timeout: 3000, maximumAge: 0 },
      )
    })
  }

  // Fetch location using the browser's geolocation API
  const fetchLocation = async (retryAttempt = false) => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by this browser.")
      toast.error("Geolocation is not supported by this browser.")
      return false
    }

    setLocationError("")
    setBackendError("")
    setIsLoading(true)

    // If this is a retry attempt, try to request permission first
    if (retryAttempt) {
      const currentStatus = await checkPermissionStatus()
      console.log("Current permission status on retry:", currentStatus)

      if (currentStatus === "denied") {
        setLocationError(
          "Location access is denied. Please enable location in your browser settings and refresh the page.",
        )
        toast.error("Location access is denied. Please enable location in your browser settings.")
        setIsLoading(false)
        return false
      }

      const permissionGranted = await requestPermission()
      if (!permissionGranted) {
        setLocationError("Could not get permission for location access.")
        toast.error("Could not get permission for location access.")
        setIsLoading(false)
        return false
      }
    }

    return new Promise((resolve) => {
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
              toast.success("Location stored successfully!")
              resolve(true)
            } catch (error) {
              if (error.response?.status === 400) {
                setBackendError("Your location is already stored.")
                localStorage.setItem("locationSaved", "true")
                setIsLocationFetched(true)
                toast.success("Your location is already stored!")
                resolve(true)
              } else {
                setBackendError("Error sending location to backend.")
                toast.error("Error sending location to backend.")
                resolve(false)
              }
              console.error("Error sending location:", error)
            }
          } catch (error) {
            setLocationError("Error fetching address details.")
            toast.error("Error fetching address details.")
            console.error("Error fetching address:", error)
            resolve(false)
          }

          setIsLoading(false)
        },
        (error) => {
          setIsLoading(false)
          console.error("Geolocation error:", error.code, error.message)

          if (error.code === 1) {
            // Permission denied
            setPermissionStatus("denied")
            setLocationError(
              "Location access was denied. Please enable location access in your browser settings and refresh the page.",
            )
            toast.error("Location access was denied. Please enable location access in your browser settings.")
          } else if (error.code === 2) {
            setLocationError("Location information is unavailable.")
            toast.error("Location information is unavailable.")
          } else if (error.code === 3) {
            setLocationError("The request to get user location timed out.")
            toast.error("The request to get user location timed out.")
          } else {
            setLocationError(error.message || "Error getting location.")
            toast.error(error.message || "Error getting location.")
          }
          resolve(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    })
  }

  // First, check if we have existing location data
  useEffect(() => {
    const initializeLocation = async () => {
      // First check permission status
      const initialPermission = await checkPermissionStatus()

      // If permission is already denied, show appropriate message
      if (initialPermission === "denied") {
        setLocationError(
          "Location access is denied. Please enable location in your browser settings and refresh the page.",
        )
        toast.error("Location access is denied. Please enable location in your browser settings.")
        setIsCheckingExistingLocation(false)
        return
      }

      try {
        console.log("Checking for existing location data...")
        const response = await getLocationAsync()

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
          toast.success("Your location is already stored!")
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

  return null // Don't render any UI elements
}

export default UserLocation

