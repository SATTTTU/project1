export const authPaths = {
  root: {
    path: "/auth",
  },
  register: {
    path: "/auth/register",
    getHref: (redirectTo) => {
      return `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`;
    },
  },
  login: {
    path: "/auth/login",
    getHref: (redirectTo) => {
      return `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`;
    },
  },
  confirmation: {
    path: "/auth/confirmation",
    getHref: (redirectTo) => {
      return `/auth/confirmation${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`;
    },
  },
};
