import { useParams } from "react-router-dom";
import { RiderPages } from "./riderPage";

export const RiderPage = () => {
  // Get orderId from URL
  const { orderId } = useParams();
  
  console.log("Order ID from params:", orderId);
  
  if (!orderId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          No order ID found in URL parameters. Please check your route configuration.
        </div>
      </div>
    );
  }
  
  return <RiderPages orderId={orderId} />;
};