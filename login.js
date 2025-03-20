import { auth } from "./database.js";
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user);
    window.location.href = "workplace.html"
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.error('Error during sign-out:', error);
  }
};

export const monitorAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

const signOutButton = document.getElementById("sign-out-btn")

signOutButton.addEventListener("click", signOutUser)
monitorAuthState((user) => {
  if (user) {
    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("profile-pic").src = user.photoURL
    document.getElementById("profile-pic-big").src = user.photoURL
  } else {
    window.location.href = "index.html";
  }
})

// Navbar Scrolling effect
$(window).scroll(function(){
  $("nav").toggleClass('scrolled', $(this).scrollTop() > 50);
  });
