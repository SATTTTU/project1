import { Outlet } from "react-router-dom";
import AuthWrapperLayout from "../../../components/layout/auth/AuthWrapperLayout";

export const AppRootErrorBoundary=()=>{
    return <div>Something wrong</div>
};
export const AuthRoot =()=>{
    return (
        <AuthWrapperLayout>
            <Outlet/>
        </AuthWrapperLayout>
    )
}
export const CookRoot =()=>{
    return (
        <>
        <Outlet/>
        </>
    )
}
export const AdminRoot =()=>{
    return (
        <>
        <Outlet/>
        </>
    )
}
export const UserRoot=()=>{
    return (
        <>
        <Outlet/>
        </>
    )
}
