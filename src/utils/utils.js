export const getToken =(userType)=>{
    const tokenKey =`${userType}_token`;
    return localStorage.getItem(tokenKey)
}