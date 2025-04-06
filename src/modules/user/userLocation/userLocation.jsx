import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import L from "leaflet";
import RoutingMAchine from "@/components/layout/realtime-map/RoutingMachine/RoutingMAchine";
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
    if (center && center.lat && center.lng) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
};

export const UserLocation = ({ orderId }) => {
  const [, setOrderData] = useState(null);
  const [cookLocation, setCookLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [riderLocation, setRiderLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState("received");
  const [socket] = useState(() => io("wss://khajabox-socket.tai.com.np"));
  
  const getOrderData = async () => {
    console.log("Fetching order data for ID:", orderId);
    try {
      const response = await fetch(
        `https://khajabox-backend.dev.tai.com.np/api/get-order-ride-by-id/${orderId}`
      );
      const result = await response.json();
      
      if (!result.data || !result.data[0]) {
        console.error("No order data found in response:", result);
        throw new Error("No order data found");
      }

      const orderRideData = result.data[0];
      console.log("Order data loaded:", orderRideData);
      setOrderData(orderRideData);
      setOrderStatus(orderRideData?.status || "received");
  
      // Set locations with validation
      if (orderRideData?.pickup_location_id?.latitude && orderRideData?.pickup_location_id?.longitude) {
        const cookLoc = {
          lat: parseFloat(orderRideData.pickup_location_id.latitude),
          lng: parseFloat(orderRideData.pickup_location_id.longitude),
        };
        console.log("Setting cook location:", cookLoc);
        setCookLocation(cookLoc);
      }
  
      if (orderRideData?.drop_location_id?.latitude && orderRideData?.drop_location_id?.longitude) {
        const userLoc = {
          lat: parseFloat(orderRideData.drop_location_id.latitude),
          lng: parseFloat(orderRideData.drop_location_id.longitude),
        };
        console.log("Setting user location:", userLoc);
        setUserLocation(userLoc);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Failed to load order data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
  }, [orderId]);

  useEffect(() => {
    // Try both possible room formats
    const roomId = `order-${orderId}`;
    
    console.log("Joining socket rooms:", orderId, roomId);
    socket.emit("join room", orderId);
    socket.emit("join room", roomId);

    const handleRiderLocation = (data, room) => {
      console.log("Received rider location:", data, "Room:", room);
      
      // Accept data regardless of room to debug
      if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
        console.log("Setting rider location state:", data);
        setRiderLocation(data);
        setLoading(false);
      } else {
        console.warn("Invalid rider location data:", data);
      }
    };

    socket.on("rider location", handleRiderLocation);

    // Set timeout for initial loading state
    const timeout = setTimeout(() => {
      if (loading) {
        console.log("Loading timeout reached, continuing without rider location");
        setLoading(false);
      }
    }, 5000);

    return () => {
      console.log("Cleaning up socket connection");
      socket.off("rider location", handleRiderLocation);
      clearTimeout(timeout);
    };
  }, [socket, orderId, loading]);

  // Debug whenever rider location changes
  useEffect(() => {
    console.log("Rider location updated:", riderLocation);
  }, [riderLocation]);

  const calculateETA = (from, to) => {
    if (!from?.lat || !from?.lng || !to?.lat || !to?.lng) return "Unknown";

    const R = 6371;
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
    const timeInMinutes = (distance / 30) * 60;

    return timeInMinutes < 1 ? "Less than 1 minute" : `~${Math.round(timeInMinutes)} minutes`;
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

  const defaultCenter = { lat: 27.7172, lng: 85.324 }; // Kathmandu coordinates as fallback
  const mapCenter = userLocation || cookLocation || riderLocation || defaultCenter;

  const getRestaurantToUserWaypoints = () => {
    if (cookLocation?.lat && cookLocation?.lng && userLocation?.lat && userLocation?.lng) {
      return [
        { latitude: cookLocation.lat, longitude: cookLocation.lng },
        { latitude: userLocation.lat, longitude: userLocation.lng }
      ];
    }
    return [];
  };

  const getRiderToUserWaypoints = () => {
    if (riderLocation?.lat && riderLocation?.lng && userLocation?.lat && userLocation?.lng) {
      return [
        { latitude: riderLocation.lat, longitude: riderLocation.lng },
        { latitude: userLocation.lat, longitude: userLocation.lng }
      ];
    }
    return [];
  };

  // Determine if we have valid waypoints for routing
  const restaurantUserWaypoints = getRestaurantToUserWaypoints();
  const riderUserWaypoints = getRiderToUserWaypoints();

  // Debug - check if routing waypoints are valid
  console.log("Restaurant to User waypoints:", restaurantUserWaypoints);
  console.log("Rider to User waypoints:", riderUserWaypoints);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-pink-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Order Tracking</h1>
        <p className="text-sm opacity-80">Order #{orderId}</p>
        <p className="text-sm opacity-80">Status: {orderStatus}</p>
      </div>

      <div className="p-4 bg-white shadow-sm">
        <div className="mb-2 font-medium">Your Location:</div>
        {userLocation ? (
          <div className="text-gray-500 text-xs mb-3">
            Coordinates: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
          </div>
        ) : (
          <div className="text-gray-500 text-xs mb-3">Location not available</div>
        )}

        {riderLocation?.lat && riderLocation?.lng && userLocation?.lat && userLocation?.lng && (
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <div className="font-medium">
              Rider ETA:
              <span className="ml-1 font-bold">
                {calculateETA(riderLocation, userLocation)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Rider location: {riderLocation.lat.toFixed(6)}, {riderLocation.lng.toFixed(6)}
            </div>
          </div>
        )}

        <div className="mt-3 text-sm">
          {!riderLocation?.lat && (
            <div className="text-gray-500">Waiting for rider to connect...</div>
          )}
          {riderLocation?.lat && riderLocation?.lng && (
            <div className="text-green-600">Rider connected and on the way!</div>
          )}
        </div>
      </div>

      <div className="flex-grow relative">
        {mapCenter?.lat && mapCenter?.lng ? (
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Restaurant to User Route - show only if rider route not available */}
            {restaurantUserWaypoints.length > 0 && riderUserWaypoints.length === 0 && (
              <RoutingMAchine
              waypoints={restaurantUserWaypoints} />
            )}

            {/* Rider to User Route - priority over restaurant route */}
            {riderUserWaypoints.length > 0 && (
              <RoutingMAchine waypoints={riderUserWaypoints} />
            )}

            {riderLocation?.lat && riderLocation?.lng && (
              <Marker
                position={[riderLocation.lat, riderLocation.lng]}
                icon={createCustomIcon("blue")}
              >
                <Popup>
                  <div>
                    <strong>Rider</strong>
                  </div>
                </Popup>
              </Marker>
            )}

            {userLocation?.lat && userLocation?.lng && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={createCustomIcon("#EC4899")}
              >
                <Popup>
                  <div>
                    <strong>You (Customer)</strong>
                  </div>
                </Popup>
              </Marker>
            )}

            {cookLocation?.lat && cookLocation?.lng && (
              <Marker
                position={[cookLocation.lat, cookLocation.lng]}
                icon={createCustomIcon("#10B981")}
              >
                <Popup>
                  <div>
                    <strong>Restaurant</strong>
                  </div>
                </Popup>
              </Marker>
            )}

            <MapUpdater center={riderLocation || userLocation || cookLocation} />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500">Map cannot be loaded - invalid location data</p>
          </div>
        )}

        <div className="absolute bottom-4 right-4 z-50 bg-white p-2 rounded-md shadow-md text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-pink-600 mr-2"></div>
            <span>You (Customer)</span>
          </div>
          {riderLocation?.lat && riderLocation?.lng && (
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
              <span>Rider</span>
            </div>
          )}
          {cookLocation?.lat && cookLocation?.lng && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
              <span>Restaurant</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};