import React, { useState, useEffect } from 'react';
import { firebaseConfig } from '../../../config/firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getUserData } from '../../../services/users.service';
import UpdateProfile from '../../UpdateProfile/UpdateProfile';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const MyProfileView = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      //console.log("User UID:", uid);

      getUserData(uid)
        .then((userData) => {
          if (userData) {
            setUserData(userData);
          } else {
            console.log("No user data found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile View</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <UpdateProfile setUserData={setUserData} />
    </div>
  );
};

export default MyProfileView;