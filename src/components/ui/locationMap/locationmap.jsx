import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
  iconSize: [30, 30],
});

const LocationMap = ({ 
  fetchLocationFn, 
  title = "Your Location" 
}) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchLocationFn();
        
        const { latitude, longitude } = response.data;
        setLocation({ lat: latitude, lng: longitude });
      } catch (err) {
        setError(err.message || "Error fetching location");
        console.error("Error fetching location:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
  }, [fetchLocationFn]);

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500">लोकेशन लोड हुँदैछ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-500">लोकेशन प्राप्त गर्न सकिएन: {error}</p>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500">लोकेशन उपलब्ध छैन</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border relative z-0 border-gray-200">
      <MapContainer
        center={[location.lat, location.lng]}
        defaaultZoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>{title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;