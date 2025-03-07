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
              const { RegisterPage } = await import(
                "../../../modules/cook/auth/register/registerPage"
              );
              return { Component: RegisterPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.registerPage.path,
            lazy: async () => {
              const { firstRegisterPage } = await import(
                "../../../modules/cook/auth/components/firstRegisterPage/firstRegisterPage"
              );
              return { Component: firstRegisterPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.pendingPage.path,
            lazy: async () => {
              const { pendingPage } = await import(
                "../../../modules/cook/auth/components/pendingPage/pendingPage"
              );
              return { Component: pendingPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.homepage.path,
            lazy: async () => {
              const { homepage } = await import(
                "../../../modules/cook/components/homepage/homepage"
              );
              return { Component: homepage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.orderpage.path,
            lazy: async () => {
              const { OrderPage } = await import(
                "../../../modules/cook/components/orderpage/orderPage"
              );
              return { Component: OrderPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.cookProfile.path,
            lazy: async () => {
              const { cookProfile } = await import(
                "../../../modules/cook/components/cookProfile/cookProfile"
              );
              return { Component: cookProfile };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.earningsPage.path,
            lazy: async () => {
              const { EarningsPage } = await import(
                "../../../modules/cook/components/earningsPage/earningsPage"
              );
              return { Component: EarningsPage };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.emailVerification.path,
            lazy: async () => {
              const { EmailVerification } = await import(
                "../../../modules/cook/auth/components/mailVerification/mailVerification"
              );
              return { Component: EmailVerification };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.forgetPassword.path,
            lazy: async () => {
              const { ForgotPassword } = await import(
                "../../../modules/cook/auth/components/forgetPassword/forgetPassword"
              );
              return { Component: ForgotPassword };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.resetPassword.path,
            lazy: async () => {
              const { ResetPassword } = await import(
                "../../../modules/cook/auth/components/resetPassword/resetPassword"
              );
              return { Component: ResetPassword };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.cook.login.path,
            lazy: async () => {
              const { Login } = await import(
                "../../../modules/cook/auth/login/login"
              );
              return { Component: Login };
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
