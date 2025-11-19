import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbGmzZogasYGWAy8n7W7TkiD_V0pvtrI8",
  authDomain: "galleryx-1811.firebaseapp.com",
  projectId: "galleryx-1811",
  storageBucket: "galleryx-1811.firebasestorage.app",
  messagingSenderId: "1003484693078",
  appId: "1:1003484693078:web:e427dc065c9eefb43b71f7",
  measurementId: "G-8Z9GLRDTJJ"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
