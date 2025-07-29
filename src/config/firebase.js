"use client";

// config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDEBfggf2giUE8RQ8cTUJZnk4PR0P2_TWg",
   authDomain: "love-at-firstbite.firebaseapp.com",
   projectId: "love-at-firstbite",
   storageBucket: "love-at-firstbite.firebasestorage.app",
   messagingSenderId: "281034051417",
   appId: "1:281034051417:web:0fba3719f9b3cc771fc648",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
