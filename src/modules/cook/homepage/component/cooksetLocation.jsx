import { useEffect, useState } from "react";
import axios from "axios"; // For API requests
import { UseSetCookLocation } from "../api/setLocation";

export const CookLocation = () => {
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState(""); // To store the place name
  const [city, setCity] = useState(""); // To store the city name
  const [address, setAddress] = useState(""); // To store the full address
  const [locationError, setLocationError] = useState(""); // To store location fetch errors
  const [backendError, setBackendError] = useState(""); // To store backend error message
  const [isLocationFetched, setIsLocationFetched] = useState(
    localStorage.getItem("locationSaved") === "true"
  );

  const { mutateAsync, isLoading, isError, error, isSuccess } =
    UseSetCookLocation();

  const fetchLocation = async () => {
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });

      const API_KEY =
        "5b3ce3597851110001cf6248087e3cc0d26b4e2ebca5a1787d6fc142";

      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/reverse?point.lat=${latitude}&point.lon=${longitude}&api_key=${API_KEY}`
      );

      if (!response.data.features.length) {
        throw new Error("Could not find place name.");
      }

      const properties = response.data.features[0].properties;
      const placeName = properties.label;
      const cityName =
        properties.locality || properties.region || properties.country;
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
      if (error.response?.status === 400) {
        setBackendError("Your location is already stored.");
        localStorage.setItem("locationSaved", "true");
        setIsLocationFetched(true);
      } else {
        setLocationError(error.message || "Error getting location.");
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (!isLocationFetched) {
      fetchLocation();
    }
  }, [isLocationFetched]);

  if (isLocationFetched) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cook Location</h1>
        <p>
          Your location has already been stored. You cannot submit it again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cook Location</h1>
      {isLoading && <p>Sending location...</p>}
      {isSuccess && <p>Location sent successfully!</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {backendError && <p className="text-red-500">{backendError}</p>}
      {locationError && <p className="text-red-500">{locationError}</p>}
      {location ? (
        <>
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
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
export default CookLocation;
