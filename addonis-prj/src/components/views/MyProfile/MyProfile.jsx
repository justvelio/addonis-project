import React, { useState, useEffect } from 'react';
import { firebaseConfig } from '../../../config/firebase-config';
import firebase from 'firebase/app';
import 'firebase/database';

const MyProfileView = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();
    const userRef = database.ref(`users/${userId}`);

    userRef.on('value', (snapshot) => {
      const user = snapshot.val();
      setUserData(user);
    });

    return () => {
      userRef.off('value');
    };
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile View</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default MyProfileView;