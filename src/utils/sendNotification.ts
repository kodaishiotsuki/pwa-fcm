export const sendNotification = async (
  token: string,
  title: string,
  body: string
) => {
  const response = await fetch("/api/send-notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      title,
      body,
    }),
  });
  console.log("Notification sent, response:", response.ok); // 追加
  if (!response.ok) {
    throw new Error("Failed to send notification.");
  }

  const result = await response.json();
  console.log("Notificastion sent, result:", result); // 追加
  return result;
};
