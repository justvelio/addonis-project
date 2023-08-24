import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { db } from '../config/firebase-config';
import { get, ref, set } from 'firebase/database';


export const registerUser = async (email, password, userData) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(user, rest)

    // To do
      if (user) {
        const userDataObject = {
          email: user.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          phone: userData.phone,
        };

        const userRef = ref(db, `users/${user.uid}`);

        set(userRef, userDataObject)
          .then(() => {
            console.log("User registered and data saved successfully!", user.uid);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
      }
    // });
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential;
};


export const logoutUser = () => {
  return signOut(auth);
};