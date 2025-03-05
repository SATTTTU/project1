export const adminPaths = {
    root: {
      path: "/admin",
      getHref: () => "/admin",
    },
    register: {
      path: "/admin/register",
      getHref: (redirectTo) =>
        `/admin/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    login: {
      path: "/admin/login",
      getHref: (redirectTo) =>
        `/admin/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    forgotPassword: {
      path: "/admin/forgotPassword",
      getHref: (redirectTo) =>
        `/admin/forgotPassword${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    resetPassword: {
      path: "/admin/resetPassword",
      getHref: (redirectTo) =>
        `/admin/resetPassword${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    dashboard: {
      path: "/admin/dashboard",
      getHref: (redirectTo) =>
        `/admin/dashboard${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    cookDetails: {
      path: "/admin/cookDetails",
      getHref: (redirectTo) =>
        `/admin/cookDetails${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    userDetails: {
      path: "/admin/userDetails",
      getHref: (redirectTo) =>
        `/admin/userDetails${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    logout: {
      path: "/admin/logout",
      getHref: (redirectTo) =>
        `/admin/logout${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  };
  