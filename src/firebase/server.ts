// server.ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

//環境ごとに初期化
if (!getApps()?.length) {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_KEY as string)),
  });
}

export const adminDB = getFirestore();
export const messaging = getMessaging();
