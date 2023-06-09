export const notifyMe = () => {
  if (!("Notification" in window)) {
    // ブラウザーが通知に対応しているか調べる
    alert("このブラウザーはデスクトップ通知に対応していません。");
  } else if (Notification.permission === "granted") {
    // 通知権限が既に付与されているかどうかを調べる。
    // そうであれば、通知を作成
    const notification = new Notification("こんにちは！");
    return notification;
    // …
  } else if (Notification.permission !== "denied") {
    // ユーザーにその権限を要求する必要がある
    Notification.requestPermission().then((permission) => {
      // ユーザーが許可したら、通知を作成
      if (permission === "granted") {
        const notification = new Notification("こんにちは！");
        return notification;
        // …
      }
    });
  }
};
