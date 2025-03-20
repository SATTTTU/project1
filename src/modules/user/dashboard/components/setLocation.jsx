import { useEffect, useState } from "react";
import axios from "axios"; // For API requests
import { useSetLocation } from "../api/post-location";
export const UserLocation = () => {
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState(""); // To store the place name
  const [city, setCity] = useState(""); // To store the city name
  const [address, setAddress] = useState(""); // To store the full address
  const [locationError, setLocationError] = useState(""); // To store location fetch errors
  const [backendError, setBackendError] = useState(""); // To store backend error message
  const [isPermissionGranted, setIsPermissionGranted] = useState(false); // To track user permission
  const [isLocationFetched, setIsLocationFetched] = useState(
    localStorage.getItem("locationSaved") === "true"
  ); // Check if location is already stored
  const { mutateAsync, isLoading, isError, error, isSuccess } = useSetLocation();

  // Function to ask for user permission
  const askForLocationPermission = () => {
    if (isLocationFetched) return; // If location is already fetched, do nothing

    const userConsent = window.confirm("Do you allow us to access your location?");
    if (userConsent) {
      setIsPermissionGranted(true);
      fetchLocation();
    } else {
      setLocationError("Location access denied by user.");
    }
  };

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          const API_KEY = "5b3ce3597851110001cf6248087e3cc0d26b4e2ebca5a1787d6fc142";

          // Reverse geocode to get the place name using OpenRouteService API
          try {
            const response = await axios.get(
              `https://api.openrouteservice.org/geocode/reverse?point.lat=${latitude}&point.lon=${longitude}&api_key=${API_KEY}`
            );
            if (response.data.features.length > 0) {
              const properties = response.data.features[0].properties;

              // Extract place name
              const placeName = properties.label;
              setPlace(placeName);

              // Extract city name
              const cityName = properties.locality || properties.region || properties.country;
              setCity(cityName);

              // Construct the full address
              const street = properties.street || "";
              const locality = properties.locality || "";
              const region = properties.region || "";
              const country = properties.country || "";
              const fullAddress = `${street}, ${locality}, ${region}, ${country}`
                .replace(/, ,/g, "")
                .trim();
              setAddress(fullAddress);

              // Send location, city, and address to backend using useMutation
              try {
                await mutateAsync({ latitude, longitude, city: cityName, address: fullAddress });
                console.log("Location sent successfully");
                localStorage.setItem("locationSaved", "true"); // Store flag in localStorage
                setIsLocationFetched(true); // Update state to prevent re-fetching
              } catch (error) {
                if (error.response && error.response.status === 400) {
                  // Handle the case where the location already exists
                  setBackendError("Your location is already stored.");
                  localStorage.setItem("locationSaved", "true"); // Still mark it as stored
                  setIsLocationFetched(true);
                } else {
                  setBackendError("Error sending location to backend.");
                }
                console.error("Error sending location:", error);
              }
            } else {
              setLocationError("Could not find place name.");
            }
          } catch (error) {
            setLocationError("Error getting place name.");
            console.error("Error getting place name:", error);
          }
        },
        (error) => {
          setLocationError("Error getting location.");
          console.error("Error getting location:", error);
        },
        { timeout: 10000, maximumAge: 0 } // Added timeout and maximumAge for quicker response
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Ask for permission when the component mounts
  useEffect(() => {
    if (!isLocationFetched) {
      askForLocationPermission();
    }
  }, [isLocationFetched]); // Run only if location is not already fetched

  if (isLocationFetched) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Location</h1>
        <p>Your location has already been stored. You cannot submit it again.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Location</h1>
      {!isPermissionGranted && <p>Please allow location access to proceed.</p>}
      {isLoading && <p>Sending location...</p>}
      {isSuccess && <p>Location sent successfully!</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {backendError && <p className="text-red-500">{backendError}</p>} {/* Show backend error */}
      {locationError && <p className="text-red-500">{locationError}</p>} {/* Show location error */}
      {location ? (
        <>
          <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
          {place && <p>Place: {place}</p>}
          {city && <p>City: {city}</p>}
          {address && <p>Address: {address}</p>}
        </>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

// Add default export
export default UserLocation;
