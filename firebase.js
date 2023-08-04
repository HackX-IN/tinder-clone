// Import the functions you need from the SDKs you need
import { getApps, initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  EmailAuthProvider,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9djRv9RjKheqvryePho2_CQ9fyfJeHpY",
  authDomain: "tinder-clone-9c085.firebaseapp.com",
  projectId: "tinder-clone-9c085",
  storageBucket: "tinder-clone-9c085.appspot.com",
  messagingSenderId: "177699570704",
  appId: "1:177699570704:web:e4f8db72501e034cb8f695",
};
let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}
const provider = new EmailAuthProvider();
const db = getFirestore();
const timestamp = serverTimestamp();

export { app, auth, provider, db, timestamp };
