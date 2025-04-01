import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
    apiKey: "AIzaSyCC4KqLSeysNjV5HtK0XDeHHNni3mvWSKc",
    authDomain: "web-push-notification-e8ee8.firebaseapp.com",
    projectId: "web-push-notification-e8ee8",
    storageBucket: "web-push-notification-e8ee8.firebasestorage.app",
    messagingSenderId: "868240512125",
    appId: "1:868240512125:web:99acd3c4bb00e5f2b14d14",
    measurementId: "G-BGY4RJ9929",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
