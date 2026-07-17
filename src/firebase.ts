import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAjjww4cJ0jh8BKIdBS_5wxWLPFuDO8LA4",
  authDomain: "noti-ff3b2.firebaseapp.com",
  projectId: "noti-ff3b2",
  storageBucket: "noti-ff3b2.firebasestorage.app",
  messagingSenderId: "646542925374",
  appId: "1:646542925374:web:5d861cf6aa4206fc1afb6f",
  measurementId: "G-V6BM2XTQJC"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);