import { initializeApp } from "firebase/app";
import { getMessaging,getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDR_FuEnmCC_YQ4tKkcqKw1ZoUZu_oX6YM",
  authDomain: "push-notification-5c643.firebaseapp.com",
  projectId: "push-notification-5c643",
  storageBucket: "push-notification-5c643.firebasestorage.app",
  messagingSenderId: "681608989318",
  appId: "1:681608989318:web:576fd6efe54322d0931f07",
  measurementId: "G-Q8CJ1DVC4M"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
console.log("message", messaging)

export const generateToken = async ()=> {
  const permission = await Notification.requestPermission();
  console.log("Permissin,",permission);
  if(permission === "granted"){

    const token = await getToken(messaging,{
      validKey:"BABBye9aKjBBtXTO8y5ORXYSKqFDGoWgQAptwykrzJXiwojKa6eVax9p4jtVAgk41e7uYnlwq1GtpXAGrRGIZPU"
    })
    console.log("token***", token)
  }
  }