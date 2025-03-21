import { auth } from "./firebase-config.js";
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log('User signed in:', result.user);
        window.location.href = "../workplace.html"
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
};


import { db, setDoc, doc } from './firebase-config.js';

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
