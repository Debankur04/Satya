import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Firestore for storing reports & user data
import { getStorage } from "firebase/storage";  // Firebase Storage for storing images/videos

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,  // Fixed incorrect storage bucket URL
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);  // Initialize Firebase Storage

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, googleProvider, db, storage };
