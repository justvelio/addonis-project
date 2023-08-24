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
  // console.log("getUserData called with uid:", uid);
  const snapshot = await get(userRef);
  const userData = snapshot.val();
  if (userData) {
    userData.uid = uid;
    // console.log("getUserData snapshot:", snapshot.val());
  }
  return userData;
};
