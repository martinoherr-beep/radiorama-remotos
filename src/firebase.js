import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

// TEST DE CONEXIÓN DIRECTA EN CONSOLA (PC)
addDoc(collection(db, "remotos"), {
  cliente: "Prueba desde PC",
  fecha: "2026-11-04",
  createdAt: new Date().toISOString()
})
.then((doc) => {
  console.log("%c RED FIREBASE OK: Documento de prueba guardado con ID: " + doc.id, "background: #22c55e; color: #fff; font-size: 14px; font-weight: bold;");
})
.catch((err) => {
  console.error("%c ERROR DE CONEXIÓN FIREBASE:", "background: #ef4444; color: #fff; font-size: 14px; font-weight: bold;", err);
});