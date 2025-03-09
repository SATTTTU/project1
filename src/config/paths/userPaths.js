export const userPaths = {
	root: {
		path: "/user",
		getHref: () => "/user",
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
		path: "/user/home/cook/:id",
		getHref: (redirectTo) =>
			`/user/home/cook/:id${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	// user: {
	// 	profileEdit: {
	// 	  path: "/user/home/profile",
	// 	  getHref: (redirectTo) => `/user/home/profile${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
	// 	},
	// 	orderHistory: {
	// 	  path: "/user/home/order",
	// 	  getHref: () => "/user/home/order",
	// 	},
	// 	favorites: {
	// 	  path: "/user/home/favorites",
	// 	  getHref: () => "/user/home/favorites",
	// 	},
	// 	savedAddresses: {
	// 	  path: "/user/home/saved-addresses",
	// 	  getHref: () => "/user/home/saved-addresses",
	// 	},
	//   }
};
  