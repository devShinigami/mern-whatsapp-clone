// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARa0wH2rcoCHK7qX_IkyOHll-THZGswmc",
  authDomain: "mern-chat-app-cf93a.firebaseapp.com",
  projectId: "mern-chat-app-cf93a",
  storageBucket: "mern-chat-app-cf93a.appspot.com",
  messagingSenderId: "373080419599",
  appId: "1:373080419599:web:51e87e64f98b5f1bf8a27a",
  measurementId: "G-Q71QFYT0D9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);
