import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Loader2, Navigation } from "lucide-react";
import { io } from "socket.io-client";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Import the CSS
import RoutingMachine from "./RoutingMachine";

// Fix Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon for markers
const createCustomIcon = (color) =>
  L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const MapUpdater = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center, map]);

  return null;
};

export const RiderPages = ({ orderId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, setOrderStatus] = useState("received");
  const [riderLocation, setRiderLocation] = useState(null);
  const [cookLocation, setCookLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isPickedUp, setIsPickedUp] = useState(false);
  const [socket] = useState(() => io("wss://khajabox-socket.tai.com.np"));
  const [routeWaypoints, setRouteWaypoints] = useState([]); // State for route waypoints

  const getOrderData = async () => {
    try {
      const response = await fetch(
        `https://khajabox-backend.dev.tai.com.np/api/get-order-ride-by-id/${orderId}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.data || !result.data[0]) {
        throw new Error("No order data returned");
      }

      // The actual data is inside the data array at index 0
      const orderRideData = result.data[0];
      setOrderData(orderRideData);
      setOrderStatus(orderRideData.status || "received");

      // Set pickup location
      if (orderRideData.pickup_location_id) {
        setCookLocation({
          lat: parseFloat(orderRideData.pickup_location_id.latitude),
          lng: parseFloat(orderRideData.pickup_location_id.longitude),
        });
      }

      // Set drop location
      if (orderRideData.drop_location_id) {
        setUserLocation({
          lat: parseFloat(orderRideData.drop_location_id.latitude),
          lng: parseFloat(orderRideData.drop_location_id.longitude),
        });
      }

      // Check if order is already picked up
      if (
        orderRideData.status === "picked_up" ||
        orderRideData.status === "on_the_way"
      ) {
        setIsPickedUp(true);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Failed to load order data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    getOrderData();

    if (orderId) {
      getOrderData();

      // Join socket room
      if (socket) {
        socket.emit("join room", orderId);
      }
    }
  }, [orderId, socket]);

  // Set up geolocation tracking
  useEffect(() => {
    let watchId = null;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          setRiderLocation(newLocation);

          // Emit location to socket if connected
          if (socket && socket.connected && orderId) {
            socket.emit("rider location", {
              roomId: orderId,
              location: newLocation,
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            setError(
              "Location permission denied. Please enable location services."
            );
          } else {
            setError("Error tracking location: " + error.message);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    // Clean up function
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }

      // Disconnect from socket room
      if (socket) {
        socket.emit("leave room", orderId);
      }
    };
  }, [orderId, socket]);

  // Determine current destination
  const currentDestination = useMemo(() => {
    return isPickedUp ? userLocation : cookLocation;
  }, [isPickedUp, userLocation, cookLocation]);

  // Update route waypoints when locations change
  useEffect(() => {
    if (riderLocation && currentDestination) {
      // Set waypoints based on current status (picked up or not)
      if (isPickedUp) {
        // If food is picked up, route is rider -> customer
        setRouteWaypoints([
          { latitude: riderLocation.lat, longitude: riderLocation.lng },
          { latitude: userLocation.lat, longitude: userLocation.lng }
        ]);
      } else {
        // If food is not picked up, route is rider -> restaurant
        setRouteWaypoints([
          { latitude: riderLocation.lat, longitude: riderLocation.lng },
          { latitude: cookLocation.lat, longitude: cookLocation.lng }
        ]);
      }
    }
  }, [riderLocation, cookLocation, userLocation, isPickedUp, currentDestination]);

  // Calculate ETA based on distance
  const eta = useMemo(() => {
    if (!riderLocation || !currentDestination) return null;

    const distance = calculateDistance(
      riderLocation.lat,
      riderLocation.lng,
      currentDestination.lat,
      currentDestination.lng
    );

    // Assuming average speed of 30 km/h
    const timeInMinutes = Math.round((distance / 30) * 60);
    return timeInMinutes;
  }, [riderLocation, currentDestination]);

  // Handle pickup/delivery status change
  const handleStatusChange = async () => {
    const newStatus = isPickedUp ? "delivered" : "picked_up";

    try {
      // Update local state immediately for responsive UI
      setIsPickedUp(!isPickedUp);

      // Update the server
      const response = await fetch(
        `https://khajabox-backend.dev.tai.com.np/api/update-order-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Emit status change to socket
      if (socket && socket.connected) {
        socket.emit("status update", {
          roomId: orderId,
          status: newStatus,
        });
      }

      // Refresh order data
      getOrderData();
    } catch (err) {
      console.error("Error updating status:", err);
      // Revert the local state if the API call failed
      setIsPickedUp(!isPickedUp);
      setError("Failed to update order status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-lg">Loading order details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error || "Error fetching order details! Please try again."}
        </div>
      </div>
    );
  }

  const defaultCenter = riderLocation ||
    cookLocation ||
    userLocation || { lat: 27.7172, lng: 85.324 };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Delivery Tracking</h1>
        <p className="text-sm opacity-80">Order #{orderId}</p>
      </div>

      <div className="p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <div className="mb-2 font-medium">Your Current Location:</div>
            {riderLocation ? (
              <div className="text-gray-700">
                Coordinates: {riderLocation.lat.toFixed(6)},{" "}
                {riderLocation.lng.toFixed(6)}
              </div>
            ) : (
              <div className="text-gray-600">Fetching location...</div>
            )}
          </div>

          {eta !== null && (
            <div className="text-right">
              <div className="text-sm text-gray-500">Estimated Time</div>
              <div className="text-xl font-bold text-blue-600">{eta} min</div>
              <div className="text-sm">
                to {isPickedUp ? "customer" : "restaurant"}
              </div>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              isPickedUp ? "bg-green-500" : "bg-yellow-500"
            } mr-2`}
          ></div>
          <span className="text-sm font-medium">
            Status: {isPickedUp ? "Food Picked Up" : "En Route to Restaurant"}
          </span>
        </div>
      </div>

      <div className="flex-grow relative">
        {defaultCenter && (
          <MapContainer
            center={[defaultCenter.lat, defaultCenter.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Rider Marker */}
            {riderLocation && (
              <Marker
                position={[riderLocation.lat, riderLocation.lng]}
                icon={createCustomIcon("#2563EB")}
              >
                <Popup>
                  <strong>You (Rider)</strong>
                </Popup>
              </Marker>
            )}

            {/* Cook Marker */}
            {cookLocation && (
              <Marker
                position={[cookLocation.lat, cookLocation.lng]}
                icon={createCustomIcon("#22C55E")}
              >
                <Popup>
                  <strong>Restaurant</strong>
                  <br />
                  {orderData?.pickup_location_id?.cook?.name || "Restaurant"}
                </Popup>
              </Marker>
            )}

            {/* User Marker */}
            {userLocation && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={createCustomIcon("#EF4444")}
              >
                <Popup>
                  <strong>Customer</strong>
                  <br />
                  {orderData?.drop_location_id?.user?.name || "Customer"}
                </Popup>
              </Marker>
            )}

            {/* Routing Machine */}
            {routeWaypoints.length > 1 && (
              <RoutingMachine waypoints={routeWaypoints} />
            )}

            {/* Map Updater */}
            {riderLocation && (
              <MapUpdater center={[riderLocation.lat, riderLocation.lng]} />
            )}
          </MapContainer>
        )}
      </div>

      {/* Action Button */}
      <div className="p-4 bg-white border-t">
        <button
          className={`w-full py-3 rounded-lg font-medium text-white ${
            isPickedUp ? "bg-green-600" : "bg-blue-600"
          }`}
          onClick={handleStatusChange}
        >
          <div className="flex items-center justify-center">
            <Navigation className="w-5 h-5 mr-2" />
            {isPickedUp ? "Mark as Delivered" : "Mark as Picked Up"}
          </div>
        </button>
      </div>
    </div>
  );
};