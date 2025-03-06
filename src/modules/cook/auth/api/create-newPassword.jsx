export const CreateNewPassword = (data) => {
  return api.post(`/cook/reset-password`, data);
};
// export const useCreateNewPassword=({
//     mutationConfig,
// }:useCreateNewPassword)
