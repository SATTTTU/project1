import { useParams } from "react-router-dom";
import { UserLocation } from "../../userLocation/userLocation";

export const UserTrackingRoute = () => {
  const { orderId } = useParams();
  console.log(orderId);
  
  
  if (!orderId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          No order ID found in URL parameters. Please check your route configuration.
        </div>
      </div>
    );
  }
  
  return <UserLocation orderId={orderId} />;
};