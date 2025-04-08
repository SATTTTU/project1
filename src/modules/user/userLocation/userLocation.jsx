import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import L from "leaflet";
import RoutingMAchine from "@/components/layout/realtime-map/RoutingMachine/RoutingMAchine";
import image from "../../../assets/gg.svg";
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

  socket && socket.emit("join room", `khajabox-${orderId}`);

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
      if (
        orderRideData?.pickup_location_id?.latitude &&
        orderRideData?.pickup_location_id?.longitude
      ) {
        const cookLoc = {
          lat: parseFloat(orderRideData.pickup_location_id.latitude),
          lng: parseFloat(orderRideData.pickup_location_id.longitude),
        };
        console.log("Setting cook location:", cookLoc);
        setCookLocation(cookLoc);
      }

      if (
        orderRideData?.drop_location_id?.latitude &&
        orderRideData?.drop_location_id?.longitude
      ) {
        const userLoc = {
          lat: parseFloat(orderRideData.drop_location_id.latitude),
          lng: parseFloat(orderRideData.drop_location_id.longitude),
        };
        console.log("Setting user location:", userLoc);
        setUserLocation(userLoc);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
      setError(
        "Your order is currently being prepared. Tracking will be available once it’s out for delivery"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
  }, [orderId]);

  //DON'T uncomment this also [RISHI]
  // not the effective way
  // useEffect(() => {
  //   const roomId = `order-${orderId}`;

  //   const handleRiderLocation = (data, room) => {
  //     console.log("Received rider location:", data, "Room:", room);

  //     if (
  //       data &&
  //       typeof data.lat === "number" &&
  //       typeof data.lng === "number"
  //     ) {
  //       console.log("Setting rider location state:", data);
  //       setRiderLocation(data);
  //       setLoading(false);
  //     } else {
  //       console.warn("Invalid rider location data:", data);
  //     }
  //   };

  //   socket.on("rider location", handleRiderLocation);

  //   const timeout = setTimeout(() => {
  //     if (loading) {
  //       console.log(
  //         "Loading timeout reached, continuing without rider location"
  //       );
  //       setLoading(false);
  //     }
  //   }, 5000);

  //   return () => {
  //     console.log("Cleaning up socket connection");
  //     socket.off("rider location", handleRiderLocation);
  //     clearTimeout(timeout);
  //   };
  // }, [socket, orderId, loading]);

  useEffect(() => {
    socket.on("rider location", (data) => {
      console.log("rider location data from socket", data);
      setRiderLocation(data);
    });
  }, [socket]);

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

    return timeInMinutes < 1
      ? "Less than 1 minute"
      : `~${Math.round(timeInMinutes)} minutes`;
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
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
        <div className="max-w-2xl w-full p-8 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8">
          {/* Illustration */}
          <div className="w-full md:w-1/2">
            <img
              src={image} // You can replace this with any SVG or PNG
              alt="Error Illustration"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl font-bold text-yellow-600 mb-4">
              Your order is currently being prepared
            </h1>
            <p className="text-gray-600 mb-6">
              {error ||
                " Tracking will be available once it’s out for delivery."}
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                onClick={() => (window.location.href = "/profile/order")}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const defaultCenter = { lat: 27.7172, lng: 85.324 };
  const mapCenter =
    userLocation || cookLocation || riderLocation || defaultCenter;

  const getRestaurantToUserWaypoints = () => {
    if (
      cookLocation?.lat &&
      cookLocation?.lng &&
      userLocation?.lat &&
      userLocation?.lng
    ) {
      return [
        { latitude: cookLocation.lat, longitude: cookLocation.lng },
        { latitude: userLocation.lat, longitude: userLocation.lng },
      ];
    }
    return [];
  };

  const getRiderToUserWaypoints = () => {
    if (
      riderLocation?.lat &&
      riderLocation?.lng &&
      userLocation?.lat &&
      userLocation?.lng
    ) {
      return [
        { latitude: riderLocation.lat, longitude: riderLocation.lng },
        { latitude: userLocation.lat, longitude: userLocation.lng },
      ];
    }
    return [];
  };

  const restaurantUserWaypoints = getRestaurantToUserWaypoints();
  const riderUserWaypoints = getRiderToUserWaypoints();

  console.log("Rider to User waypoints:", riderUserWaypoints);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-5 rounded-md shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Order Tracking</h1>
          <p className="text-sm text-white/90">
            Order #: <span className="font-medium">{orderId}</span>
          </p>
          <p className="text-sm text-white/90">
            Status: <span className="font-medium">{orderStatus}</span>
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/profile/order")}
          className="bg-white text-pink-600 hover:bg-pink-100 font-semibold px-4 py-2 rounded-md transition-all shadow-md"
        >
          Go Back to Order
        </button>
      </div>
      <div></div>

      <div className="p-4 bg-white shadow-sm">
        <div className="mb-2 font-medium">Your Location:</div>
        {userLocation ? (
          <div className="text-gray-500 text-xs mb-3">
            Coordinates: {userLocation.lat.toFixed(6)},{" "}
            {userLocation.lng.toFixed(6)}
          </div>
        ) : (
          <div className="text-gray-500 text-xs mb-3">
            Location not available
          </div>
        )}

        {riderLocation?.lat &&
          riderLocation?.lng &&
          userLocation?.lat &&
          userLocation?.lng && (
            <div className="mt-3 p-2 bg-blue-50 rounded-md">
              <div className="font-medium">
                Rider ETA:
                <span className="ml-1 font-bold">
                  {calculateETA(riderLocation, userLocation)}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Rider location: {riderLocation.lat.toFixed(6)},{" "}
                {riderLocation.lng.toFixed(6)}
              </div>
            </div>
          )}

        <div className="mt-3 text-sm">
          {!riderLocation?.lat && (
            <div className="text-gray-500">Waiting for rider to connect...</div>
          )}
          {riderLocation?.lat && riderLocation?.lng && (
            <div className="text-green-600">
              Rider connected and on the way!
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow relative">
        {mapCenter?.lat && mapCenter?.lng ? (
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
           defaultZoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

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
                    <strong>Cook</strong>
                  </div>
                </Popup>
              </Marker>
            )}

            {userLocation.lat && cookLocation.lat && (
              <RoutingMAchine
                waypoints={[
                  { latitude: userLocation.lat, longitude: userLocation.lng },
                  { latitude: cookLocation.lat, longitude: cookLocation.lng },
                ]}
              />
            )}

            <MapUpdater
              center={riderLocation || userLocation || cookLocation}
            />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500">
              Map cannot be loaded - invalid location data
            </p>
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
              <span>Cook</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
