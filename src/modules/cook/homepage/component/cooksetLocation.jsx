import { useEffect, useState } from "react";
import axios from "axios";
import { UseSetCookLocation } from "../api/setLocation";

export const CookLocation = () => {
  // Location data states
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  
  // Status states
  const [locationError, setLocationError] = useState("");
  const [backendError, setBackendError] = useState("");
  const [permissionStatus, setPermissionStatus] = useState("prompt");
  const [isLocationFetched, setIsLocationFetched] = useState(
    localStorage.getItem("locationSaved") === "true"
  );
  const [isLoading, setIsLoading] = useState(false);

  // Location API hook
  const { mutateAsync, isError, error, isSuccess } = UseSetCookLocation();

  // Check permission status and handle previously denied permissions
  const checkPermissionStatus = async () => {
    if (!("permissions" in navigator)) {
      console.log("Permissions API not supported, will try geolocation directly");
      return "unknown";
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      console.log("Current permission status:", result.state);
      setPermissionStatus(result.state);

      result.onchange = () => {
        console.log("Permission status changed to:", result.state);
        setPermissionStatus(result.state);
      };
      
      return result.state;
    } catch (error) {
      console.error("Error checking permission:", error);
      return "unknown";
    }
  };

  // Request permission explicitly
  const requestPermission = () => {
    return new Promise((resolve) => {
      if (!("geolocation" in navigator)) {
        console.log("Geolocation not supported");
        resolve(false);
        return;
      }

      // This will trigger the permission prompt if not previously set
      navigator.geolocation.getCurrentPosition(
        () => {
          console.log("Permission granted");
          resolve(true);
        },
        (error) => {
          console.log("Permission check failed:", error.message);
          resolve(false);
        },
        { timeout: 3000, maximumAge: 0 }
      );
    });
  };

  // Fetch location using the browser's geolocation API
  const fetchLocation = async (retryAttempt = false) => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setLocationError("");
    setBackendError("");
    setIsLoading(true);
    
    // If this is a retry attempt, try to request permission first
    if (retryAttempt) {
      const currentStatus = await checkPermissionStatus();
      console.log("Current permission status on retry:", currentStatus);
      
      if (currentStatus === "denied") {
        setLocationError("Location access is denied. Please enable location in your browser settings and refresh the page.");
        setIsLoading(false);
        return;
      }
      
      const permissionGranted = await requestPermission();
      if (!permissionGranted) {
        setLocationError("Could not get permission for location access.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            console.error("Geolocation error:", error.code, error.message);
            
            if (error.code === 1) {
              // Permission denied
              setPermissionStatus("denied");
              setLocationError("Location access was denied. Please enable location access in your browser settings and refresh the page.");
            } else if (error.code === 2) {
              setLocationError("Location information is unavailable.");
            } else if (error.code === 3) {
              setLocationError("The request to get user location timed out.");
            } else {
              setLocationError(error.message || "Error getting location.");
            }
            
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });

      console.log("Successfully got position");
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setPermissionStatus("granted");

      const ROUTE = import.meta.env.VITE_ROUTE_API_KEY;
      console.log("Using API key:", ROUTE ? "Available" : "Not available");

      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/reverse?point.lat=${latitude}&point.lon=${longitude}&api_key=${ROUTE}`
      );

      if (!response.data.features.length) {
        throw new Error("Could not find place name.");
      }

      const properties = response.data.features[0].properties;
      const placeName = properties.label;
      const cityName = properties.locality || properties.region || properties.country;
      const street = properties.street || "";
      const locality = properties.locality || "";
      const region = properties.region || "";
      const country = properties.country || "";
      const fullAddress = `${street}, ${locality}, ${region}, ${country}`
        .replace(/, ,/g, "")
        .trim();

      setPlace(placeName);
      setCity(cityName);
      setAddress(fullAddress);

      // Send location data to backend
      const locationData = {
        latitude,
        longitude,
        city: cityName,
        address: fullAddress,
      };

      await mutateAsync(locationData);
      localStorage.setItem("locationSaved", "true");
      setIsLocationFetched(true);
    } catch (error) {
      console.error("Error in fetching location:", error);
      
      if (error.response?.status === 400) {
        setBackendError("Your location is already stored.");
        localStorage.setItem("locationSaved", "true");
        setIsLocationFetched(true);
      } else {
        setLocationError(error.message || "Error getting location.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize component
  useEffect(() => {
    const initializeLocation = async () => {
      // First check permission status
      const initialPermission = await checkPermissionStatus();
      
      // Skip if location is already fetched
      if (isLocationFetched) {
        console.log("Location already saved, skipping fetch");
        return;
      }
      
      // If permission is already denied, show appropriate message
      if (initialPermission === "denied") {
        setLocationError("Location access is denied. Please enable location in your browser settings and refresh the page.");
        return;
      }
      
      // Fetch location
      await fetchLocation();
    };

    initializeLocation();
  }, [isLocationFetched]);

  const handleRetryLocation = async () => {
    await fetchLocation(true);
  };

  if (isLocationFetched) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cook Location</h1>
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">
            Your location has already been stored. You cannot submit it again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cook Location</h1>
      
      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Processing location data...</p>
        </div>
      )}
      
      {isSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
          <p className="text-green-800">Location sent successfully!</p>
        </div>
      )}
      
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
          <p className="text-red-800">Error: {error.message}</p>
        </div>
      )}
      
      {backendError && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
          <p className="text-yellow-800">{backendError}</p>
        </div>
      )}
      
      {locationError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
          <p className="text-red-800">{locationError}</p>
          <button
            onClick={handleRetryLocation}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {permissionStatus === "denied" ? "Update Settings & Try Again" : "Try Again"}
          </button>
        </div>
      )}
      
      {location && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-medium mb-2">Location Details</h3>
          <div className="space-y-1">
            <p>Latitude: {location.latitude?.toFixed(6)}, Longitude: {location.longitude?.toFixed(6)}</p>
            {place && <p>Place: {place}</p>}
            {city && <p>City: {city}</p>}
            {address && <p>Address: {address}</p>}
          </div>
        </div>
      )}
      
      {!location && !locationError && !isLoading && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-gray-800">Fetching your location...</p>
        </div>
      )}
    </div>
  );
};

export default CookLocation;