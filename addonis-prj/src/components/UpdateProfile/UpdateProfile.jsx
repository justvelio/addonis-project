import React, { useState } from 'react';
import { updateUserProfile } from '../../services/users.service';
import MyProfileView from '../views/MyProfile/MyProfile';
import reauthenticateUser from './reauthenticateUser';
import { getAuth } from 'firebase/auth';

const UpdateProfile = ({setUserData}) => {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleUpdate = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const updatedData = {};
    const reauthSuccess = await reauthenticateUser(user, user.email, currentPassword);

    if (!reauthSuccess) {
      alert('Failed to reauthenticate. Please enter the correct current password.');
      return;
    }

    if (newEmail) {
      updatedData.email = newEmail;
    }

    if (newPassword) {
      updatedData.password = newPassword;
    }

    if (newFirstName) {
      updatedData.firstName = newFirstName;
    }

    if (newLastName) {
      updatedData.lastName = newLastName;
    }

    if (newPhone) {
      updatedData.phone = newPhone;
    }

    const success = await updateUserProfile(user.uid, updatedData);

    if (success) {
      alert('Profile updated successfully!');
      setUserData((prevData) => ({ ...prevData, ...updatedData }));

      setNewEmail('');
      setNewPassword('');
      setNewFirstName('');
      setNewLastName('');
      setNewPhone('');
      setCurrentPassword('');
    } else {
      alert('Profile update failed. Please try again.');
    }
  };

  return (
    <div style={{ paddingTop: '50px' }}> 
      <h2 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Update Your Profile</h2>
      <label>
        New First Name:<br />
        <input
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          style={inputStyle}
        />
      </label><br />
      <label>
        New Last Name:<br />
        <input
          type="text"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          style={inputStyle}
        />
      </label><br />
      <label>
        New Email:<br />
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={inputStyle}
        />
      </label><br />
      <label>
        New Phone:<br />
        <input
          type="tel"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          style={inputStyle}
        />
      </label><br />
      <label>
        New Password:<br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={inputStyle}
        />
      </label><br />
      <label>
        Please, confirm your current password before saving the changes:<br />
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={inputStyle}
        />
      </label><br />
      <button
        onClick={handleUpdate}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

const inputStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '6px',
  margin: '4px',
  width: '20%',
  boxSizing: 'border-box',
};

export default UpdateProfile;