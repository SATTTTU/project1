// api/cookregister.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

// Function to handle document upload
const uploadCookDocuments = (data) => {
  // Create FormData object to handle file uploads
  const formData = new FormData();
  formData.append('passportSizePhoto', data.passportSizePhoto);
  formData.append('citizenshipFront', data.citizenshipFront);
  formData.append('citizenshipBack', data.citizenshipBack);
  
  return api.post(`/cooks/upload-documents`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  });
};

// Custom hook for document upload
export const useRegisterCookDocuments = () => {
  const queryClient = useQueryClient();
  
  return useMutation(uploadCookDocuments, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']); 
    },
  });
};