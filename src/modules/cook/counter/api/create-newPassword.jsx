export const CreateNewPassword = (data) => {
  return api.post(`/admin/reset-password`, data);
};
// export const useCreateNewPassword=({
//     mutationConfig,
// }:useCreateNewPassword)
export const CreateNewPassword = (data) => {
  return api.post(`/cook/reset-password`, data);
};
// export const useCreateNewPassword=({
//     mutationConfig,
// }:useCreateNewPassword)
