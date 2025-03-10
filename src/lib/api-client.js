import { ROLES } from "@/config/roles";
import Axios from "axios";

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

  return config; // Corrected: Return the config directly
}

// Use import.meta.env to access the environment variable correctly
export const api = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, // Corrected the base URL access
  withCredentials: true,
});

// Log the base URL to check if it's correctly loaded
console.log(import.meta.env.VITE_APP_API_URL) // Corrected: Removed the invalid 'meta' reference

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error(message);
    return Promise.reject(error);
  }
);
