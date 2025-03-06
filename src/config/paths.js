import { adminPaths } from "./paths/adminPaths";
import { authPaths } from "./paths/authPaths";
import { cookPaths } from "./paths/cookPaths";
import { userPaths } from "./paths/userPaths";

export const paths={
    componentTest:{
        path:'/component-test',
        getHref:()=>'/component-text',
    },
   
    auth:authPaths,
    cook:cookPaths,
    admin:adminPaths,
    user:userPaths,
} 