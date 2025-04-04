import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "../../../config/paths";

export const riderRoutes = [
  {
    path: paths.rider.root.path, // '/rider'
    element: <Outlet />, // Renders the child routes
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />, // Renders login and other auth-related routes
        children: [
          // Public route: accessible without login
          {
            path: "login", // Relative path (no leading "/")
            lazy: async () => {
              const { RiderLoginForm } = await import(
                "../../../modules/rider/components/riderLogin"
              );
              return { Component: RiderLoginForm };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.rider.home.path, // Relative path (no leading "/")
            lazy: async () => {
              const { RiderPage } = await import(
                "../../../modules/rider/components/riderPage"
              );
              return { Component: RiderPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: '/rider/main', // Relative path (no leading "/")
            lazy: async () => {
              const { RiderPage } = await import(
                "../../../modules/rider/components/riderPage"
              );
              return { Component: RiderPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },

          // Add more routes here for protected routes, if needed
        ],
      },
    ],
  },
];
