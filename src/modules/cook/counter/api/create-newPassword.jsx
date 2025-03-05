export const CreateNewPassword=(data)=>{
    return api.post(`/admin/reset-password`,data);

}
// export const useCreateNewPassword=({
//     mutationConfig,
// }:useCreateNewPassword)