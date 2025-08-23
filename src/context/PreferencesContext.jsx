import React, { createContext, useState, useEffect, useCallback } from "react";
import i18n from "../i18n";

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const defaultPrefs = {
    language: "en", // default i18n code
    currency: "INR",
    notificationsEnabled: true,
  };

  // Load saved preferences safely
  const loadPreferences = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("preferences")) || {};
      return {
        language: saved.language || saved.selectedLanguage || defaultPrefs.language,
        currency: saved.currency || saved.selectedCurrency || defaultPrefs.currency,
        notificationsEnabled:
          saved.notificationsEnabled !== undefined
            ? saved.notificationsEnabled
            : defaultPrefs.notificationsEnabled,
      };
    } catch (err) {
      console.warn("Preferences in localStorage are invalid, using defaults.");
      return defaultPrefs;
    }
  };

  const [preferences, setPreferences] = useState(loadPreferences);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    i18n.changeLanguage(preferences.language);
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  // Single function to update any preference
  const updatePreference = useCallback((key, value) => {
    if (!preferences.hasOwnProperty(key)) return;
    if (key === "language") {
      i18n.changeLanguage(value);
    }
    setPreferences((prev) => ({ ...prev, [key]: value }));
  }, [preferences]);

  const [user, setUser] = useState(null); // stores signed-in user info

  return (
    <PreferencesContext.Provider
      value={{
        ...preferences,
        updatePreference,
        user,
        setUser,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};