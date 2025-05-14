import { auth } from "./firebase-config.js";
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { db, setDoc, doc } from "./firebase-config.js"

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        const user = result.user;
        const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        };

        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, userData, { merge: true });

        console.log("User data successfully stored in Firestore");// debug
        console.log('User signed in:', result.user);// debug

        window.location.href = "../workplace.html"
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
};

export const signOutUser = async () => {
    try {
        await signOut(auth);

        console.log("signed out. signOutUserFunc");// debug
        
        window.location.href = "index.html";
    } catch (error) {
        console.error('Error during sign-out:', error);// debug
    }
};

export const monitorAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
};
