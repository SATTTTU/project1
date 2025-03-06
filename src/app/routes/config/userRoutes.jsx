import { paths } from "../../../config/paths";
import { AppRootErrorBoundary, UserRoot } from "../app/root";
import { UserLoginRoute } from "../user/auth/login";

export const userRoutes = [
  {
    path: paths.user.root.path,
    element: <UserRoot />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      // {
      //   path: paths.user.register.path,
      //   lazy: async () => {
      //     const { Register } = await import("../user/auth/Register");
      //     return { Component: <Register /> };
      //   },
      // },
      {
        path: paths.user.login.path,
        lazy: async () => {
          const { UserLoginRoute } = await import("../user/auth/login");
          return { Component: UserLoginRoute };
        },
      },
      {
        path: paths.user.forgotPassword.path,
        lazy: async () => {
          const { ForgotPassword } = await import("../pages/ForgotPassword");
          return { Component: ForgotPassword  };
        },
      },
      {
        path: paths.user.resetPassword.path,
        lazy: async () => {
          const { ResetPassword } = await import("../pages/ResetPassword");
          return { Component: <ResetPassword /> };
        },
      },
      {
        path: paths.user.homePage.path,
        lazy: async () => {
          const { Home } = await import("../pages/Home");
          return { Component: <Home /> };
        },
      },
      {
        path: paths.user.cart.path,
        lazy: async () => {
          const { Cart } = await import("../pages/Cart");
          return { Component: <Cart /> };
        },
      },
      {
        path: paths.user.checkout.path,
        lazy: async () => {
          const { Checkout } = await import("../pages/Checkout");
          return { Component: <Checkout /> };
        },
      },
      {
        path: paths.user.profile.path,
        lazy: async () => {
          const { Profile } = await import("../pages/Profile");
          return { Component: <Profile /> };
        },
      },
      {
        path: paths.user.cookDetails.path,
        lazy: async () => {
          const { CookDetails } = await import("../pages/CookDetails");
          return { Component: <CookDetails /> };
        },
      },
    ],
  },
];
