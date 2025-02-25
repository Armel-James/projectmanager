import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQfHxR48pL0kOrIBvXYIRwABCNd8SiYNw",
  authDomain: "project-manager-60ba7.firebaseapp.com",
  projectId: "project-manager-60ba7",
  storageBucket: "project-manager-60ba7.firebasestorage.app",
  messagingSenderId: "501664415484",
  appId: "1:501664415484:web:f1f26a59e9d73048d42179",
  measurementId: "G-1D0X2SQYT3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("UID:", user.uid);
    console.log("Name:", user.displayName);
    console.log("Email:", user.email);
    console.log("Photo URL:", user.photoURL);
    console.log("Provider ID:", user.providerId);

    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("profile-pic").src = user.photoURL
    document.getElementById("profile-pic-big").src = user.photoURL
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      console.log("Session persistence enabled");
    })
    .catch((error) => {
      console.error("Persistence error:", error);
    });

  } else {
    // No user is signed in
    console.log("No user signed in");
  }
});

const signOutButton = document.getElementById("sign-out-btn")

signOutButton.addEventListener("click", function() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    // An error happened.
  });
})


