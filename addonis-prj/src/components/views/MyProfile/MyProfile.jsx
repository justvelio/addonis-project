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
    <div style={{ paddingTop: '100px' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Personal Information</h1>
      <p>Username: {userData.username}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Phone: {userData.phone}</p>
      <p>Email: {userData.email}</p>
      <UpdateProfile setUserData={setUserData} />
    </div>
  );
};

export default MyProfileView;