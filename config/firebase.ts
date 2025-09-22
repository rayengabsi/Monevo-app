// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN3iWJzVeCY5QfQGHjroA4plPhNf_Vh0M",
  authDomain: "monevo-3d305.firebaseapp.com",
  projectId: "monevo-3d305",
  storageBucket: "monevo-3d305.firebasestorage.app",
  messagingSenderId: "828778101372",
  appId: "1:828778101372:web:1f71c2ed89d9a16e0267f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);