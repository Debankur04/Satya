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
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",  // Fixed incorrect storage bucket URL
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);  // Initialize Firebase Storage

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, googleProvider, db, storage };
