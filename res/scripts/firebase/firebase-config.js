import { getAuth, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";


const firebaseConfig = {
  // Change firebase project to armel's api
  apiKey: "AIzaSyByFlOT1bIm6ecJK2kn27JrO0Hmkohi6nE",
  authDomain: "project-manager-1c297.firebaseapp.com",
  projectId: "project-manager-1c297",
  storageBucket: "project-manager-1c297.firebasestorage.app",
  messagingSenderId: "1029615377758",
  appId: "1:1029615377758:web:31f0194bd89274b68403cf"
  // measurementId: "G-1D0X2SQYT3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
    .then(() => {
      console.log("Session persistence enabled");
    })
    .catch((error) => {
      console.error("Persistence error:", error);
    });

export { auth };