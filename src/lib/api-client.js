import Axios from "axios";
import { ROLES } from "../config/paths/roles";

function getToken(user) {
  // Define your getToken function here
  return localStorage.getItem(`token_${user}`); // Example
}

function authRequestInterceptor(config) {
  const user = localStorage.getItem("active_user") || ROLES.COOK;
  const token = getToken(user);

  if (config.headers) {
    config.headers.Accept = config.headers.Accept || "application/json";
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

export const api = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message);
    return Promise.reject(error);
  }
);
