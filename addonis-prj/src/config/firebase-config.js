import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'


export const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
console.log(firebaseConfig);

export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);