import React, { createContext, useState, useEffect, useCallback } from "react";

// Create context
export const PreferencesContext = createContext();

// Provider component
export const PreferencesProvider = ({ children }) => {
  // Default preferences
  const defaultPrefs = {
    language: "English",
    currency: "INR",
    notificationsEnabled: true,
  };

  const [preferences, setPreferences] = useState(defaultPrefs);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem("preferences");
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        setPreferences((prev) => ({
          ...prev,
          ...parsed, // only override what exists
        }));
      } catch (err) {
        console.warn("Preferences in localStorage are invalid. Using defaults.");
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("preferences", JSON.stringify(preferences));
  }, [preferences]);

  // Single function to update any preference
  const updatePreference = useCallback((key, value) => {
    if (!preferences.hasOwnProperty(key)) return;
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, [preferences]);

  return (
    <PreferencesContext.Provider
      value={{
        ...preferences,
        updatePreference, // use this to update any preference
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};