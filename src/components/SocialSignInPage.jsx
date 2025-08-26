import React, { useEffect, useState, useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import {
  auth,
  googleProvider,
  facebookProvider,
  appleProvider,
} from "../firebase";
import {
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaUserAlt, FaUserPlus } from "react-icons/fa";
const LoadingScreen = React.lazy(() => import("./LoadingScreen"));

const SocialSignInPage = ({ guestSignIn }) => {
  const { setUser } = useContext(PreferencesContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          setUser(result.user);
        }
      })
      .catch((err) => {
        console.error("Redirect sign-in error:", err);
      });
  }, [setUser]);

  const handleSignIn = (provider) => {
    setLoading(true);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      signInWithRedirect(auth, provider);
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          if (result && result.user) {
            setUser(result.user);
          }
        })
        .catch((err) => {
          console.error("Popup sign-in error:", err);
          setLoading(false);
        });
    }
  };

  const handleGuest = () => {
    setUser({ guest: true });
    guestSignIn && guestSignIn();
  };

  if (loading) return <LoadingScreen loading={true} />;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 flex flex-col items-center mx-auto">
        {/* Logo */}
        <img src="./logo_xl.ico" alt="Logo" className="w-24 h-24 mb-4" />

        <h2 className="text-3xl font-bold mb-6 text-center">
          Sign in to Renewly
        </h2>

        <h3 className="text-lg font-semibold mb-4">Sign in with</h3>

        <div className="flex gap-4 mb-6 w-full justify-center">
          <button
            onClick={() => handleSignIn(googleProvider)}
            className="flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 rounded-full gap-2"
          >
            <FcGoogle size={24} />
          </button>

          <button
            onClick={() => handleSignIn(facebookProvider)}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full gap-2"
          >
            <FaFacebook size={24} />
          </button>

          {appleProvider && (
            <button
              onClick={() => handleSignIn(appleProvider)}
              className="flex items-center justify-center px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-full gap-2"
            >
              <FaApple size={24} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleGuest}
            className="px-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 flex items-center justify-center gap-2"
          >
            <FaUserAlt size={20} />
            Continue as Guest
          </button>

          <button
            onClick={() => {}}
            className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <FaUserPlus size={20} />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSignInPage;
