import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "../../../config/paths";

export const adminRoutes = [
  {
    path: paths.admin.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
          {
            path: paths.admin.login.path,
            lazy: async () => {
              const LoginPage = await import(
                "../../../modules/admin/auth/components/registerPage/registerPage"
              ).then((module) => module.default);
              return { Component: LoginPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },

          {
            path: paths.admin.dashboard.path,
            lazy: async () => {
              const { AdminDashboard } = await import(
                "../../../modules/admin/auth/components/homepage/admindashboard/dashboard"
              );
              return { Component: AdminDashboard };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.resetPassword.path,
            lazy: async () => {
              const { ResetPassword } = await import(
                "../../../modules/admin/auth/components/resetPassword/resetPassword"
              );
              return { Component: ResetPassword };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.profile.path,
            lazy: async () => {
              const { MyProfile } = await import(
                "../../../modules/admin/auth/components/homepage/admindashboard/profile/adminInformationwithEdit"
              );
              return { Component: MyProfile };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: "cook-profile/:id",
            lazy: async () => {
              const { CookProfile } = await import(
                "../../../modules/admin/auth/components/cookSection/individualCookPage"
              );
              return { Component: CookProfile };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.cookDetails.path,
            lazy: async () => {
              const { AdminCooksTable } = await import(
                "../../../modules/admin/auth/components/cookSection/cookPage"
              );
              return { Component: AdminCooksTable };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.userDetails.path,
            lazy: async () => {
              const { DisplayUser } = await import(
                "../../../modules/admin/auth/components/userSection/displayUser"
              );
              return { Component: DisplayUser };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.logout.path,
            lazy: async () => {
              const { AdminLogoutRoute } = await import("../admin/auth/login");
              return { Component: AdminLogoutRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
        ],
      },
    ],
  },
];
