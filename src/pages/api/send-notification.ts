import { NextApiRequest, NextApiResponse } from "next";
import { messaging } from "@/firebase/server";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { token, title, body } = req.body;

    if (!token || !title || !body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    try {
      // console.log("Sending notification via Firebase..."); // 追加
      const response = await messaging.send(message);
      // console.log("Notification sent via Firebase, response:", response); // 追加
      res.status(200).json({ messageId: response });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
