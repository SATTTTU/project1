import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const getLocation = () => {
    return api.get(`/api/cooks/get-location`);
  };
  
  export const useGetLocation = ({ deliveryid, type }) => {
    return useQuery({
      queryKey: ['location', deliveryid, type],
      queryFn: async () => {
        const response = await getLocation({ deliveryid, type });
        return response.data;
      },
      refetchInterval: (data) => 
        data?.status === 'completed' ? false : 5000
    })
}
  