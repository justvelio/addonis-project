import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { storage } from '../config/firebase-config';
import { uploadBytes, getDownloadURL } from 'firebase/storage';

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
  // console.log("getUserData called with uid:", uid);
  const snapshot = await get(userRef);
  const userData = snapshot.val();
  if (userData) {
    userData.uid = uid;
    // console.log("getUserData snapshot:", snapshot.val());
  }
  return userData;
};

export const updateUserProfile = async (handle, updatedData) => {
  const { email, password, firstName, lastName, phone, ...otherUpdatedData } = updatedData;

  try {
    const auth = getAuth();
    const userRef = ref(db, `users/${handle}`);
    
    if (email) {
      await updateEmail(auth.currentUser, email);
      await update(userRef, { email });
    }

    if (password) {
      await updatePassword(auth.currentUser, password);
    }

    if (firstName) {
      await update(userRef, { firstName });
    }

    if (lastName) {
      await update(userRef, { lastName });
    }

    if (phone) {
      await update(userRef, { phone });
    }

    await update(userRef, otherUpdatedData);

    if (email || password) {
      await updateProfile(auth.currentUser, { email });
    }

    return true;
  } catch (error) {
    console.log('Error updating user profile:', error);
    return false;
  }
};

export const uploadProfilePictureToStorage = async (file) => {
  const storageRef = ref(storage, "profilePictures/" + file.name);

  await uploadBytes(storageRef, file);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};