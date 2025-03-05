// import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { adminRoutes, cookRoutes, rootRoutes } from "./routes/config";
import { notFoundRoute } from "./routes/config/notFoundRoutes";
import { userRoutes } from "./routes/config/userRoutes";

const createAppRouter = () => {
  return createBrowserRouter([
    ...adminRoutes, // पहिले admin routes
    ...rootRoutes, // त्यसपछि root routes
    ...cookRoutes,
    ...userRoutes, // अन्य routes
    ...notFoundRoute, // अन्त्यमा 404 route
  ]);
};

export const AppRouter = () => {
  //   const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
