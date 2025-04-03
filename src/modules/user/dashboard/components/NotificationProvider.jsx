import React, { useState, useEffect, useRef } from "react";
// import { useUser } from "@/lib/auth";
import { requestForToken } from "@/config/firebase";
// import { useProfile } from "../../userprofile/api/getProfile";

const NotificationProvider = ({ children }) => {
  const [, setToken] = useState(null);
  const isInitialized = useRef(false);

  // const { data: user } = useProfile();
  // console.log("Profile****", user)

  useEffect(() => {
    if ( isInitialized.current) return;
    isInitialized.current = true;

    const getToken = async () => {
      const currentPermission = Notification.permission;
      console.log("Permission", currentPermission)

      if (currentPermission === "granted") {
        const token = await requestForToken();
        if (token) {
          setToken(token);
        }
      } else if (currentPermission === "default") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await requestForToken();
          if (token) {
            setToken(token);
          }
        } else {
          console.warn("Notification permission denied.");
        }
      } else {
        console.warn("Notifications are blocked. Please enable them in browser settings.");
      }
    };

    getToken();
  }, [user]);

  return <>{children}</>;
};

export default NotificationProvider;
