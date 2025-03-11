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
    resetPassword: {
      path: "/admin/resetPassword",
      getHref: (redirectTo) =>
        `/admin/resetPassword${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    adminProfile: {
      path: "/admin/cookDetails/adminprofile",
      getHref: (redirectTo) =>
        `/admin/resetPassword${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    paymentpage: {
      path: "/admin/paymentpage",
      getHref: (redirectTo) =>
        `/admin/paymentpage${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    userpaymentpage: {
      path: "/admin/user-payments",
      getHref: (redirectTo) =>
        `/admin/user-payments${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    cookpaymentpage: {
      path: "/admin/cook-payments",
      getHref: (redirectTo) =>
        `/admin/cook-payments${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    reports: {
      path: "/admin/reports",
      getHref: (redirectTo) =>
        `/admin/reports${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
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
     cookProfile : {
      path: "/admin/cookDetails/:id", // Changed to match the route path
      getHref: (id, redirectTo) =>
        `/admin/cookDetails/${id}${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    paymentsettingroute: {
      path: "/admin/payment-setting",
      getHref: (redirectTo) =>
        `/admin/payment-setting${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
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
  