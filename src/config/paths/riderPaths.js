export const riderPaths = {
    root: {
      path: "/rider",
      getHref: () => "/rider",
    },
    login: {
      path: "login", // <-- Use relative path
      getHref: (redirectTo) =>
        `/rider/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    home: {
      path: "/rider/main/:orderId", // <-- Use relative path
      getHref: (redirectTo) =>
        `/rider/main/:orderId${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  };
  