import { CustomerDeliveryTracker } from "@/components/layout/realtime-map/realtime-map";
import { useParams } from "react-router-dom";

export const OrderTrackingRoute = () => {
  const { orderId } = useParams();
  
  return (
   
      <CustomerDeliveryTracker orderId={orderId} />
    
  );
};