import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";


export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

export const FIREBASE_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || "";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
} else {
  console.error("Service Workers are not supported in this browser.");
}

/**
 * @returns {Promise<string | null>} 
 */
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: FIREBASE_VAPID_KEY,
    });
    console.log("CurrentToken", currentToken);

    const token = localStorage.getItem("user_token"); 

    if (currentToken) {
      try {
        await fetch(`${import.meta.env.VITE_APP_API_URL}/api/store-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token: currentToken }),
        });
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
      }

      return currentToken;
    } else {
      alert("No registration token available. Request permission to generate one.");
      return null;
    }
  } catch (err) {
    alert("An error occurred while retrieving the token - " + err);
    return null;
  }
};


onMessage(messaging, (payload) => {
  const { notification } = payload;
  if (notification) {
    new Notification(notification.title || "Notification", {
      body: notification.body,
      icon: notification.icon || "/default-icon.png",
    });
  }
});
