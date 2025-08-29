// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXsR6VULk8ofapH-eUG1sAZnjZ8c3j4Y0",
  authDomain: "ssupotoporio.firebaseapp.com",
  projectId: "ssupotoporio",
  storageBucket: "ssupotoporio.firebasestorage.app",
  messagingSenderId: "831918824444",
  appId: "1:831918824444:web:90137a755d91146ccef079",
  measurementId: "G-9GJL3PFCRB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
