import { initializeApp } from "firebase/app";
import {
    connectAuthEmulator,
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCs2GujRrlTqhK7anNsFbwm_GccRFjSsI4",
    authDomain: "snap-share-78f51.firebaseapp.com",
    projectId: "snap-share-78f51",
    storageBucket: "snap-share-78f51.appspot.com",
    messagingSenderId: "1068745865508",
    appId: "1:1068745865508:web:450ef440574fbc003a5bb1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(auth);
export const githubProvider = new GithubAuthProvider(auth);
export const facebookProvider = new FacebookAuthProvider(auth);
export const storage = getStorage(app);

if (window.location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
    connectStorageEmulator(storage, "localhost", 9199);
}
