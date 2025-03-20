import { auth } from "./firebase-config.js";
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithRedirect(auth, provider); // change sign in pop up to redirect
        console.log('User signed in:', result.user);
        window.location.href = "../workplace.html"
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
