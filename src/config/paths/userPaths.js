export const userPaths = {
	root: {
		path: "/",
		getHref: () => "/",
	},

	register: {
		path: "/register",
		getHref: (redirectTo) =>
			`/register${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	login: {
		path: "/login",
		getHref: (redirectTo) =>
			`/login${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	forgotPassword: {
		path: "/user/forgotpassword",
		getHref: (redirectTo) =>
			`/user/forgotpassword${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	resetPassword: {
		path: "/user/resetpassword",
		getHref: (redirectTo) =>
			`/user/resetpassword${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	changePassword: {
		path: "/user/changepassword",
		getHref: (redirectTo) =>
			`/user/changepassword${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	emailVerification: {
		path: "/user/verification",
		getHref: (redirectTo) =>
			`/user/verification${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	dashboard: {
		path: "/user/dashboard",
		getHref: (redirectTo) =>
			`/user/dashboard${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},

	cart: {
		path: "/user/cart",
		getHref: (redirectTo) =>
			`/user/cart${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	checkout: {
		path: "/user/checkout",
		getHref: (redirectTo) =>
			`/user/checkout${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	profileEdit: {
		path: "/user/profileEdit",
		getHref: (redirectTo) =>
			`/user/profileEdit${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	profile: {
		path: "/user/profile",
		getHref: (redirectTo) =>
			`/user/profile${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	// profileContent: {
	// 	path: "/user/profiles",
	// 	getHref: (redirectTo) =>
	// 		`/user/profiles${
	// 			redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
	// 		}`,
	// },
	orderHistory: {
		path: "/user/orders",
		getHref: (redirectTo) =>
			`/user/orders${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	favourite: {
		path: "/profile/favourite",
		getHref: (redirectTo) =>
			`/profile/favourite${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	setting: {
		path: "/user/setting",
		getHref: (redirectTo) =>
			`/user/setting${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	cookDetails: {
		path: "/cook/:id",
		getHref: (redirectTo) =>
			`/cook/:id${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	foodCategories: {
		path: "/category/:id",
		getHref: (redirectTo) =>
			`/category/:id${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	foodDetails: {
		path: "/food/:id",
		getHref: (redirectTo) =>
			`/food/:id${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	categoryFoodDetails: {
		path: "/details/:id",
		getHref: (redirectTo) =>
			`/details/:id${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	mainPage: {
		path: "/mainpage",
		getHref: (redirectTo) =>
			`/mainpage${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	authPage: {
		path: "/authpage",
		getHref: (redirectTo) =>
			`/authpage${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	about: {
		path: "/about",
		getHref: (redirectTo) =>
			`/about${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	payment: {
		path: "/payment",
		getHref: (redirectTo) =>
			`/payment${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	orderverify: {
		path: "/user/order-success",
		getHref: (redirectTo) =>
			`/user/order-success${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	checkoutsuccess: {
		path: "/checkout",
		getHref: (redirectTo) =>
			`/checkout${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	token: {
		path: "/api/password/reset/:token",
		getHref: (redirectTo) =>
			`/api/password/reset/:token${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
};
