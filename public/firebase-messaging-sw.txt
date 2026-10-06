importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAjjww4cJ0jh8BKIdBS_5wxWLPFuDO8LA4",
  authDomain: "noti-ff3b2.firebaseapp.com",
  projectId: "noti-ff3b2",
  storageBucket: "noti-ff3b2.firebasestorage.app",
  messagingSenderId: "646542925374",
  appId: "1:646542925374:web:5d861cf6aa4206fc1afb6f",
  measurementId: "G-V6BM2XTQJC"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("BG MESSAGE", payload);

  self.registration.showNotification(
    payload.notification?.title || "New Message",
    {
      body: payload.notification?.body || "",
    }
  );
});