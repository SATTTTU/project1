import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "../../../config/paths";
import RegisterPage from "../../../modules/admin/auth/register/registerPage";

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
            path: paths.admin.register.path,
            lazy: async () => {
              const { RegisterPagee } = await import(
                "../../../modules/admin/auth/register/registerPage"
              );
              return { Component: RegisterPage  };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.login.path,
            lazy: async () => {
              const { AdminLoginRoute } = await import("../admin/auth/login");
              return { Component: AdminLoginRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.forgotPassword.path,
            lazy: async () => {
              const { AdminForgotPasswordRoute } = await import(
                "../admin/auth/login"
              );
              return { Component: <AdminForgotPasswordRoute /> };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.resetPassword.path,
            lazy: async () => {
              const { AdminResetPasswordRoute } = await import(
                "../../routes/admin/auth/login"
              );
              return { Component: <AdminResetPasswordRoute /> };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
        ],
      },
      {
        path: paths.admin.dashboard.path,
        lazy: async () => {
          const { AdminDashboardRoute } = await import("../admin/auth/login");
          return { Component: <AdminDashboardRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.admin.cookDetails.path,
        lazy: async () => {
          const { AdminCookDetailsRoute } = await import("../admin/auth/login");
          return { Component: <AdminCookDetailsRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.admin.userDetails.path,
        lazy: async () => {
          const { AdminUserDetailsRoute } = await import("../admin/auth/login");
          return { Component: <AdminUserDetailsRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.admin.logout.path,
        lazy: async () => {
          const { AdminLogoutRoute } = await import("../admin/auth/login");
          return { Component: <AdminLogoutRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
    ],
  },
];
