import { useChangeAuth } from "@/hooks/changeAuth";
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // <-- import toast

const changePassword = async (userData) => {
  const response = await api.put("/api/change-password", userData);
  return response.data;
};

export const UserChangePassword = ({ mutationConfig } = {}) => {
  const { logout } = useChangeAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: changePassword,
    ...mutationConfig,

    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully."); // ✅ show success toast
      logout();
      navigate("/login");
    },

    onError: (error) => {
      console.log("errors ***", error.response?.data.error);

      const errorMessage = error?.response?.data?.error;

      if (errorMessage === "Old password is incorrect") {
        toast.error("The current password you entered is incorrect."); // ✅ show specific error toast
        throw new Error("Incorrect old password");
      } else {
        toast.error("Something went wrong. Please try again."); // ✅ fallback error toast
        throw new Error("An unknown error occurred");
      }
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
