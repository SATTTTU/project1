// import { Homepage } from "@/modules/user/auth/components/Dashboard/Homepage/Homepage";
import { paths } from "../../../config/paths";
import { AppRootErrorBoundary, UserRoot } from "../app/root";
import { UserLoginRoute } from "../user/auth/login";
// import { HomePageRoute } from "../user/homepage/home";

export const userRoutes = [
	{
		path: paths.user.root.path,
		element: <UserRoot />,
		ErrorBoundary: AppRootErrorBoundary,
		children: [
			{
			  path: paths.user.register.path,
			  lazy: async () => {
			    const { UserLoginRoute } = await import("../../../modules/user/auth/components/Auth/LoginSection/");
      
			    return { Component: UserLoginRoute };
			  },
			},
			{
				path: paths.user.login.path,
				lazy: async () => {
					const { UserLoginRoute } = await import("../user/auth/login");
					return { Component: UserLoginRoute };
				},
			},
			{
				path: paths.user.homePage.path,
				lazy: async () => {
					const { Homepage } = await import(
						"../../../modules/user/auth/components/Dashboard/Homepage/Homepage"
					);
					return { Component: Homepage };
				},
			},
			{
				path: paths.user.forgotPassword.path,
				lazy: async () => {
					const { ForgotPassword } = await import(
						"../../../modules/user/auth/components/ForgetPassword/ForgetPassword"
					);
					return { Component: ForgotPassword };
				},
			},
			{
				path: paths.user.resetPassword.path,
				lazy: async () => {
					const { ResetPassword } = await import(
						"../../../modules/user/auth/components/ResetPassword/ResetPassword"
					);
					return { Component: ResetPassword };
				},
			},
			{
				path: paths.user.emailVerification.path,
				lazy: async () => {
					const { Verification } = await import(
						"../../../modules/user/auth/components/EmailVerification/Verification"
					);
					return { Component: Verification };
				},
			},
      {
				path: paths.user.dashboard.path,
				lazy: async () => {
					const { Layout } = await import(
						"../../../modules/user/auth/components/Dashboard/Layout"
					);
					return { Component: Layout };
				},
			},
			{
			  path: paths.user.cart.path,
			  lazy: async () => {
			    const { Cart } = await import("../../../modules/user/auth/components/Cart/Cart");
			    return { Component: Cart};
			  },
			},
			// {
			//   path: paths.user.checkout.path,
			//   lazy: async () => {
			//     const { Checkout } = await import("../pages/Checkout");
			//     return { Component: <Checkout /> };
			//   },
			// },
			// {
			//   path: paths.user.profile.path,
			//   lazy: async () => {
			//     const { Profile } = await import("../../../modules/user/auth/components/Profile/Profile");
			//     return { Component: Profile };
			//   },
			// },
      {
			  path: paths.user.profileEdit.path,
			  lazy: async () => {
			    const { ProfileEdit } = await import("../../../modules/user/auth/components/Profile/ProfileEdit");
			    return { Component: ProfileEdit };
			  },
			},
			// {
			//   path: paths.user.cookDetails.path,
			//   lazy: async () => {
			//     const { CookDetails } = await import("../pages/CookDetails");
			//     return { Component: <CookDetails /> };
			//   },
			// },
		],
	},
];
