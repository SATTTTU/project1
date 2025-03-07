import { AppRootErrorBoundary } from "../app/root";

export const notFoundRoute = [
  {
    path: "*",
    lazy: async () => {
      const { NotFoundPage } = await import("../not-found");
      return {
        Component: NotFoundPage,
      };
    },
    ErrorBoundary: AppRootErrorBoundary,
  },
];
