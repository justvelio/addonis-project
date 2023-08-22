// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOz5KGsDYyoDANC9pFki88OkWZipXr69M",
  authDomain: "addonis-project-7ae13.firebaseapp.com",
  projectId: "addonis-project-7ae13",
  storageBucket: "addonis-project-7ae13.appspot.com",
  messagingSenderId: "549335156065",
  appId: "1:549335156065:web:80cd2978ca21c44b47f120",
  databaseURL: 'https://addonis-project-7ae13-default-rtdb.europe-west1.firebasedatabase.app'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);