export const cookPaths = {
  root: {
    path: "/cook",
    getHref: () => "/cook",
  },
  register: {
    path: "/cook/register",
    getHref: (redirectTo) =>
      `/cook/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  registerPage: {
    path: "/cook/preregister",
    getHref: (redirectTo) =>
      `/cook/preregister${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  pendingPage: {
    path: "/cook/underReview",
    getHref: (redirectTo) =>
      `/cook/underReview${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  emailVerification: {
    path: "/cook/verification",
    getHref: (redirectTo) =>
      `/cook/verification${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  forgetPassword: {
    path: "/cook/forgetPassword",
    getHref: (redirectTo) =>
      `/cook/forgetPassword${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  resetPassword: {
    path: "/cook/resetPassword",
    getHref: (redirectTo) =>
      `/cook/resetPassword${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },

  login: {
    path: "/cook/login",
    getHref: (redirectTo) =>
      `/cook/login${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  homepage: {
    path: "/cook/homepage",
    getHref: (redirectTo) =>
      `/cook/homepage${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  orderpage: {
    path: "/cook/orderpage",
    getHref: (redirectTo) =>
      `/cook/orderpage${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  menupage: {
    path: "/cook/menu",
    getHref: (redirectTo) =>
      `/cook/menu${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  historyPage: {
    path: "/cook/history",
    getHref: (redirectTo) =>
      `/cook/history${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  cookProfile: {
    path: "/cook/profile",
    getHref: (redirectTo) =>
      `/cook/profile${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },

  earningsPage: {
    path: "/cook/earnings",
    getHref: (redirectTo) =>
      `/cook/earnings${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  profile: {
    path: "/cook/profile",
    getHref: (redirectTo) =>
      `/cook/profile${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  notification: {
    path: "/cook/notification",
    getHref: (redirectTo) =>
      `/cook/notification${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  order: {
    path: "/cook/order",
    getHref: (redirectTo) =>
      `/cook/order${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  earning: {
    path: "/cook/earning",
    getHref: (redirectTo) =>
      `/cook/earning${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  withdraw: {
    path: "/cook/withdraw",
    getHref: (redirectTo) =>
      `/cook/withdraw${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
