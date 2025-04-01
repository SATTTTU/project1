import { useChangeAuth } from "@/hooks/changeAuth";
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const changePassword = async (userData) => {
  const response = await api.put("/api/change-password", userData);
  return response.data;
};

export const UserChangePassword = ({ mutationConfig } = {}) => {
  const { logout  } = useChangeAuth(); 
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: changePassword,
    ...mutationConfig,
    onSuccess: () => {
      logout(); 
      navigate("/login"); 
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
