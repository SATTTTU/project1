import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// First registration page - returns client ID
export const firstRegisterPage = async (cookData) => {
  const response = await api.post("/api/cooks/register", cookData);
  // Store client ID in localStorage for persistence
  if (response.data.clientId) {
    localStorage.setItem('cookClientId', response.data.clientId);
  }
  return response.data;
};

export const useCookPreRegister = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: firstRegisterPage,
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

// Document upload with client ID
export const uploadDocuments = async (formData) => {
  // Ensure clientId is included in the form data
  const clientId = formData.clientId || localStorage.getItem('cookClientId');
  if (!clientId) {
    throw new Error("No client ID found");
  }
  
  // Create a new FormData object if not already one
  const dataToSend = formData instanceof FormData ? formData : new FormData();
  
  // Add clientId if using FormData
  if (formData instanceof FormData && !formData.has('clientId')) {
    dataToSend.append('clientId', clientId);
  }
  
  const response = await api.post("/api/cooks/documents", dataToSend);
  return response.data;
};

export const useCookDocumentUpload = ({ mutationConfig } = {}) => {
  const mutation = useMutation({
    mutationFn: uploadDocuments,
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

// Email Verification
export const verifyEmail = async ({ id, hash }) => {
  const response = await api.get(`/api/cooks/email/verify/${id}/${hash}`);
  
  // If verification returns a client ID, store it
  if (response.data.clientId) {
    localStorage.setItem('cookClientId', response.data.clientId);
  }
  
  return response.data;
};

export const useVerifyEmail = (options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = options;
  
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ["auth-status"],
      });
      onSuccess?.(...args);
    },
    ...restConfig
  });
};

// Helper to get client ID from various sources
export const getClientId = () => {
  // Try URL params first
  const urlParams = new URLSearchParams(window.location.search);
  const urlClientId = urlParams.get('clientId');
  
  // Then localStorage
  const storedClientId = localStorage.getItem('cookClientId');
  
  return urlClientId || storedClientId || null;
};