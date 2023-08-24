import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth';

export const getUserByHandle = (handle) => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email) => {

  return set(ref(db, `users/${handle}`), { handle, uid, email, createdOn: new Date(), likedPosts: {} })
};

// export const getUserData = (uid) => {

//   return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
// };

export const getUserData = async (uid) => {
  const userRef = ref(db, `users/${uid}`);
  
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData;
    } else {
      console.log("No user data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUserProfile = async (handle, updatedData) => {
  const { email, password, ...otherUpdatedData } = updatedData;

  try {
    const userRef = ref(db, `users/${handle}`);
    if (email) {
      await updateEmail(auth.currentUser, email);
      await update(userRef, { email });
    }

    if (password) {
      await updatePassword(auth.currentUser, password);
    }

    await update(userRef, otherUpdatedData);

    if (email || password) {
      await updateProfile(auth.currentUser, { email });
    }

    return true;
  } catch (error) {
    Alert('Error updating user profile:', error);
    return false;
  }

};