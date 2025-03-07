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
		path: "/user/profile",
		getHref: (redirectTo) =>
			`/user/profile${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
	cookDetails: {
		path: "/user/cookDetails",
		getHref: (redirectTo) =>
			`/user/cookDetails${
				redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
			}`,
	},
};
  