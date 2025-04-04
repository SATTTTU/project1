// import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { adminRoutes, cookRoutes, rootRoutes } from "./routes/config";
import { notFoundRoute } from "./routes/config/notFoundRoutes";
import { userRoutes } from "./routes/config/userRoutes";
import { riderRoutes } from "./routes/config/riderRoutes";

const createAppRouter = () => {
  return createBrowserRouter([
    ...adminRoutes,
    ...rootRoutes,
    ...cookRoutes,
    ...userRoutes,
    ...notFoundRoute,
    ...riderRoutes,
  ]);
};

export const AppRouter = () => {
  //   const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
