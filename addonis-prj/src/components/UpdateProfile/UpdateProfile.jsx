import React, { useState } from 'react';
import { updateUserProfile } from './user.service';
const UpdateProfileComponent = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async () => {
    const updatedData = {
      email: newEmail,
      password: newPassword,
    };

    const success = await updateUserProfile('userHandle', updatedData);

    if (success) {
      alert('Profile updated successfully!');
    } else {
      alert('Profile update failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <label>
        New Email:
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default UpdateProfileComponent;