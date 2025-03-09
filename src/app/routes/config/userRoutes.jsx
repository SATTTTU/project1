import { paths } from "../../../config/paths";
import { AppRootErrorBoundary, AuthRoot, UserRoot } from "../app/root";
import { Outlet } from "react-router-dom";

export const userRoutes = [
	{
		path: paths.user.root.path,
		element: <Outlet />,
		ErrorBoundary: AppRootErrorBoundary,
		children: [
			{
				element: <AuthRoot />,
				children: [
				
					{
						path: paths.user.register.path,
						lazy: async () => {
							const { RegisterSection } = await import(
								"../../../modules/user/auth/components/Auth/RegisterSection"
							);

							return { Component: RegisterSection };
						},
					},
					{
						path: paths.user.login.path,
						lazy: async () => {
							const { LoginSection } = await import(
								"../../../modules/user/auth/components/Auth/LoginSection"
							);
							return { Component: LoginSection };
						},
					},
					{
						path: paths.user.homePage.path,
						lazy: async () => {
							const { Homepage } = await import(
								"../../../modules/user/Homepage/components/Homepage"
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
								"../../../modules/user/Homepage/components/Layout"
							);
							return { Component: Layout };
						},
					},
					{
						path: paths.user.cart.path,
						lazy: async () => {
							const { Cart } = await import(
								"../../../modules/user/Homepage/components/Cart/Cart"
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
							const { Profile } = await import(
								"../../../modules/user/Homepage/components/Profile"
							);
							return { Component: Profile };
						},
					},
					// {
					// 	path: paths.user.orderHistory.path,
					// 	lazy: async () => {
					// 		const { OrderHistory } = await import(
					// 			"../../../modules/user/auth/components/Dashboard/OrderHistory/OrderHistory"
					// 		);
					// 		return { Component: OrderHistory };
					// 	},
					// },
					//   {
					// 	path: paths.user.favourite.path,
					// 	lazy: async () => {
					// 	  const { Profile } = await import("../../../modules/user/auth/components/Profile/Profile");
					// 	  return { Component: Profile };
					// 	},
					//   },
					//   {
					// 	path: paths.user.address.path,
					// 	lazy: async () => {
					// 	  const { Profile } = await import("../../../modules/user/auth/components/Profile/Profile");
					// 	  return { Component: Profile };
					// 	},
					//   },
					// {
					// 	path: paths.user.profileEdit.path,
					// 	lazy: async () => {
					// 		const { ProfileEdit } = await import(
					// 			"../../../modules/user/auth/components/Profile/ProfileEdit"
					// 		);
					// 		return { Component: ProfileEdit };
					// 	},
					// },
					{
						path: paths.user.cookDetails.path,
						lazy: async () => {
							const { CookProfile } = await import(
								"../../../modules/user/Homepage/components/CookProfile/CookProfile"
							);
							return { Component: CookProfile };
						},
					},
					{
						path: paths.user.foodCategories.path,
						lazy: async () => {
							const { CategoryPage } = await import(
								"../../../modules/user/Homepage/components/Categories/CategoryPage"
							);
							return { Component: CategoryPage };
						},
					},
					{
						path: paths.user.foodDetails.path,
						lazy: async () => {
							const { FoodDetails } = await import(
								"../../../modules/user/Homepage/components/FoodDetails/FoodDetails"
							);
							return { Component: FoodDetails };
						},
					},
					{
						path: paths.user.categoryFoodDetails.path,
						lazy: async () => {
							const { FoodDetails } = await import(
								"../../../modules/user/Homepage/components/FoodDetails/FoodDetails"
							);
							return { Component: FoodDetails };
						},
					},
				],
			},
		],
		
	},
	{
		path: paths.user.profileEdit.path,
		lazy: async () => {
		  const { Layout } = await import("../../../modules/user/Homepage/components/Layout")
		  return { Component: Layout }
		},
		children: [
		  {
			path: "",
			lazy: async () => {
			  const ProfileEdit = await import("../../../modules/user/Homepage/components/Profile")
			  return { Component: ProfileEdit }
			},
		  },
		  {
			path: "order",
			lazy: async () => {
			  const{ OrderHistory} = await import("../../../modules/user/Homepage/components/OrderHistory")
			  return { Component: OrderHistory }
			},
		  },
		  {
			path: "favorites",
			lazy: async () => {
			  const Favorites = await import("../../../modules/user/Homepage/components/Favorites")
			  return { Component: Favorites.default }
			},
		  },
		  {
			path: "saved-addresses",
			lazy: async () => {
			  const SavedAddresses = await import("../../../modules/user/Homepage/components/SavedAddresses")
			  return { Component: SavedAddresses.default }
			},
		  },
		],
	  },
];
