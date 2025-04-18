import { auth } from "./firebase-config.js";
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithPopup/*signInWithRedirect*/ } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { db, setDoc, doc } from "./firebase-config.js"

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup/*signInWithRedirect*/(auth, provider);

        // The signed-in user info
        const user = result.user;
        // User data to be stored in Firestore
        const userData = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            // Add other user information here as needed
        };

        // Reference to the Firestore document
        const userRef = doc(db, "users", user.uid);

        // Store user data in Firestore
        await setDoc(userRef, userData, { merge: true });

        console.log("User data successfully stored in Firestore");

        console.log('User signed in:', result.user);
        window.location.href = "../workplace.html"
    } catch (error) {
        console.error('Error during sign-in:', error);
    }
};

export const signOutUser = async () => {
    try {
        // await firebase.auth().signOut()
        await signOut(auth);
        console.log("signed out. signOutUserFunc")
        window.location.href = "index.html";
    } catch (error) {
        console.error('Error during sign-out:', error);
    }
};

export const monitorAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
};
