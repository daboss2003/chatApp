import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2atMdt1pklaKHBVdpccfoSZVslCETL6k",
  authDomain: "chatapp-db474.firebaseapp.com",
  projectId: "chatapp-db474",
  storageBucket: "chatapp-db474.appspot.com",
  messagingSenderId: "197904212023",
  appId: "1:197904212023:web:deac0c4fc10f376b321fb2",
  measurementId: "G-XDYBGBKK7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth()
export { app, auth };
export const storage = getStorage(app);
export default getFirestore(app);