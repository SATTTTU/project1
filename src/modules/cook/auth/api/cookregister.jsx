import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

// Fixing async and await
// eslint-disable-next-line react-refresh/only-export-components
const RegisterCook = async (cookdata) => {
  const response = await api.post("/api/cooks/upload-documents", cookdata);
  return response.data; // Return response data
};

export const useCookRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: RegisterCook,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isLoading, // Fixed the state
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
