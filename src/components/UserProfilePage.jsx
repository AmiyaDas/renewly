import React, { useContext } from 'react';
import { PreferencesContext } from '../context/PreferencesContext';
import Header from './Header';

const UserProfilePage = () => {
  const { user } = useContext(PreferencesContext);

  if (!user) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 px-4 overflow-x-hidden">
        <p className="text-gray-600 text-lg">No user information available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 overflow-x-hidden">
      <Header title="User Profile" showNavBack={true} className="w-screen fixed top-0 left-0 z-10" />
      <div className="flex-1 flex items-center justify-center w-screen">
        <div className="w-full max-w-md p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center mx-4">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="w-28 h-28 rounded-full mb-4 border-4 border-white shadow-md" />
          ) : (
            <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
              <span className="text-3xl font-bold">{user.displayName?.[0] || 'U'}</span>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{user.displayName || 'Guest User'}</h2>
          <p className="text-gray-600 mb-1">Email: {user.email || 'Not Provided'}</p>
          <p className="text-gray-600 mb-1">Phone: {user.phoneNumber || 'Not Provided'}</p>

          {/* Additional details placeholder */}
          <div className="mt-4 w-full">
            <p className="text-gray-700 mb-2 font-medium">Subscription Info</p>
            <div className="bg-gray-100 rounded-lg p-3 w-full text-center text-gray-500">
              No subscription data available.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;