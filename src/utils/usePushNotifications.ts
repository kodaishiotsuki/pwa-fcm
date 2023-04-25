// hooks/usePushNotifications.ts
import { messaging } from "@/firebase/client";
import { getToken } from "firebase/messaging";
import { useEffect } from "react";

// VAPIDキー
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY as string;

// 通知権限の要求
export const usePushNotifications = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging!, { vapidKey: VAPID_KEY });
          console.log("Firebase messaging token:", token);
          const response = await fetch("/api/send-notification-interval", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
          if (response.status !== 201) {
            console.error("Failed to subscribe for notifications");
          }
        }
      } catch (error) {
        console.error("Error getting permission for notifications:", error);
      }
    };

    requestPermission();
  }, []);
};
