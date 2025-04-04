import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker function
const createCustomIcon = (color) =>
  L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

// Component to auto-center map on user location changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
};

const static_order_detail = {
  order_id: 181,
  order_ride_id: 6,
  status: "assigned",
  rider_id: 2,
  drop_location_id: {
    user: {
      id: 7,
      name: "Indraa",
      email: "indralimbu324@gmail.com",
      image_url: "user_profile_image/1743559840_67ec9ca0f3b79.jpg",
    },
    latitude: "27.68486218",
    longitude: "85.33990067",
  },
  pickup_location_id: {
    id: 6,
    latitude: "27.68862700",
    longitude: "85.34393300",
    cook: {
      id: 3,
      name: "Alka Rai",
      email: "Alka@gmail.com",
    },
  },
};

export const UserLocation = ({ orderId = "order-123" }) => {
  // Static locations for user and cook
  const userLocation = { lat: 27.688627, lng: 85.343933 };
  const cookLocation = { lat: 27.4, lng: 85.3 };

  const [riderLocation, setRiderLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket] = useState(() => io("localhost:3000"));
  const [restaurantRoute, setRestaurantRoute] = useState([]);
  const [riderRoute, setRiderRoute] = useState([]);

  // Format room ID consistently across all components
  const getRoomId = (id) => `order-${id}`;

  socket.emit("join room", 123);

  useEffect(() => {
    socket.on("rider location", (data) => {
      console.log("rider location", data);
      setRiderLocation(data);
    });
  }, [socket]);

  // Fetch road-based route between two points using OSRM
  const fetchRoute = async (start, end) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        // OSRM returns coordinates as [lng, lat], but Leaflet needs [lat, lng]
        return data.routes[0].geometry.coordinates.map((coord) => [
          coord[1],
          coord[0],
        ]);
      }
      return [
        [start.lat, start.lng],
        [end.lat, end.lng],
      ]; // Fallback to direct line
    } catch (error) {
      console.error("Error fetching route:", error);
      return [
        [start.lat, start.lng],
        [end.lat, end.lng],
      ]; // Fallback to direct line
    }
  };

  useEffect(() => {
    // Fetch route from restaurant to customer
    fetchRoute(cookLocation, userLocation).then((route) => {
      setRestaurantRoute(route);
    });

    // Join the room using consistent roomId format
    const roomId = getRoomId(orderId);

    // Listen for rider location updates

    // Set a timeout to stop loading if we don't get rider data
    const timeout = setTimeout(() => {
      if (!riderLocation) {
        setLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [orderId]);

  // Calculate ETA between two points
  const calculateETA = (from, to) => {
    if (!from || !to) return "Unknown";

    // Simple distance calculation (in km) using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = ((to.lat - from.lat) * Math.PI) / 180;
    const dLon = ((to.lng - from.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((from.lat * Math.PI) / 180) *
        Math.cos((to.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Assuming average speed of 30 km/h
    const timeInMinutes = (distance / 30) * 60;

    if (timeInMinutes < 1) {
      return "Less than 1 minute";
    }

    return `~${Math.round(timeInMinutes)} minutes`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Connecting to delivery service...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-700 max-w-md mx-auto mt-8 rounded-lg shadow-md">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-pink-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Order Tracking</h1>
        <p className="text-sm opacity-80">Order #{orderId}</p>
      </div>

      <div className="p-4 bg-white shadow-sm">
        <div className="mb-2 font-medium">Your Location:</div>
        <div className="text-gray-500 text-xs mb-3">
          Coordinates: {userLocation.lat.toFixed(6)},{" "}
          {userLocation.lng.toFixed(6)}
        </div>

        {riderLocation && (
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <div className="font-medium">
              Rider ETA:
              <span className="ml-1 font-bold">
                {calculateETA(riderLocation, userLocation)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 text-sm text-gray-500">
          {!riderLocation && "Waiting for rider to connect..."}
          {riderLocation && "Rider connected and on the way!"}
        </div>
      </div>

      <div className="flex-grow relative">
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

         {riderLocation && <Marker
            position={[
              riderLocation.lat,
              riderLocation.lng,
            ]}
            icon={createCustomIcon("blue")}
          >
            <Popup>
              <div>
                <strong>Rider</strong>
              </div>
            </Popup>
          </Marker>}

          <Marker
            position={[
              static_order_detail.drop_location_id.latitude,
              static_order_detail.drop_location_id.longitude,
            ]}
            icon={createCustomIcon("#EC4899")}
          >
            <Popup>
              <div>
                <strong>You (Customer)</strong>
              </div>
            </Popup>
          </Marker>

          {/* Cook marker */}
          <Marker
            position={[
              static_order_detail.pickup_location_id.latitude,
              static_order_detail.pickup_location_id.longitude,
            ]}
            icon={createCustomIcon("#10B981")}
          >
            <Popup>
              <div>
                <strong>Restaurant</strong>
              </div>
            </Popup>
          </Marker>

          {/* Restaurant to customer route */}
          {restaurantRoute.length > 0 && (
            <Polyline
              positions={restaurantRoute}
              color="#10B981"
              weight={4}
              opacity={0.7}
            />
          )}

          {/* Rider marker and route */}
          {riderLocation && (
            <>
              <Marker
                position={[riderLocation.lat, riderLocation.lng]}
                icon={createCustomIcon("#2563EB")}
              >
                <Popup>
                  <div>
                    <strong>Rider</strong>
                    <br />
                    ETA: {calculateETA(riderLocation, userLocation)}
                  </div>
                </Popup>
              </Marker>

              {/* Rider to customer route */}
              {riderRoute.length > 0 && (
                <Polyline
                  positions={riderRoute}
                  color="#2563EB"
                  weight={4}
                  opacity={0.7}
                  dashArray="5,10"
                />
              )}
            </>
          )}

          <MapUpdater center={userLocation} />
        </MapContainer>

        <div className="absolute bottom-4 right-4 z-50 bg-white p-2 rounded-md shadow-md text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-pink-600 mr-2"></div>
            <span>You (Customer)</span>
          </div>
          {riderLocation && (
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
              <span>Rider</span>
            </div>
          )}
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
            <span>Restaurant</span>
          </div>
        </div>
      </div>
    </div>
  );
};
