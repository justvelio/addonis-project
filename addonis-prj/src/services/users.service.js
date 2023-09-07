import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db, firestore } from '../config/firebase-config';
import { getAuth, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { storage } from '../config/firebase-config';
import { uploadBytes, getDownloadURL , ref as storageRef} from 'firebase/storage';

export const getUserByHandle = (handle) => {

  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (handle, uid, email, role) => {

  return set(ref(db, `users/${handle}`), { handle, uid, email, createdOn: new Date(), likedPosts: {}, role: role, })
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
  const { email, password, firstName, lastName, phone, role, ...otherUpdatedData } = updatedData;

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

    if(role){
      await update(userRef, { role });
    }
    await update(userRef, otherUpdatedData)

    return true;
  } catch (error) {
    console.log('Error updating user profile:', error);
    return false;
  }
};

export const createUserRoles = (uid) => {
  const userRolesCollection = firestore.collection('userRoles');

  return userRolesCollection.doc(uid).set({
    roles: ['user'],
  })
}

export const updateUserRoles = (uid, newRoles) => {
  const userRolesCollection = firestore.collection('userRoles');

  return userRolesCollection.doc(uid).update({
    roles: newRoles,
  })
}

export const getUserRoles = async (uid) => {
  const userRolesCollection = firestore.collection('userRole');

  try {
    const doc = await userRolesCollection.doc(uid).get();
    if(doc.exists){
      return doc.data().roles;
    }else{
      console.log('UR Doc not found')
      return [];
    }
  }catch(error){
    console.error('error fetching UR:', error)
    return [];
  }
}

export const checkUserPermissions = async (uid) => {
  
  try {
    const roles = await getUserRoles(uid);
    if(roles.includes('admin')){
      console.log('user is admin');
    }else{
      console.log('user is not an admin');
    }
  }catch(error){
    console.error('error checking UR:', error)
  }
}

export const uploadProfilePictureToStorage = async (file, fileName) => {
    const pictureRef = storageRef(storage, `/profilePictures/${fileName}`);

    const snapshot = await uploadBytes(pictureRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };