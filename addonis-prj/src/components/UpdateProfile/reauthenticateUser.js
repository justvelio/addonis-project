import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const reauthenticateUser = async (user, email, currentPassword) => {
  const auth = getAuth();
  
  const credentials = EmailAuthProvider.credential(email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credentials);
    return true;
  } catch (error) {
    console.error('Error reauthenticating user:', error);
    return false;
  }
};

export default reauthenticateUser;
