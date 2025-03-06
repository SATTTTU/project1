export const adminPaths = {
    root: {
      path: "/admin",
      getHref: () => "/admin",
    },
   
    login: {
      path: "/admin/login",
      getHref: (redirectTo) =>
        `/admin/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    resetPassword: {
      path: "/admin/dashboard/resetPassword",
      getHref: (redirectTo) =>
        `/admin/resetPassword${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    dashboard: {
      path: "/admin/dashboard",
      getHref: (redirectTo) =>
        `/admin/dashboard${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    profile: {
      path: "/admin/dashboard/profile",
      getHref: (redirectTo) =>
        `/admin/dashboard/profile${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    setting: {
      path: "/admin/dashboard/setting",
      getHref: (redirectTo) =>
        `/admin/dashboard/setting${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
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
  