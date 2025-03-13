import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";

export const CreateNewPassword=(data)=>{
    return api.post(`/admin/reset-password`,data);

}
export const useAdminResetPassword = ({ mutationConfig } = {}) => {
    const mutation = useMutation({
      mutationFn: CreateNewPassword,
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