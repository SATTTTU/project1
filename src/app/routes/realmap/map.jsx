import { CustomerDeliveryTracker } from "@/components/layout/realtime-map/realtime-map";
import { useParams } from "react-router-dom";

export const OrderTrackingRoute = () => {
  const { orderId } = useParams();
  console.log("OrderTrackingRoute orderId:", orderId);
  
  // Simple test component to verify routing works
  return (
    <div className="p-8 bg-blue-100">
      <h1 className="text-2xl font-bold">Order Tracking Test Page</h1>
      <p className="mt-4">Order ID: {orderId}</p>
      <p className="mt-2">If you can see this, routing is working correctly.</p>
      {/* Only after confirming routing works, uncomment this: */}
      <CustomerDeliveryTracker orderId={orderId} />
    </div>
  );
};