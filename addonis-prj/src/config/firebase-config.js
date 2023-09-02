import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'


export const firebaseConfig = {
  apiKey: "AIzaSyDtkqYHqPVNTbfyaBrshArGni10LiapKnw",
  authDomain: "addonis-e5b1b.firebaseapp.com",
  projectId: "addonis-e5b1b",
  storageBucket: "addonis-e5b1b.appspot.com",
  messagingSenderId: "445136249009",
  appId: "1:445136249009:web:00a98b528364013fa64290",

  databaseURL: "https://addonis-e5b1b-default-rtdb.europe-west1.firebasedatabase.app/"
};


export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app)