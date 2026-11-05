import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArSyGfpTSiJNpJwmi1HjQafBmhnA-Fvf4",
  authDomain: "radiorama-remotos.firebaseapp.com",
  projectId: "radiorama-remotos",
  storageBucket: "radiorama-remotos.firebasestorage.app",
  messagingSenderId: "218990792168",
  appId: "1:218990792168:web:b138a0b0aadf0d78c7e85d"
};

const app = initializeApp(firebaseConfig);

// Habilita el almacenamiento en caché local y sincronización en segundo plano
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});