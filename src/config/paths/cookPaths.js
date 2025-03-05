export const cookPaths = {
  root: {
    path: "/cook",
    getHref: () => "/cook",
  },
  register: {
    path: "/cook/register",
    getHref: (redirectTo) =>
      `/cook/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  login: {
    path: "/cook/login",
    getHref: (redirectTo) =>
      `/cook/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  profile: {
    path: "/cook/profile",
    getHref: (redirectTo) =>
      `/cook/profile${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  notification: {
    path: "/cook/notification",
    getHref: (redirectTo) =>
      `/cook/notification${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  order: {
    path: "/cook/order",
    getHref: (redirectTo) =>
      `/cook/order${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  earning: {
    path: "/cook/earning",
    getHref: (redirectTo) =>
      `/cook/earning${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
  withdraw: {
    path: "/cook/withdraw",
    getHref: (redirectTo) =>
      `/cook/withdraw${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
  },
};
