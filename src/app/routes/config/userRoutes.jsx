import { paths } from "../../../config/paths";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { Outlet } from "react-router-dom";
import ProfileLayout from "../user/userprofile/profile";
import { ProfileContent } from "@/modules/user/userprofile/components/profileContent";
import WishlistContent from "@/modules/user/userprofile/components/wishlistContent";
import SettingsContent from "@/modules/user/userprofile/components/settingContent";
import OrdersContent from "@/modules/user/userprofile/components/ordersContent";
import ProtectedRoute from "./protectedRoute";
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
							const { RegisterPage } = await import(
								"../../routes/user/auth/register"
							);

							return { Component: RegisterPage };
						},
						// ErrorBoundary: AppRootErrorBoundary,
					},
					{
						path: paths.user.login.path,
						lazy: async () => {
							const { LoginPage } = await import(
								"../../routes/user/auth/login"
							);
							return { Component: LoginPage };
						},
					},

					{
						path: paths.user.forgotPassword.path,
						lazy: async () => {
							const { ForgotPassword } = await import(
								"../../routes/user/auth/forgot-password"
							);
							return { Component: ForgotPassword };
						},
					},
					{
						path: paths.user.resetPassword.path,
						lazy: async () => {
							const { ResetPassword } = await import(
								"../../routes/user/auth/reset-password"
							);
							return { Component: ResetPassword };
						},
					},
					{
						path: paths.user.emailVerification.path,
						lazy: async () => {
							const { Verification } = await import(
								"../../../modules/user/auth/components/verification"
							);
							return { Component: Verification };
						},
					},
					{
						path: paths.user.authPage.path,
						lazy: async () => {
							const { Home } = await import(
								"../../../modules/user/home/components/home"
							);
							return { Component: Home };
						},
					},
					{
						path: paths.user.about.path,
						lazy: async () => {
							const { About } = await import(
								"../../../modules/user/home/components/about"
							);
							return { Component: About };
						},
					},
					{
						path: paths.user.token.path,
						lazy: async () => {
							const { Verification } = await import(
								"../../../modules/user/auth/components/verification"
							);
							return { Component: Verification };
						},
					},
					{
						element: <ProtectedRoute allowedRoles={["user"]} />,
						children: [
							{
								path: paths.user.dashboard.path,
								lazy: async () => {
									const { Homepage } = await import(
										"../user/dashboard/homepage"
									);
									return { Component: Homepage };
								},
							},
							{
								path: paths.user.cart.path,
								lazy: async () => {
									const { Cart } = await import("../../routes/user/cart/cart");
									return { Component: Cart };
								},
							},

							{
								path: paths.user.changePassword.path,
								lazy: async () => {
									const { ChangePassword } = await import(
										"../../routes/user/auth/change-password"
									);
									return { Component: ChangePassword };
								},
							},

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
								path: paths.user.orderHistory.path,
								lazy: async () => {
									const { OrdersContent } = await import(
										"../../../modules/user/userprofile/components/ordersContent"
									);
									return { Component: OrdersContent };
								},
							},

							{
								path: paths.user.setting.path,
								lazy: async () => {
									const { ProfilePage } = await import(
										"../../../modules/user/userprofile/components/settingContent"
									);
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
										"../../../modules/user/categories/components/foodDetailsPage"
									);
									return { Component: FoodDetailsPage };
								},
							},

							{
								path: "/profile",
								element: <ProfileLayout />,
								children: [
									{ path: "", element: <ProfileContent /> },
									{ path: "order", element: <OrdersContent /> },
									{ path: "wishlist", element: <WishlistContent /> },
									{ path: "settings", element: <SettingsContent /> },
								],
							},
							{
								path: paths.user.payment.path,
								lazy: async () => {
									const { PaymentVerify } = await import(
										"../../../modules/user/cart/components/payment-verify"
									);
									return { Component: PaymentVerify };
								},
							},
							{
								path: paths.user.checkoutsuccess.path,
								lazy: async () => {
									const { PaymentVerification } = await import(
										"../../../modules/user/cart/components/payment-verify"
									);
									return { Component: PaymentVerification };
								},
							},
							{
								path: paths.user.orderverify.path,
								lazy: async () => {
									const { OrderSuccess } = await import(
										"../../../modules/user/cart/components/orderSuccessPage"
									);
									return { Component: OrderSuccess };
								},
							},
							
						],
					},
				],
			},
		],
	},
];
