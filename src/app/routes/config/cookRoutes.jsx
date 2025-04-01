import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "../../../config/paths";
import ProtectedRoute from "./protectedRoute";

export const cookRoutes = [
  {
    path: paths.cook.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
          // Public routes - no authentication required
          {
            path: paths.cook.register.path,
            lazy: async () => {
              const { RegisterPage } = await import(
                "../cook/auth/registerpage"
              );
              return { Component: RegisterPage};
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.registerPage.path,
            lazy: async () => {
              const { FirstRegisterPageRoute } = await import(
                "../cook/auth/preregisterpage"
              );
              return { Component: FirstRegisterPageRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
         
          {
            path: paths.cook.login.path,
            lazy: async () => {
              const { Login } = await import("../cook/auth/login");
              return { Component: Login };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.forgetPassword.path,
            lazy: async () => {
              const { forgetPasswordroute } = await import(
                "../cook/auth/forgetpassword"
              );
              return { Component: forgetPasswordroute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.pendingPage.path,
            lazy: async () => {
              const { PendingPageroute } = await import(
                "../cook/auth/pendingpage"
              );
              return { Component: PendingPageroute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.resetPassword.path,
            lazy: async () => {
              const { ResetPasswordRoute } = await import(
                "../cook/auth/resetpassword"
              );
              return { Component: ResetPasswordRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.emailVerification.path,
            lazy: async () => {
              const { VerificationRoute } = await import(
                "../cook/auth/verification"
              );
              return { Component: VerificationRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },

          // Protected routes - require cook authentication
          {
            element: <ProtectedRoute allowedRoles={["cook"]} />,
            children: [
              {
                path: paths.cook.homepage.path,
                lazy: async () => {
                  const { Homepage } = await import(
                    "../cook/homepage/homepage"
                  );
                  return { Component: Homepage };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.cook.orderpage.path,
                lazy: async () => {
                  const { OrderPage } = await import("../cook/order/order");
                  return { Component: OrderPage };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.cook.cookProfile.path,
                lazy: async () => {
                  const { ProfileRoute } = await import(
                    "../cook/profile/profile"
                  );
                  return { Component: ProfileRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.cook.earningsPage.path,
                lazy: async () => {
                  const { WithdrawEarnings } = await import(
                    "../../routes/cook/earnings/earnings"
                  );
                  return { Component: WithdrawEarnings };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.cook.menupage.path,
                lazy: async () => {
                  const { MenuPage } = await import("../cook/menu/menu");
                  return { Component: MenuPage };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.cook.historyPage.path,
                lazy: async () => {
                  const { HistoryPage } = await import(
                    "../cook/history/history"
                  );
                  return { Component: HistoryPage };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.cook.cookmap.path,
                lazy: async () => {
                  const { CustomerDeliveryTracker } = await import(
                    "../../../components/layout/realtime-map/realtime-map"
                  );
                  return { Component: CustomerDeliveryTracker };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              
            ],
          },
        ],
      },
      // {
      //   path: paths.cook.profile.path,
      //   lazy: async () => {
      //     const { CookProfileRoute } = await import("../admin/auth/login");
      //     return { Component: <CookProfileRoute /> };
      //   },
      //   ErrorBoundary: AppRootErrorBoundary,
      // },
      // {
      //   path: paths.cook.notification.path,
      //   lazy: async () => {
      //     const { CookOrderRoute } = await import("../admin/auth/login");
      //     return { Component: <CookOrderRoute /> };
      //   },
      //   ErrorBoundary: AppRootErrorBoundary,
      // },
      // {
      //   path: paths.cook.order.path,
      //   lazy: async () => {
      //     const { CookEarningRoute } = await import("../admin/auth/login");
      //     return { Component: <CookEarningRoute /> };
      //   },
      //   ErrorBoundary: AppRootErrorBoundary,
      // },

      // {
      //   path: paths.cook.withdraw.path,
      //   lazy: async () => {
      //     const { CookWithdrawRoute } = await import("../admin/auth/login");
      //     return { Component: <CookWithdrawRoute /> };
      //   },
      //   ErrorBoundary: AppRootErrorBoundary,
      // },
    ],
  },
];
