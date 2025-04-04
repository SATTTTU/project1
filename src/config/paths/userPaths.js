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
    path: "/forgotpassword",
    getHref: (redirectTo) =>
      `/forgotpassword${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  resetPassword: {
    path: "/resetpassword",
    getHref: (redirectTo) =>
      `/resetpassword${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  changePassword: {
    path: "/changepassword",
    getHref: (redirectTo) =>
      `/changepassword${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  emailVerification: {
    path: "/verification",
    getHref: (redirectTo) =>
      `/verification${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  dashboard: {
    path: "/dashboard",
    getHref: (redirectTo) =>
      `/dashboard${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },

  cart: {
    path: "/cart",
    getHref: (redirectTo) =>
      `/cart${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  checkout: {
    path: "/checkout",
    getHref: (redirectTo) =>
      `/checkout${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  profileEdit: {
    path: "/profileEdit",
    getHref: (redirectTo) =>
      `/profileEdit${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  profile: {
    path: "/profile",
    getHref: (redirectTo) =>
      `/profile${
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
    path: "/orders",
    getHref: (redirectTo) =>
      `/orders${
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
    path: "/setting",
    getHref: (redirectTo) =>
      `/setting${
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
    path: "/order-success",
    getHref: (redirectTo) =>
      `/order-success${
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
  currentorders: {
    path: "/currentorders",
    getHref: (redirectTo) =>
      `/currentorders${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
    trackorders: {
      path: "/trackorders/:id",
      getHref: (redirectTo) =>
        `/trackorders/:id${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },
  token: {
    path: "/api/password/reset/:token",
    getHref: (redirectTo) =>
      `/api/password/reset/:token${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
