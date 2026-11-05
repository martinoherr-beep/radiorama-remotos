import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArSyGfpTSiJNpJwmi1HjQafBmhnA-Fvf4",
  authDomain: "radiorama-remotos.firebaseapp.com",
  projectId: "radiorama-remotos",
  storageBucket: "radiorama-remotos.firebasestorage.app",
  messagingSenderId: "218990792168",
  appId: "1:218990792168:web:b138a0b0aadf0d78c7e85d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);