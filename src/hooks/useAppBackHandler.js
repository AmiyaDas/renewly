// hooks/useAppBackHandler.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast"; // or your toast library

export default function useAppBackHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastBackPress = 0;

    const handleBack = (event) => {
      event.preventDefault();

      if (location.pathname === "/") {
        // Double-press back to exit (for PWA + browser swipe)
        const now = Date.now();
        if (now - lastBackPress < 1500) {
          window.history.go(-2); // exit the app/browser tab
        } else {
          toast("Press back again to exit", {
            position: "bottom-center",
          });
          lastBackPress = now;
        }
      } else {
        // Navigate one step back if not on home
        navigate(-1);
      }
    };

    // ✅ For browser swipe / back button
    window.addEventListener("popstate", handleBack);

    // ✅ For Android hardware back in standalone PWA
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        handleBack(new Event("popstate"));
      }
    });

    return () => {
      window.removeEventListener("popstate", handleBack);
      document.removeEventListener("visibilitychange", handleBack);
    };
  }, [navigate, location]);
}