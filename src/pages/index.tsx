import { useAuth } from "@/context/auth";
import {
  requestNotificationsPermissions,
  saveMessagingDeviceToken,
} from "@/firebase/messaging";
import { notifyMe } from "@/utils/notify";
import { sendNotification } from "@/utils/sendNotification";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { fbUser, isLoading } = useAuth();

  //クリック時に通知を表示
  const handleClick = async () => {
    if (fbUser) {
      // Request notification permissions and save the token
      await requestNotificationsPermissions(fbUser.uid);

      const fcmToken = await saveMessagingDeviceToken(fbUser.uid, false);

      if (fcmToken) {
        // Call sendNotification function
        try {
          const title = "Notification Title";
          const body = "Notification Body";
          await sendNotification(fcmToken, title, body);
          console.log("sendNotification", "success");
        } catch (error) {
          console.error("Failed to send notification:", error);
        }
      }
    }
  };

  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 text-2xl font-bold">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={notifyMe}
      >
        Click me to get a notification
      </button>
      <button
        className="rounded-full border-4 border-black px-4 py-2"
        onClick={handleClick}
      >
        Send Notification with FCM
      </button>
    </div>
  );
};

export default Home;
