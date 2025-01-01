// src/firebase.js
import { initializeApp } from 'firebase/app'; // Modular import
import { getFirestore, collection, getDocs, query, where, doc, setDoc} from 'firebase/firestore'; // Modular imports for Firestore



// Your Firebase config object (replace with your actual Firebase project configuration)
const firebaseConfig = {
    apiKey: "AIzaSyCYwmKmEXJlykq8Vhd2vrY5qRdw_nIyJ0o",
    authDomain: "exercise-calendar-46fb2.firebaseapp.com",
    projectId: "exercise-calendar-46fb2",
    storageBucket: "exercise-calendar-46fb2.firebasestorage.app",
    messagingSenderId: "328934531940",
    appId: "1:328934531940:web:e2caf3f820d242fbdcd071"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore db
export { db, collection, getDocs, query, where, doc, setDoc };