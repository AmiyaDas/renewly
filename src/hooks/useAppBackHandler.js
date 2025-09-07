import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function useAppBackHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const lastBackPress = useRef(0);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();

      if (location.pathname === "/") {
        // Home screen → double press to exit
        const now = Date.now();
        if (now - lastBackPress.current < 2000) {
          navigator.app?.exitApp?.();
        } else {
          lastBackPress.current = now;
          toast.dismiss();
          toast("Press back again to exit");
        }
      } else {
        // Any other page → navigate back
        navigate(-1);
      }
    };

    document.addEventListener("backbutton", handleBackButton, false);

    return () => {
      document.removeEventListener("backbutton", handleBackButton, false);
    };
  }, [location, navigate]);

  // Reset double-press state when app resumes
  useEffect(() => {
    const resetBackPress = () => {
      lastBackPress.current = 0;
    };
    document.addEventListener("resume", resetBackPress, false);
    return () => document.removeEventListener("resume", resetBackPress, false);
  }, []);
}