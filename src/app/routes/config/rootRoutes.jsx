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
    path: paths.componentTest.path,
    lazy: async () => {
      const { ComponentTest } = await import(
        "../../routes/admin/auth/componentTest"
      );
      return {Component: ComponentTest};
    },
  },

  {
    path: "/",
    lazy: async () => {
      const { ComponentTest } = await import(
        "../../routes/admin/auth/componentTest"
      );
      return { Component: ComponentTest };
    },
  },
];
