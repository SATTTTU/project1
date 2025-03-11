import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "../../../config/paths";

export const adminRoutes = [
  {
    path: paths.admin.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
          {
            path: paths.admin.login.path,
            lazy: async () => {
              const { LoginRoute } = await import(
                "../../routes/admin/auth/components/login/login"
              );
              return { Component: LoginRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.dashboard.path,
            lazy: async () => {
              const { HomePageRoute } = await import(
                "../../routes/admin/auth/components/homepage/homepage"
              );
              return { Component: HomePageRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.resetPassword.path,
            lazy: async () => {
              const { ResetPasswordRoute } = await import(
                "../../routes/admin/auth/components/reset-password/resetpassword"
              );
              return { Component: ResetPasswordRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.profile.path,
            lazy: async () => {
              const { AdminProfileRoute } = await import(
                "../../routes/admin/auth/components/homepage/adminprofile/adminprofile"
              );
              return { Component: AdminProfileRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.reports.path,
            lazy: async () => {
              const { ReportsRoute } = await import(
                "../../routes/admin/auth/components/messagepage/report"
              );
              return { Component: ReportsRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: "cook-profile/:id",
            lazy: async () => {
              const { CookPageProfileRoute } = await import(
                "../../routes/admin/auth/components/cooksection/cookpage"
              );
              return { Component: CookPageProfileRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.cookDetails.path,
            lazy: async () => {
              const { CookPageRoute } = await import(
                "../../routes/admin/auth/components/cooksection/cookpage"
              );
              return { Component: CookPageRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.userDetails.path,
            lazy: async () => {
              const { DisplayUserRoute } = await import(
                "../../routes/admin/auth/components/displayuser/displayuser"
              );
              return { Component: DisplayUserRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.paymentsettingroute.path,
            lazy: async () => {
              const { PaymentSettingRoutes } = await import(
                "../../routes/admin/auth/components/payments/settingspay/settings"
              );
              return { Component: PaymentSettingRoutes };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.paymentpage.path,
            lazy: async () => {
              const { PaymentsRoute } = await import(
                "../../routes/admin/auth/components/payments/payments"
              );
              return { Component: PaymentsRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.userpaymentpage.path,
            lazy: async () => {
              const { UserPaymentsRoute } = await import(
                "../../routes/admin/auth/components/payments/userpayments/userpayment"
              );
              return { Component: UserPaymentsRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.cookpaymentpage.path,
            lazy: async () => {
              const { CookPaymentsRoute } = await import(
                "../../routes/admin/auth/components/payments/cookpayments/cookpayments"
              );
              return { Component: CookPaymentsRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
        ],
      },
    ],
  },
];
