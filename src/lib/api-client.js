import Axios from "axios";

function getToken(user) {
  return user ? localStorage.getItem(`token_${user}`) : null;
}

function saveToken(user, token) {
  if (user && token) {
    localStorage.setItem(`token_${user}`, token);
  }
}

function authRequestInterceptor(config) {
  const user = localStorage.getItem("active_user");
  const token = getToken(user);

  config.headers = config.headers || {};
  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No token found! User may not be authenticated.");
  }

  console.log("🔄 Sending request with headers:", config.headers);
  return config;
}


// Ensure API URL is set correctly
const API_URL = import.meta.env.VITE_APP_API_URL;
if (!API_URL) {
  console.error("❌ API URL is not defined in the .env file");
}

export const api = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Debugging API URL
console.log("🌍 API Base URL:", API_URL);

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => {
    const user = localStorage.getItem("active_user");
    const token = response.data?.token; // Assuming token is returned in response

    if (token) {
      console.log("✅ Token received, saving...");
      saveToken(user, token);
    }

    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("❌ API Error:", message);

    // If unauthorized, handle logout (optional)
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized! Token may be expired. Consider logging out.");
      // localStorage.removeItem(`token_${localStorage.getItem("active_user")}`); // Uncomment if you want to auto-remove token on 401
    }

    return Promise.reject(error);
  }
);
