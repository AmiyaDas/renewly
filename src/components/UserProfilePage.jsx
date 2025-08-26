import React, { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import Header from "./Header";
import { IoMail, IoCall, IoLockClosed } from "react-icons/io5";

const UserProfilePage = () => {
  const { user } = useContext(PreferencesContext);

  if (!user) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center px-4 overflow-x-hidden">
        <p className="text-gray-600 text-lg">No user information available.</p>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen viewport">
      {/* Header */}
      <Header title="User Profile" showNavBack={true} />

      {/* Profile Info */}
      <div className="flex flex-col items-center mt-12">
        <div className="w-24 h-24 rounded-full flex items-center justify-center">
          <img
            src={user.photoURL ? user.photoURL : "/renewly/user.png"}
            alt="avatar"
            className="w-20 h-20"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-800">
          {user.displayName || "Guest User"}
        </h3>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        {/* Email */}
        <div>
          <label className="text-sm text-gray-500">Your Email</label>
          <div className="flex items-center bg-gray-100 rounded-xl p-3 mt-1">
            <span className="flex-1 text-gray-700">
              {user.email || "Not Provided"}
            </span>
            <IoMail className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-500">Phone Number</label>
          <div className="flex items-center bg-gray-100 rounded-xl p-3 mt-1">
            <span className="flex-1 text-gray-700">
              {user.phoneNumber || "Not Provided"}
            </span>
            <IoCall className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-500">Password</label>
          <div className="flex items-center bg-gray-100 rounded-xl p-3 mt-1">
            <span className="flex-1 text-gray-700">***********</span>
            <IoLockClosed className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
