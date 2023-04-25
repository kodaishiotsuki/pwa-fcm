import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging, Messaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC38YI6xgX90wpZPyJLefE3kEYnZRlGLBc",
  authDomain: "fcm-app-5235c.firebaseapp.com",
  projectId: "fcm-app-5235c",
  storageBucket: "fcm-app-5235c.appspot.com",
  messagingSenderId: "382618525647",
  appId: "1:382618525647:web:621e77c4dcbea809be7cba",
  measurementId: "G-THZYZS6RP4",
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();
export const db = getFirestore();

export let messaging: Messaging | undefined;

if (typeof window !== "undefined") {
  messaging = getMessaging();
}
