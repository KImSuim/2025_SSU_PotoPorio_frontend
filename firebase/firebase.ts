import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCXsR6VULk8ofapH-eUG1sAZnjZ8c3j4Y0",
  authDomain: "ssupotoporio.firebaseapp.com",
  projectId: "ssupotoporio",
  storageBucket: "ssupotoporio.firebasestorage.app",
  messagingSenderId: "831918824444",
  appId: "1:831918824444:web:90137a755d91146ccef079",
  measurementId: "G-9GJL3PFCRB",
};

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, fireStore };
