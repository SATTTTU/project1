import Axios from "axios";

// Constants for localStorage keys
const STORAGE_KEYS = {
  USER_TYPE: "user_type",
  ADMIN_TOKEN: "admin_token", 
  COOK_TOKEN: "cook_token",
  ACTIVE_USER: "active_user",
  // Legacy keys
  AUTH_TOKEN: "authToken"
};

// Get the token based on user type from localStorage
function getToken() {
  const userType = localStorage.getItem(STORAGE_KEYS.USER_TYPE);
  
  if (!userType) {
    // If no user type is set, try to check if any token exists in localStorage
    const adminToken = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) || 
                       localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const cookToken = localStorage.getItem(STORAGE_KEYS.COOK_TOKEN);
    
    if (adminToken && adminToken !== "undefined") {
      console.log("Found admin token without user type, setting user type to admin");
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, "admin");
      return adminToken;
    }
    
    if (cookToken && cookToken !== "undefined") {
      console.log("Found cook token without user type, setting user type to cook");
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, "cook");
      return cookToken;
    }
    
    console.warn("⚠️ No user type or valid tokens found in localStorage!");
    return null;
  }
  
  // Get token based on user type from localStorage
  if (userType === "admin") {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) || 
                 localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (!token || token === "undefined") {
      console.warn("⚠️ Admin token is undefined or invalid");
      return null;
    }
    
    console.log("Retrieved admin token from localStorage:", token.substring(0, 10) + "...");
    return token;
  } else if (userType === "cook") {
    const token = localStorage.getItem(STORAGE_KEYS.COOK_TOKEN);
    
    if (!token || token === "undefined") {
      console.warn("⚠️ Cook token is undefined or invalid");
      return null;
    }
    
    console.log("Retrieved cook token from localStorage:", token.substring(0, 10) + "...");
    return token;
  } else {
    console.warn(`⚠️ Unrecognized user type: ${userType}. No token available.`);
    return null;
  }
}

// Save token and set user type to localStorage
function saveUserData(userType, token) {
  if (!userType || !token) {
    console.warn("⚠️ Missing user type or token for saving to localStorage");
    return;
  }
  
  console.log(`Saving ${userType} data to localStorage with token:`, token.substring(0, 10) + "...");
  
  // Clear any existing tokens to prevent conflicts
  localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.COOK_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  
  // Set the user type in localStorage
  localStorage.setItem(STORAGE_KEYS.USER_TYPE, userType);
  
  // Store token based on user type in localStorage
  if (userType === "admin") {
    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token); // Legacy support
  } else if (userType === "cook") {
    localStorage.setItem(STORAGE_KEYS.COOK_TOKEN, token);
    // Do NOT set authToken for cook users
  }
  
  // Set active user in localStorage
  localStorage.setItem(STORAGE_KEYS.ACTIVE_USER, userType);
  
  console.log(`✅ ${userType} data saved successfully to localStorage`);
}

function authRequestInterceptor(config) {
  const token = getToken();
  
  if (!token) {
    console.warn("⚠️ No valid token found in localStorage! Request might fail.");
  } else {
    console.log("🔑 Using token from localStorage for request:", token.substring(0, 10) + "...");
  }
  
  config.headers = config.headers || {};
  config.headers.Accept = "application/json";
  
  // Only set Content-Type to application/json if it's not FormData
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  
  // If token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
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
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("❌ API Error:", message);
    
    // If unauthorized, handle logout (optional)
    if (error.response?.status === 401) {
      console.warn(
        "⚠️ Unauthorized! Token may be expired. Consider logging out."
      );
    }
    
    return Promise.reject(error);
  }
);

// Function to clear all auth data (for logout)
function clearAuthData() {
  localStorage.removeItem(STORAGE_KEYS.USER_TYPE);
  localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.COOK_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  console.log("🔒 All auth data cleared from localStorage");
}

// Export helper functions for use in other modules
export { saveUserData, getToken, clearAuthData };