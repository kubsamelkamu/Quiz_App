/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '@/context/Authcontext';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [profilePicture] = useState(currentUser?.photoURL || '');

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    try {
      await updateProfile(currentUser, { displayName, photoURL: profilePicture });
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
      <div className="flex justify-center mb-4">
        <img
          src={profilePicture || '/default-profile.png'}
          alt="Profile Picture"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleSaveChanges}
            className="bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
          >
            Save Changes
          </button>
          <button
            onClick={handleEditToggle}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="text-center text-gray-800 font-semibold mb-2">{displayName || 'No display name'}</p>
          <p className="text-center text-gray-500 mb-4">{currentUser?.email}</p>
          <button
            onClick={handleEditToggle}
            className="bg-blue-600 text-white py-2 px-4 rounded-md w-full"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
