import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RoutingMAchine from "@/components/layout/realtime-map/RoutingMachine/RoutingMAchine";
// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const createCustomIcon = (color) =>
  L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);
  return null;
};

const DeliveryTracking = ({ orderId }) => {
  const [orderData, setOrderData] = useState(null);
  const [cookLocation, setCookLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [riderLocation, setRiderLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState("received");
  const [routeWaypoints, setRouteWaypoints] = useState([]);

  const userRole = orderData?.userRole || "user";
  // Initialize socket once
  const [socket] = useState(() => io("wss://khajabox-socket.tai.com.np"));

  const getOrderData = async () => {
    try {
      const response = await fetch(
        `https://khajabox-backend.dev.tai.com.np/api/get-order-ride-by-id/${orderId}`
      );
      const result = await response.json();
      
      // The actual data is inside the data array at index 0
      const orderRideData = result.data[0];
      setOrderData(orderRideData);
      setOrderStatus(orderRideData?.status || "received");
  
      // Set locations - accessing the nested structure correctly
      if (orderRideData?.pickup_location_id) {
        const cookLoc = {
          lat: parseFloat(orderRideData.pickup_location_id.latitude),
          lng: parseFloat(orderRideData.pickup_location_id.longitude),
        };
        setCookLocation(cookLoc);
      }
  
      if (orderRideData?.drop_location_id) {
        const userLoc = {
          lat: parseFloat(orderRideData.drop_location_id.latitude),
          lng: parseFloat(orderRideData.drop_location_id.longitude),
        };
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

  // Fix for socket connection - use both roomId formats for compatibility
  useEffect(() => {
    const roomId = `order-${orderId}`;
    
    // Join both possible room formats to ensure we catch all events
    socket.emit("join room", orderId);
    socket.emit("join room", roomId);
    
    console.log("Joined socket rooms:", orderId, roomId);

    const handleRiderLocation = (data, room) => {
      console.log("Received rider location:", data, "Room:", room);
      // Accept data regardless of room name for now, to debug
      if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
        console.log("Setting rider location state:", data);
        setRiderLocation(data);
      } else {
        console.warn("Invalid rider location data:", data);
      }
    };

    socket.on("rider location", handleRiderLocation);

    const timeout = setTimeout(() => {
      if (!riderLocation) {
        console.log("No rider location received after timeout");
        setLoading(false);
      }
    }, 5000);

    return () => {
      socket.off("rider location", handleRiderLocation);
      clearTimeout(timeout);
    };
  }, [socket, orderId]);

  // Recalculate route whenever locations change
  useEffect(() => {
    
    if (riderLocation && riderLocation.lat && riderLocation.lng) {
      // For rider view or general customer/cook view when rider is moving
      if (orderStatus === "picked_up" || orderStatus === "on_the_way" || orderStatus === "delivered") {
        // If food is picked up, route should be from rider to customer
        if (userLocation) {
          const waypoints = [
            { latitude: riderLocation.lat, longitude: riderLocation.lng },
            { latitude: userLocation.lat, longitude: userLocation.lng }
          ];
          setRouteWaypoints(waypoints);
        }
      } else {
        // If food is not picked up yet, route should be from rider to restaurant
        if (cookLocation) {
          const waypoints = [
            { latitude: riderLocation.lat, longitude: riderLocation.lng },
            { latitude: cookLocation.lat, longitude: cookLocation.lng }
          ];
          setRouteWaypoints(waypoints);
        }
      }
    } else if (cookLocation && userLocation) {
      // If rider isn't connected yet, show route from restaurant to customer
      const waypoints = [
        { latitude: cookLocation.lat, longitude: cookLocation.lng },
        { latitude: userLocation.lat, longitude: userLocation.lng }
      ];
      setRouteWaypoints(waypoints);
    }
  }, [riderLocation, cookLocation, userLocation, orderStatus]);

  const calculateETA = (from, to) => {
    if (!from || !to) return "Unknown";

    const R = 6371;
    const dLat = ((to.lat - from.lat) * Math.PI) / 180;
    const dLon = ((to.lng - from.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((from.lat * Math.PI) / 180) *
        Math.cos((to.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const timeInMinutes = (distance / 30) * 60;

    return timeInMinutes < 1
      ? "Less than 1 minute"
      : `~${Math.round(timeInMinutes)} minutes`;
  };

  const getHeaderColor = () => {
    switch (userRole) {
      case "rider":
        return "bg-blue-600";
      case "cook":
        return "bg-green-600";
      case "user":
      default:
        return "bg-pink-600";
    }
  };

  const getPrimaryLocation = () => {
    // First check if rider location is available
    if (riderLocation && riderLocation.lat && riderLocation.lng) {
      return riderLocation;
    }
    
    // Fall back to role-specific locations
    switch (userRole) {
      case "cook":
        return cookLocation;
      case "user":
      default:
        return userLocation;
    }
  };

  const renderETAs = () => {
    if (!riderLocation) return null;

    const etas = [];

    switch (userRole) {
      case "rider":
        if (userLocation) {
          etas.push({
            label: "Customer ETA",
            value: calculateETA(riderLocation, userLocation),
            bgColor: "bg-pink-50",
          });
        }
        if (cookLocation) {
          etas.push({
            label: "Cook ETA",
            value: calculateETA(riderLocation, cookLocation),
            bgColor: "bg-green-50",
          });
        }
        break;
      case "cook":
        if (riderLocation && cookLocation) {
          etas.push({
            label: "Rider ETA",
            value: calculateETA(riderLocation, cookLocation),
            bgColor: "bg-blue-50",
          });
        }
        break;
      case "user":
        if (riderLocation && userLocation) {
          etas.push({
            label: "Rider ETA",
            value: calculateETA(riderLocation, userLocation),
            bgColor: "bg-blue-50",
          });
        }
        break;
    }

    return (
      <div className="mt-3 space-y-2">
        {etas.map((eta, i) => (
          <div key={i} className={`p-2 ${eta.bgColor} rounded-md`}>
            <div className="font-medium">
              {eta.label}: <span className="ml-1 font-bold">{eta.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderConnectionStatus = () => {
    return riderLocation ? (
      <div className="mt-3 text-sm text-green-600">
        Rider connected and sharing location
      </div>
    ) : (
      <div className="mt-3 text-sm text-gray-500">
        Waiting for rider to connect...
      </div>
    );
  };

  const renderCookControls = () => {
    if (userRole !== "cook") return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={() => setOrderStatus("prepared")}
          >
            Mark as Prepared
          </button>
          <div className="text-gray-700">
            Order Status:{" "}
            <span className="font-bold capitalize">{orderStatus}</span>
          </div>
        </div>
      </div>
    );
  };

  // Debug info for development


  const primaryLocation = getPrimaryLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-700">Connecting to rider...</p>
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
      <div className={`${getHeaderColor()} text-white p-4 shadow-md`}>
        <h1 className="text-lg font-bold">
          Order #{orderId || "Unknown"} - {orderStatus}
        </h1>
        {renderETAs()}
        {renderConnectionStatus()}
      </div>

      {primaryLocation && !isNaN(primaryLocation.lat) && !isNaN(primaryLocation.lng) ? (
        <div className="flex-grow relative">
          <MapContainer
            center={[primaryLocation.lat, primaryLocation.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {riderLocation && riderLocation.lat && riderLocation.lng && (
              <Marker
                position={[riderLocation.lat, riderLocation.lng]}
                icon={createCustomIcon("blue")}
              >
                <Popup>
                  <strong>Rider</strong>
                </Popup>
              </Marker>
            )}

            {cookLocation && (
              <Marker
                position={[cookLocation.lat, cookLocation.lng]}
                icon={createCustomIcon("#10B981")}
              >
                <Popup>
                  <strong>Cook</strong>
                </Popup>
              </Marker>
            )}

            {userLocation && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={createCustomIcon("#EC4899")}
              >
                <Popup>
                  <strong>
                    {userRole === "user" ? "You (Customer)" : "Customer"}
                  </strong>
                </Popup>
              </Marker>
            )}

            {/* Add RoutingMachine for optimized routing */}
            {routeWaypoints.length >= 2 && (
              <RoutingMAchine waypoints={routeWaypoints} />
            )}

            <MapUpdater center={primaryLocation} />
          </MapContainer>

          <div className="absolute bottom-4 right-4 z-50 bg-white p-2 rounded-md shadow-md text-xs">
            {riderLocation && riderLocation.lat && riderLocation.lng && (
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                <span>{userRole === "rider" ? "You (Rider)" : "Rider"}</span>
              </div>
            )}
            {cookLocation && (
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                <span>
                  {userRole === "cook" ? "You (Cook)" : "Cook"}
                </span>
              </div>
            )}
            {userLocation && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-pink-600 mr-2"></div>
                <span>
                  {userRole === "user" ? "You (Customer)" : "Customer"}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">
            Unable to load map. No location data available.
          </p>
        </div>
      )}

      {renderCookControls()}
    </div>
  );
};

export default DeliveryTracking;