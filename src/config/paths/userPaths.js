export const userPaths = {
	root: {
		path: "/",
		getHref: () => "/",
	},

	register: {
		path: "/user/register",
		getHref: (redirectTo) =>
			`/user/register${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	login: {
		path: "/user/login",
		getHref: (redirectTo) =>
			`/user/login${
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
	homePage: {
		path: "/user/home",
		getHref: (redirectTo) =>
			`/user/home${
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
		path: "/user/home/profile",
		getHref: (redirectTo) =>
			`/user/home/profile${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	orderHistory: {
		path: "/user/home/order",
		getHref: (redirectTo) =>
			`/user/home/order${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	favourite: {
		path: "/user/favourite",
		getHref: (redirectTo) =>
			`/user/favourite${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	address: {
		path: "/user/addresses",
		getHref: (redirectTo) =>
			`/user/addresses${
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
	categoryFoodDetails:{
		path: "/details/:id",
		getHref: (redirectTo) =>
			`/details/:id${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	mainPage:{
		path: "/mainpage",
		getHref: (redirectTo) =>
			`/mainpage${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	authPage:{
		path: "/authpage",
		getHref: (redirectTo) =>
			`/authpage${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	about:{
		path: "/about",
		getHref: (redirectTo) =>
			`/about${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},

};
  