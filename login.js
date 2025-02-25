import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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
const provider = new GoogleAuthProvider();
const auth = getAuth();
auth.language = 'en'

const googleLoginButton = document.getElementById("google-login-btn")
googleLoginButton.addEventListener('click', function() {
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    //window.location.href = `../workplace.html?uid=${encodeURIComponent(user.uid)}`;

    window.location.href = "../workplace.html"
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    //const email = error.customData.email;
    //const credential = GoogleAuthProvider.credentialFromError(error);
  });
})

async function gettingIdToken() {
  return await getIdToken
}

// Navbar Scrolling effect
$(window).scroll(function(){
  $("nav").toggleClass('scrolled', $(this).scrollTop() > 50);
  });
