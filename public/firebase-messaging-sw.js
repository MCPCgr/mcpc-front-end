importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBHc2nUd9DpUEZKHEWQrBTaRgtmiEpDGUg",
  authDomain: "amjilterp.firebaseapp.com",
  projectId: "amjilterp",
  storageBucket: "amjilterp.appspot.com",
  messagingSenderId: "593996263599",
  appId: "1:593996263599:web:2ad1a00ea692f66e91245a"
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  // const messaging =
  firebase.messaging();

  // messaging.onBackgroundMessage((payload) => {
  //   const notificationTitle = payload.data.title;
  //   const notificationOptions = {
  //     body: payload.data.body,
  //     icon: './browser_logo.png'
  //   };
  //
  //   self.registration.showNotification(notificationTitle,
  //     notificationOptions);
  // });
}
