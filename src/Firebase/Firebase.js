import firebase from 'firebase/app';
import 'firebase/auth';

// FIREBASE CONFIG

export const Auth = firebase.initializeApp({
  apiKey: "AIzaSyDZ_xnh9KwYWfl8VWv7C162CBPzmUtIJ3U",
  authDomain: "whisperer-chatapp.firebaseapp.com",
  projectId: "whisperer-chatapp",
  storageBucket: "whisperer-chatapp.appspot.com",
  messagingSenderId: "422842088875",
  appId: "1:422842088875:web:4eb495c14e75e324d666ee"
}).auth();