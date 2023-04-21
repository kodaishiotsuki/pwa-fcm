import { doc, setDoc } from "firebase/firestore";
import { getToken, MessagePayload, onMessage } from "firebase/messaging";
import { db, messaging } from "./client";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY as string;

//通知権限の要求
export const requestNotificationsPermissions = async (uid: string) => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const fcmToken = await saveMessagingDeviceToken(uid, false);
    if (messaging && fcmToken) {
      console.log("Got FCM device token", fcmToken);
      // Listen for background messages（staging環境で動いていない）
      onMessage(messaging, (message: MessagePayload) => {
        console.log("Message received. ", message);
        console.log("Message notification. ", message.notification);
        if (message.notification) {
          console.log(
            "New foreground notification from Firebase Messaging!!",
            message.notification
          );
          new Notification(message.notification.title || "Default Title", {
            body: message.notification.body || "Default Body",
          });
        }
      });
    }
  } else {
    console.error("Unable to get permission to notify.");
  }
};

//トークンをUsersコレクションに保存
export const saveMessagingDeviceToken = async (
  uid: string,
  requestPermission: boolean = true
) => {
  if (messaging) {
    const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (fcmToken) {
      // Save device token to Firestore
      const userRef = doc(db, "Users", uid);
      await setDoc(userRef, { fcmToken: fcmToken }, { merge: true });
    } else if (requestPermission) {
      // Need to request permissions to show notifications
      await requestNotificationsPermissions(uid);
    }
    return fcmToken;
  }
};
