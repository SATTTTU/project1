import { AppRootErrorBoundary } from "../app/root";

export const socketRoute = [
  {
    path: "/socket",
    lazy: async () => {
      const { Socket } = await import("./../../../modules/Socket");
      return {
        Component: Socket,
      };
    },
    ErrorBoundary: AppRootErrorBoundary,
  },
  
];
