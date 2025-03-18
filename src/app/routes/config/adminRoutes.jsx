// src/routes/adminRoutes.jsx
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "../../../config/paths";
import ProtectedRoute from "./protectedRoute";
export const adminRoutes = [
  {
    path: paths.admin.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
          // Public routes - accessible without login
          {
            path: paths.admin.register.path,
            lazy: async () => {
              const { AdminRegisterRoute } = await import(
                "../admin/auth/register"
              );
              return { Component: AdminRegisterRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.login.path,
            lazy: async () => {
              const { AdminLoginRoute } = await import("../admin/auth/login");
              return { Component: AdminLoginRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.forgotpassword.path,
            lazy: async () => {
              const { ForgotPasswordRoute } = await import(
                "../../routes/admin/auth/forgot-password"
              );
              return { Component: ForgotPasswordRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          {
            path: paths.admin.resetPassword.path,
            lazy: async () => {
              const { ResetPasswordRoute } = await import(
                "../../routes/admin/auth/reset-password"
              );
              return { Component: ResetPasswordRoute };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          
          // Protected routes - require authentication
          {
            element: <ProtectedRoute />, // Apply protection to all child routes
            children: [
              {
                path: paths.admin.dashboard.path,
                lazy: async () => {
                  const { AdminDashboardRoute } = await import(
                    "../../routes/admin/dashboard/dashboard"
                  );
                  return { Component: AdminDashboardRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.profile.path,
                lazy: async () => {
                  const { MyProfileRoute } = await import(
                    "../../routes/admin/profile/editProfile"
                  );
                  return { Component: MyProfileRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.reports.path,
                lazy: async () => {
                  const { MessagesPageRoute } = await import(
                    "../../routes/admin/reports/reports"
                  );
                  return { Component: MessagesPageRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: "/admin/cookDetails/:id",
                lazy: async () => {
                  const { CookProfileRoute } = await import(
                    "../../routes/admin/cooks/cookProfile"
                  );
                  return { Component: CookProfileRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.cookDetails.path,
                lazy: async () => {
                  const { CooksRoute } = await import(
                    "../../routes/admin/cooks/cook"
                  );
                  return { Component: CooksRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.userDetails.path,
                lazy: async () => {
                  const { DisplayUserRoute } = await import(
                    "../../routes/admin/users/user"
                  );
                  return { Component: DisplayUserRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.paymentsettingroute.path,
                lazy: async () => {
                  const { PaymentSettingsRoute } = await import(
                    "../../routes/admin/payment/paymentsetting"
                  );
                  return { Component: PaymentSettingsRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.paymentpage.path,
                lazy: async () => {
                  const { PaymentDashboardRoute } = await import(
                    "../../routes/admin/payment/payment"
                  );
                  return { Component: PaymentDashboardRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.userpaymentpage.path,
                lazy: async () => {
                  const { UserPaymentRoute } = await import(
                    "../../routes/admin/payment/userpayment"
                  );
                  return { Component: UserPaymentRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              {
                path: paths.admin.cookpaymentpage.path,
                lazy: async () => {
                  const { CookPaymentRoute } = await import(
                    "../../routes/admin/payment/cookpayment"
                  );
                  return { Component: CookPaymentRoute };
                },
                ErrorBoundary: AppRootErrorBoundary,
              },
              // {
              //   path: paths.admin.changePassword.path,
              //   lazy: async () => {
              //     const { ChangePasswordRoute } = await import(
              //       "../../routes/admin/auth/reset-password"
              //     );
              //     return { Component: ChangePasswordRoute };
              //   },
              //   ErrorBoundary: AppRootErrorBoundary,
              // },
            ],
          },
        ],
      },
    ],
  },
];

export default adminRoutes;