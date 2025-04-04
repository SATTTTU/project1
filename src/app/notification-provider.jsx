import { useEffect, useState } from 'react';
import { requestForToken } from '@/config/firebase';

export const NotificationProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  // const isInitialized = useRef(false);

  // const { data: user } = useUs();

  useEffect(() => {
    // if (!user || isInitialized.current) return;
    // isInitialized.current = true;

    const getToken = async () => {
      const currentPermission = Notification.permission;

      if (currentPermission === 'granted') {
        const token = await requestForToken();
        if (token) setToken(token);
      } else if (currentPermission === 'default') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await requestForToken();
          if (token) setToken(token);
        }
      } else {
        console.warn('Notifications are blocked. Please enable them in browser settings.');
      }
    };

    getToken();
  }, [token]);

  return <>{children}</>;
};

