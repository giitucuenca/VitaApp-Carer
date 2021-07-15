// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDMvLf_mdSAhzMknG3wOYoWweiBV2SLZT8",
  authDomain: "vitaapp-ucuenca-carer.firebaseapp.com",
  projectId: "vitaapp-ucuenca-carer",
  storageBucket: "vitaapp-ucuenca-carer.appspot.com",
  messagingSenderId: "1055497438920",
  appId: "1:1055497438920:web:6f5c4d942f04095988c7fd",
  measurementId: "G-5NDWXT8XK6",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
