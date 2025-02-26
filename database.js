import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyByFlOT1bIm6ecJK2kn27JrO0Hmkohi6nE",
    authDomain: "project-manager-1c297.firebaseapp.com",
    projectId: "project-manager-1c297",
    storageBucket: "project-manager-1c297.firebasestorage.app",
    messagingSenderId: "1029615377758",
    appId: "1:1029615377758:web:31f0194bd89274b68403cf"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  
  export { db, setDoc, doc };