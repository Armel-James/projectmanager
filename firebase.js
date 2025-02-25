import { initializeApp } from "firebase/app";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDQfHxR48pL0kOrIBvXYIRwABCNd8SiYNw",
    authDomain: "project-manager-60ba7.firebaseapp.com",
    projectId: "project-manager-60ba7",
    storageBucket: "project-manager-60ba7.firebasestorage.app",
    messagingSenderId: "501664415484",
    appId: "1:501664415484:web:f1f26a59e9d73048d42179",
    measurementId: "G-1D0X2SQYT3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };