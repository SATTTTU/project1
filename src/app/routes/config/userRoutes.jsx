import { paths } from "../../../config/paths";
import { AppRootErrorBoundary, AuthRoot, UserRoot } from "../app/root";
import { Outlet } from "react-router-dom";

export const userRoutes = [
	{
		path: paths.user.root.path,
		element: <Outlet />,
		// ErrorBoundary: AppRootErrorBoundary,
		children: [
			{
				element: <AuthRoot />,
				children: [
				
					{
						path: paths.user.register.path,
						lazy: async () => {
							const { RegisterSection } = await import(
								"../../../modules/user/auth/components/Register/RegisterSection"
							);

							return { Component: RegisterSection };
						},
					},
					{
						path: paths.user.login.path,
						lazy: async () => {
							const { LoginSection } = await import(
								"../../../modules/user/auth/components/Login/LoginSection"
							);
							return { Component: LoginSection };
						},
					},
					// {
					// 	path: paths.user.homePage.path,
					// 	lazy: async () => {
					// 		const { Homepage } = await import(
					// 			"../../../modules/user/Homepage/components/Homepage"
					// 		);
					// 		return { Component: Homepage };
					// 	},
					// },
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
						path: paths.user.changePassword.path,
						lazy: async () => {
							const { ChangePassword } = await import(
								"../../../modules/user/auth/components/ChangePassword/ChangePassword"
							);
							return { Component: ChangePassword };
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
							const { Homepage } = await import(
								"../user/dashboard/Homepage"
							);
							return { Component: Homepage };
						},
					},
					{
						path: paths.user.cart.path,
						lazy: async () => {
							const { Cart } = await import(
								"../../routes/user/cart/cart"
							);
							return { Component: Cart };
						},
					},
					// {
					//   path: paths.user.checkout.path,
					//   lazy: async () => {
					//     const { Checkout } = await import("../pages/Checkout");
					//     return { Component: <Checkout /> };
					//   },
					// },
					{
						path: paths.user.profile.path,
						lazy: async () => {
							const { ProfilePage } = await import(
								"../user/userprofile/profile"
							);
							return { Component: ProfilePage };
						},
					},
					{
						path: paths.user.authPage.path,
						lazy: async () => {
							const { Home } = await import(
								"../../../modules/user/LandingPage/components/Home"
							);
							return { Component: Home };
						},
					},
					{
						path: paths.user.orderHistory.path,
						lazy: async () => {
							const { ProfilePage } = await import(
								"../../../modules/user/Homepage/component/ProfilePage"
							);
							return { Component: ProfilePage };
						},
					},
					  {
						path: paths.user.favourite.path,
						lazy: async () => {
						  const { ProfilePage } = await import("../../../modules/user/Homepage/component/ProfilePage");
						  return { Component: ProfilePage };
						},
					  },
					  {
						path: paths.user.setting.path,
						lazy: async () => {
						  const { ProfilePage } = await import("../../../modules/user/Homepage/component/ProfilePage");
						  return { Component: ProfilePage };
						},
					  },
				
					{
						path: paths.user.cookDetails.path,
						lazy: async () => {
							const { CookProfile } = await import(
								"../../routes/user/cooks/cooks"
							);
							return { Component: CookProfile };
						},
					},
					{
						path: paths.user.foodCategories.path,
						lazy: async () => {
							const { CategoryPage } = await import(
								"../../routes/user/categories/categories"
							);
							return { Component: CategoryPage };
						},
					},
					{
						path: paths.user.foodDetails.path,
						lazy: async () => {
							const { FoodDetails } = await import(
								"../user/menu/foodDetails"
							);
							return { Component: FoodDetails };
						},
					},
					{
						path: paths.user.categoryFoodDetails.path,
						lazy: async () => {
							const { FoodDetailsPage } = await import(
								"../../../modules/user/CategoriesSection/components/FoodDetailsPage"
							);
							return { Component: FoodDetailsPage };
						},
					},
					// {
					// 	path: paths.user.mainPage.path,
					// 	lazy: async () => {
					// 		const { HomePage } = await import(
					// 			"../../../modules/user/LandingPage/HomePage"
					// 		);
					// 		return { Component: HomePage };
					// 	},
					// },
					{
						path: paths.user.about.path,
						lazy: async () => {
							const { About } = await import(
								"../../../modules/user/LandingPage/components/About"
							);
							return { Component: About };
						},
					},
				],
			},
		],
		
	},

];
