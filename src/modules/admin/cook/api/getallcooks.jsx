import { api } from "@/lib/api-client";
import { useMutation} from "@tanstack/react-query";

// Get All Cooks API Call without parameters (fetch all)
export const getAllCooks = () => {
  return api.get('/api/admins/get-all-cooks');
};

export const useGetAllCooks = ({ mutationConfig } = {}) => {

  const mutation = useMutation({
    mutationFn: getAllCooks,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
  };
};