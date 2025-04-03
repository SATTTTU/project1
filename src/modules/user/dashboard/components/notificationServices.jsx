import { useSetNotification } from "../api/store-token";
import { messaging, getToken } from "./firebaseConfig";
// import { useSetNotification } from "./apiFunctions";

export const requestNotificationPermission = async (userId) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY",
      });

      if (token) {
        console.log("FCM Token:", token);
        await storeTokenInAPI(userId, token);
      }
    } else {
      console.log("User denied notification permission");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

const storeTokenInAPI = async (userId, token) => {
  const { mutateAsync } = useSetNotification(); // Using useSetNotification

  try {
    await mutateAsync({ userId, token }); // Call API using react-query mutation
    console.log("Token stored successfully.");
  } catch (error) {
    console.error("Error storing token:", error);
  }
};
