importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBxAPs0iUgEn5gmYHOpRoyQBiHfJu1Yv9E",
  authDomain: "mcpcerp.firebaseapp.com",
  projectId: "mcpcerp",
  storageBucket: "mcpcerp.appspot.com",
  messagingSenderId: "283844488979",
  appId: "1:283844488979:web:77d59a1bd703abe952b4e6"
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
