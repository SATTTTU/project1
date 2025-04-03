import { Navigate } from "react-router-dom";
import { paths } from "../../../config/paths";
import { Component } from "react";

export const rootRoutes = [
  {
    path: "/cook",
    element: <Navigate to={paths.cook.root.path} />,
  },
  {
    path: "/admin",
    element: <Navigate to={paths.admin.root.path} />,
  },
  {
    path: "/user",
    element: <Navigate to={paths.user.root.path} />,
  },
 
  

  // {
  //   path: "/",
  //   lazy: async () => {
  //     const { HomePageRoute } = await import(
  //       "../../routes/admin/auth/components/homepage/homepage"
  //     );
  //     return { Component: HomePageRoute };
  //   },
  // },
  {
    path: "/",
    lazy: async () => {
      const { Layout } = await import(
        "../user/home/layout"
      );
      return { Component: Layout };
    },
  },
];
