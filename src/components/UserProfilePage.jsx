import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PreferencesContext } from "../context/PreferencesContext";
import Header from "./Header";
import { IoMail, IoCall, IoLockClosed } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const UserProfilePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(PreferencesContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("guestUser");
      console.log("Signed out successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center px-4 overflow-x-hidden">
        <p className="text-gray-600 text-lg">{t("no_user_info")}</p>
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
          <label className="text-sm text-gray-500">{t("email")}</label>
          <div className="flex items-center bg-gray-100 rounded-xl p-3 mt-1">
            <span className="flex-1 text-gray-700">
              {user.email || "Not Provided"}
            </span>
            <IoMail className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-500">{t("phone")}</label>
          <div className="flex items-center bg-gray-100 rounded-xl p-3 mt-1">
            <span className="flex-1 text-gray-700">
              {user.phoneNumber || "Not Provided"}
            </span>
            <IoCall className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-500">{t("password")}</label>
          <div className="flex items-center bg-gray-100 rounded-xl p-3 mt-1">
            <span className="flex-1 text-gray-700">***********</span>
            <IoLockClosed className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-[var(--color-primary)] text-white px-4 py-1 mb-4 rounded-lg save-button"
      >
        {t("logout")}
      </button>
    </div>
  );
};

export default UserProfilePage;
