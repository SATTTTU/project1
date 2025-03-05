import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "../../../config/paths";

export const cookRoutes = [
  {
    path: paths.cook.root.path,
    // element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
          {
            path: paths.cook.register.path,
            lazy: async () => {
              const { CookRegisterRoute } = await import(
                "@/app/routes/cook/auth/register"
              );
              return { Component: <CookRegisterRoute /> };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.login.path,
            lazy: async () => {
              const { AdminLoginRoute } = await import("../admin/auth/login");
              return { Component: <AdminLoginRoute /> };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
        ],
      },
      {
        path: paths.cook.profile.path,
        lazy: async () => {
          const { CookProfileRoute } = await import("../admin/auth/login");
          return { Component: <CookProfileRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.cook.notification.path,
        lazy: async () => {
          const { CookOrderRoute } = await import("../admin/auth/login");
          return { Component: <CookOrderRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.cook.order.path,
        lazy: async () => {
          const { CookEarningRoute } = await import("../admin/auth/login");
          return { Component: <CookEarningRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
      {
        path: paths.cook.withdraw.path,
        lazy: async () => {
          const { CookWithdrawRoute } = await import("../admin/auth/login");
          return { Component: <CookWithdrawRoute /> };
        },
        ErrorBoundary: AppRootErrorBoundary,
      },
    ],
  },
];
