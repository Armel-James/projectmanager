import { signOutUser, monitorAuthState } from "../scripts/firebase/auth.js";

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



