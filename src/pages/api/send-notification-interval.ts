// pages/api/send-notification-interval.ts
import { messaging } from "@/firebase/server";
import { NextApiRequest, NextApiResponse } from "next";

const subscribers: string[] = [];

// Send a push notification to a specific device
async function sendPushNotification(token: string) {
  try {
    await messaging.send({
      token,
      notification: {
        title: "New Notification",
        body: "This is a message from your PWA app.",
      },
    });
  } catch (error) {
    console.error("Failed to send push notification:", error);
  }
}

// Subscribe a device to push notifications
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;
    if (token) {
      subscribers.push(token);
      res.status(201).json({ message: "Subscribed" });
    } else {
      res.status(400).json({ message: "Missing token" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

setInterval(() => {
  subscribers.forEach((token) => {
    sendPushNotification(token);
  });
}, 10000);
