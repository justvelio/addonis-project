import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

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