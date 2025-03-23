import Axios from "axios";

const STORAGE_KEYS = {
  USER_TYPE: "user_type",
  ADMIN_TOKEN: "admin_token",
  COOK_TOKEN: "cook_token",
  USER_TOKEN: "user_token",
  ACTIVE_USER: "active_user",
  AUTH_TOKEN: "authToken",
};

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
    const savedValue = localStorage.getItem(key);
    if (savedValue !== value) {
      throw new Error(`Failed to save ${key} to localStorage`);
    }
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

function getToken() {
  try {
    const userType = localStorage.getItem(STORAGE_KEYS.USER_TYPE);

    if (!userType) {
      // If no user type is set, try to check if any token exists in localStorage
      const adminToken =
        localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) ||
        localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const cookToken = localStorage.getItem(STORAGE_KEYS.COOK_TOKEN);
      const userToken =
      localStorage.getItem(STORAGE_KEYS.USER_TOKEN) 
      // localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      if (adminToken && adminToken !== "undefined") {
        console.log(
          "Found admin token without user type, setting user type to admin"
        );
        safeSetItem(STORAGE_KEYS.USER_TYPE, "admin");
        safeSetItem(STORAGE_KEYS.ACTIVE_USER, "admin");
        return adminToken;
      }

      if (cookToken && cookToken !== "undefined") {
        console.log(
          "Found cook token without user type, setting user type to cook"
        );
        safeSetItem(STORAGE_KEYS.USER_TYPE, "cook");
        safeSetItem(STORAGE_KEYS.ACTIVE_USER, "cook");
        return cookToken;
      }
      if (userToken && userToken !== "undefined") {
        console.log(
          "Found user token without user type, setting user type to cook"
        );
        safeSetItem(STORAGE_KEYS.USER_TYPE, "user");
        safeSetItem(STORAGE_KEYS.ACTIVE_USER, "user");
        return userToken;
      }
      console.warn("⚠️ No user type or valid tokens found in localStorage!");
      return null;
    }

    if (userType === "admin") {
      const token =
        localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) ||
        localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      if (!token || token === "undefined") {
        console.warn("⚠️ Admin token is undefined or invalid");
        return null;
      }

      console.log("Retrieved admin token from localStorage");
      return token;
    } else if (userType === "cook") {
      const token = localStorage.getItem(STORAGE_KEYS.COOK_TOKEN);

      if (!token || token === "undefined") {
        console.warn("⚠️ Cook token is undefined or invalid");
        return null;
      }

      console.log("Retrieved cook token from localStorage");
      return token;
    }else if (userType === "user") {
      const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);

      if (!token || token === "undefined") {
        console.warn("⚠️ user token is undefined or invalid");
        return null;
      }

      console.log("Retrieved cook token from localStorage");
      return token;
    }
     else {
      console.warn(
        `⚠️ Unrecognized user type: ${userType}. No token available.`
      );
      return null;
    }
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

function saveUserData(userType, token) {
  try {
    if (!userType || !token) {
      console.warn("⚠️ Missing user type or token for saving to localStorage");
      return false;
    }

    console.log(`Saving ${userType} data to localStorage`);

    safeRemoveItem(STORAGE_KEYS.ADMIN_TOKEN);
    safeRemoveItem(STORAGE_KEYS.COOK_TOKEN);
    safeRemoveItem(STORAGE_KEYS.USER_TOKEN);
    safeRemoveItem(STORAGE_KEYS.AUTH_TOKEN);

    if (
      !safeSetItem(STORAGE_KEYS.USER_TYPE, userType) ||
      !safeSetItem(STORAGE_KEYS.ACTIVE_USER, userType)
    ) {
      throw new Error("Failed to save user type");
    }

    if (userType === "admin") {
      if (
        !safeSetItem(STORAGE_KEYS.ADMIN_TOKEN, token) ||
        !safeSetItem(STORAGE_KEYS.AUTH_TOKEN, token)
      ) {
        throw new Error("Failed to save admin token");
      }
    } else if (userType === "cook") {
      if (!safeSetItem(STORAGE_KEYS.COOK_TOKEN, token)) {
        throw new Error("Failed to save cook token");
      }
    }
    else if (userType === "user") {
      if (!safeSetItem(STORAGE_KEYS.USER_TOKEN, token)) {
        throw new Error("Failed to save cook token");
      }
    }
    console.log(`✅ ${userType} data saved successfully to localStorage`);
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    // Clear any partial data on error
    clearAuthData();
    throw error;
  }
}

function authRequestInterceptor(config) {
  try {
    const token = getToken();

    config.headers = config.headers || {};
    config.headers.Accept = "application/json";

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    console.error("Error in request interceptor:", error);
    return config;
  }
}

const API_URL = import.meta.env.VITE_APP_API_URL;
if (!API_URL) {
	console.error("❌ API URL is not defined in the .env file");
}

// Create Axios instance
export const api = Axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

console.log("🌍 API Base URL:", API_URL);

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("❌ API Error:", message);

    

    return Promise.reject(error);
  }
);

function clearAuthData() {
  try {
    safeRemoveItem(STORAGE_KEYS.USER_TYPE);
    safeRemoveItem(STORAGE_KEYS.ADMIN_TOKEN);
    safeRemoveItem(STORAGE_KEYS.COOK_TOKEN);
    safeRemoveItem(STORAGE_KEYS.USER_TOKEN);
    safeRemoveItem(STORAGE_KEYS.ACTIVE_USER);
    safeRemoveItem(STORAGE_KEYS.AUTH_TOKEN);

    console.log("🔒 All auth data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing auth data:", error);
    throw error;
  }
}

export { saveUserData, getToken, clearAuthData };
