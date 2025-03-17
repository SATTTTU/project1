// import { api } from "@/lib/api-client";
// import { useMutation } from "@tanstack/react-query";

// // Fixing async and await
// const loginCook = async (cookdata) => {
//   const response = await api.post("/api/cooks/login", cookdata);
//   return response.data; // Return response data
// };

// export const useCookLogin = ({ mutationConfig } = {}) => {
//   const mutation = useMutation({
//     mutationFn: loginCook,
//     ...mutationConfig,
//   });

//   return {
//     mutateAsync: mutation.mutateAsync,
//     isLoading: mutation.isLoading, // Fixed the state
//     error: mutation.error,
//     isError: mutation.isError,
//     isSuccess: mutation.isSuccess,
//   };
// };
