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
      path: "home", // <-- Use relative path
      getHref: (redirectTo) =>
        `/rider/home${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  };
  