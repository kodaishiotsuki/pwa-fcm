//FCM
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC38YI6xgX90wpZPyJLefE3kEYnZRlGLBc",
  authDomain: "fcm-app-5235c.firebaseapp.com",
  projectId: "fcm-app-5235c",
  storageBucket: "fcm-app-5235c.appspot.com",
  messagingSenderId: "382618525647",
  appId: "1:382618525647:web:621e77c4dcbea809be7cba",
  measurementId: "G-THZYZS6RP4",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: payload.notification.icon,
  // };

  // return self.registration.showNotification(
  //   notificationTitle,
  //   notificationOptions
  // );
});
