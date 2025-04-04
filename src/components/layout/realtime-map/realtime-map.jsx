import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGetLocation } from '@/hooks/api/getCookLocationwithOrderId';

// Fix for default marker icons in Leaflet with Next.js
// Add this at the top of your component file
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different locations
const restaurantIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/8280/8280239.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const deliveryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2830/2830312.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const destinationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

 export const CustomerDeliveryTracker = ({ orderId }) => {
  const { data: deliveryLocation, isLoading: deliveryLoading } = useGetLocation({ deliveryid: orderId, type: 'delivery' });
  const { data: restaurantLocation, isLoading: restaurantLoading } = useGetLocation({ deliveryid: orderId, type: 'restaurant' });
  const { data: userLocation, isLoading: userLoading } = useGetLocation({ deliveryid: orderId, type: 'user' });
  
  const [mapCenter, setMapCenter] = useState([27.7172, 85.3240]); // Default to Kathmandu
  const [mapZoom, setMapZoom] = useState(12);
  
  // Calculate distance, ETA and status
  const [distance, setDistance] = useState(null);
  const [eta, setEta] = useState(null);
  const [orderStatus, setOrderStatus] = useState('Preparing');
  
  // Generate tracking link
  const generateTrackingLink = () => `https://khajabox.com.np/track/${orderId}`;
  
  useEffect(() => {
    // Update map center when locations are loaded
    if (deliveryLocation && deliveryLocation.lat && deliveryLocation.lon) {
      setMapCenter([deliveryLocation.lat, deliveryLocation.lon]);
    }
    
    // Calculate distance and ETA when locations are available
    if (deliveryLocation && userLocation) {
      const distanceKm = calculateDistance(
        deliveryLocation.lat,
        deliveryLocation.lon,
        userLocation.lat,
        userLocation.lon
      );
      
      setDistance(distanceKm.toFixed(2));
      
      // Calculate ETA based on average speed of 30 km/h
      const etaHours = distanceKm / 30; 
      setEta(etaHours < 1 ? `${Math.round(etaHours * 60)} mins` : `${etaHours.toFixed(1)} hours`);
      
      // Update order status
      setOrderStatus(distanceKm <= 0.5 ? 'Near Destination' : 'Out for Delivery');
    }
  }, [deliveryLocation, userLocation]);
  
  // Adjust zoom to fit all points
  useEffect(() => {
    if (deliveryLocation && restaurantLocation && userLocation) {
      setMapZoom(11); // Zoom out a bit to see all points
    }
  }, [deliveryLocation, restaurantLocation, userLocation]);
  
  const isLoading = deliveryLoading || restaurantLoading || userLoading;
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Delivery Tracking</h2>
        <div className="p-6 bg-gray-100 rounded-lg flex justify-center items-center">
          <p className="text-gray-500">लोकेशन लोड हुँदैछ...</p>
        </div>
      </div>
    );
  }
  
  // Prepare polyline paths
  const deliveryToDestinationPath = deliveryLocation && userLocation ? [
    [deliveryLocation.lat, deliveryLocation.lon],
    [userLocation.lat, userLocation.lon]
  ] : [];
  
  const restaurantToDeliveryPath = restaurantLocation && deliveryLocation ? [
    [restaurantLocation.lat, restaurantLocation.lon],
    [deliveryLocation.lat, deliveryLocation.lon]
  ] : [];

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Delivery Tracking</h2>
      
      {/* Map container */}
      <div className="h-64 mb-4 rounded-lg overflow-hidden">
        {deliveryLocation && (
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            
            {/* Restaurant Marker */}
            {restaurantLocation && (
              <Marker 
                position={[restaurantLocation.lat, restaurantLocation.lon]} 
                icon={restaurantIcon}
              >
                <Popup>Restaurant Location</Popup>
              </Marker>
            )}
            
            {/* Delivery Marker */}
            {deliveryLocation && (
              <Marker 
                position={[deliveryLocation.lat, deliveryLocation.lon]} 
                icon={deliveryIcon}
              >
                <Popup>Delivery Vehicle</Popup>
              </Marker>
            )}
            
            {/* Destination Marker */}
            {userLocation && (
              <Marker 
                position={[userLocation.lat, userLocation.lon]} 
                icon={destinationIcon}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}
            
            {/* Path from delivery to destination */}
            {deliveryToDestinationPath.length > 0 && (
              <Polyline 
                positions={deliveryToDestinationPath}
                color="blue"
                weight={3}
                dashArray="5, 10"
              />
            )}
            
            {/* Path from restaurant to delivery */}
            {restaurantToDeliveryPath.length > 0 && (
              <Polyline 
                positions={restaurantToDeliveryPath}
                color="green"
                weight={3}
              />
            )}
          </MapContainer>
        )}
      </div>
      
      {/* Location coordinates display */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-sm text-gray-600">Restaurant</div>
            <div className="font-bold">{restaurantLocation ? `${restaurantLocation.lat?.toFixed(4)}, ${restaurantLocation.lon.toFixed(4)}` : 'Loading...'}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Delivery Vehicle</div>
            <div className="font-bold">{deliveryLocation ? `${deliveryLocation.lat?.toFixed(4)}, ${deliveryLocation.lon.toFixed(4)}` : 'Loading...'}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Destination</div>
            <div className="font-bold">{userLocation ? `${userLocation.lat?.toFixed(4)}, ${userLocation.lon.toFixed(4)}` : 'Loading...'}</div>
          </div>
        </div>
      </div>
      
      {/* Delivery status, distance and ETA */}
      <div className="space-y-2">
        <p className="font-medium">
          <span className="font-bold">Status:</span> {orderStatus}
        </p>
        {distance && <p><span className="font-bold">Distance:</span> {distance} km</p>}
        {eta && <p><span className="font-bold">Estimated Time:</span> {eta}</p>}
        <button
          onClick={() => navigator.clipboard.writeText(generateTrackingLink())}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Copy Tracking Link
        </button>
      </div>
    </div>
  );
};
