import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBWmSIwBVJpnPaPzgg1oxf24P89yv6Dhfk",
  authDomain: "bioware-9e508.firebaseapp.com",
  databaseURL: "https://bioware-9e508-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bioware-9e508",
  storageBucket: "bioware-9e508.appspot.com",
  messagingSenderId: "293320083726",
  appId: "1:293320083726:web:0aa80725eee2e194ca2f5f",
  measurementId: "G-19E53T303G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
const analytics = getAnalytics(app);