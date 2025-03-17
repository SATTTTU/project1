import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

const firstregisterpage = async (cookData) => {
  const response = await api.post("/api/cooks/register", cookData);
  return response.data;
};

export const useCookPreRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: firstregisterpage,
    ...mutationConfig,
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
