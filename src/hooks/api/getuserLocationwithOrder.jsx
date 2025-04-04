import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// API call to fetch location based on orderId and user type
export const getLocation = () => {
    return api.get(`/api/users/get-location`);
  };
  
  // Custom Hook for fetching location
  export const useGetLocation = ({ orderId, type }) => {
    return useQuery({
      queryKey: ['location', orderId, type],
      queryFn: async () => {
        const response = await getLocation({ orderId, type });
        return response.data;
      },
      // Dynamic refetch based on order status
      refetchInterval: (data) => 
        data?.status === 'completed' ? false : 5000
    })
}
  