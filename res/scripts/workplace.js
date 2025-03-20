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

import { db, setDoc, doc } from '../scripts/firebase/auth.js';

    function getAccessTokenFromUrl() {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      return params.get('access_token');
    }
    
    const accessToken = getAccessTokenFromUrl();
    if (accessToken) {
      fetchUserInfo(accessToken);
    }

    async function fetchUserInfo(token) {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userInfo = await response.json();

        document.getElementById('profileImage').src = userInfo.picture;
        document.getElementById('profileImage').alt = userInfo.name;
        document.getElementById('profileCardImage').src = userInfo.picture;
        document.getElementById('profileCardImage').alt = userInfo.name;
        document.getElementById('profileCardName').textContent = `Hi, ${userInfo.name}!`;
        document.getElementById('profileCardEmail').textContent = userInfo.email;

        await setDoc(doc(db, "users", userInfo.sub), {
          uid: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture
        }, { merge: true });

        console.log('User information stored in Firestore.');
      } catch (error) {
        console.error('Error fetching user info or storing in Firestore:', error);
      }
    }

