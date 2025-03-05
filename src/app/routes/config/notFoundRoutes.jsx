import { AppRootErrorBoundary } from "../app/root";

export const notFoundRoute = [
  {
    path: "*",
    lazy: async () => {
      const { NotFoundRoute } = await import("../not-found");
      return {
        Component: NotFoundRoute,
      };
    },
    ErrorBoundary: AppRootErrorBoundary,
  },
];
