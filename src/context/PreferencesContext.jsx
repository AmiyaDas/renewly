import React, { createContext, useState, useEffect, useCallback } from "react";
import i18n from "../i18n";

export const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const defaultPrefs = {
    language: "en", // default i18n code
    currency: "INR",
    notificationsEnabled: true,
    theme: "light", // 'light' or 'dark'
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
        theme: saved.theme || defaultPrefs.theme,
      };
    } catch (err) {
      console.warn("Preferences in localStorage are invalid, using defaults.");
      return defaultPrefs;
    }
  };

  const [preferences, setPreferences] = useState(loadPreferences);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const updateTheme = (value) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    document.body.classList.toggle("dark", value === "dark");
  };

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    i18n.changeLanguage(preferences.language);
    updateTheme(preferences.theme);
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  // Single function to update any preference
  const updatePreference = useCallback((key, value) => {
    if (!preferences.hasOwnProperty(key)) return;
    if (key === "language") {
      i18n.changeLanguage(value);
    }
    if (key === "theme") {
      updateTheme(value);
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