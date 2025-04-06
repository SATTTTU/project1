"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { UseSetCookLocation } from "../api/setLocation"
import { UsegetCookLocation } from "../../profile/api/getCookLocation"
import { toast } from "react-toastify" // Add this import for toast notifications

export const CookLocation = () => {
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
  const { mutateAsync: getCookLocationAsync } = UsegetCookLocation()
  const { mutateAsync: setCookLocationAsync } = UseSetCookLocation()

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
        setIsLoading(false)
        return false
      }

      const permissionGranted = await requestPermission()
      if (!permissionGranted) {
        setLocationError("Could not get permission for location access.")
        setIsLoading(false)
        return false
      }
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            console.error("Geolocation error:", error.code, error.message)

            if (error.code === 1) {
              // Permission denied
              setPermissionStatus("denied")
              setLocationError(
                "Location access was denied. Please enable location access in your browser settings and refresh the page.",
              )
            } else if (error.code === 2) {
              setLocationError("Location information is unavailable.")
            } else if (error.code === 3) {
              setLocationError("The request to get user location timed out.")
            } else {
              setLocationError(error.message || "Error getting location.")
            }

            reject(error)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        )
      })

      console.log("Successfully got position")
      const { latitude, longitude } = position.coords
      setLocation({ latitude, longitude })
      setPermissionStatus("granted")

      const ROUTE = import.meta.env.VITE_ORS_API_KEY
      console.log("Using API key:", ROUTE ? "Available" : "Not available")

      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/reverse?point.lat=${latitude}&point.lon=${longitude}&api_key=${ROUTE}`,
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

      // Send location data to backend
      const locationData = {
        latitude,
        longitude,
        city: cityName,
        address: fullAddress,
      }

      await setCookLocationAsync(locationData)
      localStorage.setItem("cookLocationSaved", "true")
      setIsLocationFetched(true)
      toast.success("Location stored successfully!")
      return true
    } catch (error) {
      console.error("Error in fetching location:", error)

      if (error.response?.status === 400) {
        setBackendError("Your location is already stored.")
        localStorage.setItem("cookLocationSaved", "true")
        setIsLocationFetched(true)
        toast.success("Your location is already stored!")
        return true
      } else {
        setLocationError(error.message || "Error getting location.")
        toast.error(error.message || "Error getting location.")
        return false
      }
    } finally {
      setIsLoading(false)
    }
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
        setIsCheckingExistingLocation(false)
        return
      }

      try {
        console.log("Checking for existing cook location data...")
        const response = await getCookLocationAsync()
        console.log("Response from getCookLocationAsync:", response)

        // If data is null or undefined, ask user if they want to share location
        if (!response?.data) {
          console.log("No cook location data found (data is null), requesting location via browser")
          const locationSuccess = await fetchLocation()
          console.log("Location fetch result:", locationSuccess)

          if (!locationSuccess) {
            console.log("Failed to get location from browser, retrying once")
            // If first attempt fails, try once more with explicit permission request
            await fetchLocation(true)
          }
        } else if (response?.data?.latitude && response?.data?.longitude) {
          // We have valid location data
          console.log("Found existing cook location data, using it")
          setLocation({
            latitude: response.data.latitude,
            longitude: response.data.longitude,
          })
          if (response.data.city) setCity(response.data.city)
          if (response.data.address) setAddress(response.data.address)
          setIsLocationFetched(true)
          toast.success("Your location is already stored!")
        } else {
          // Unexpected data format, try browser geolocation
          console.log("Unexpected data format in response, trying browser geolocation")
          await fetchLocation()
        }
      } catch (error) {
        console.error("Error fetching existing cook location:", error)
        // If error checking existing location, ask user if they want to try geolocation
        console.log("Error checking existing location, trying browser geolocation")
        await fetchLocation()
      } finally {
        setIsCheckingExistingLocation(false)
      }
    }

    initializeLocation()
  }, [getCookLocationAsync])

  const handleRetryLocation = async () => {
    await fetchLocation(true)
  }

  return null // Don't render any UI elements
}

export default CookLocation

