import React, { useState } from "react";
import { languages, currencies } from "../utils/data";
import Header from "./Header";
import { FaShareAlt, FaStar, FaEnvelope } from "react-icons/fa";

const supportLinks = [
  { name: "Rate Us", icon: <FaStar/>, action: "rate" },
  { name: "Share App", icon: <FaShareAlt/>, action: "share" },
  { name: "Contact Support", icon: <FaEnvelope/>, action: "contact" },
];

const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  // Save preferences (simulate API/localStorage)
  const handleSavePreferences = () => {
    localStorage.setItem("preferences", JSON.stringify({selectedLanguage, selectedCurrency, notificationsEnabled}));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Support actions
  const handleSupportClick = (action) => {
    if (action === "rate") {
      window.open("https://play.google.com/store/apps/details?id=com.renewly", "_blank");
    } else if (action === "share") {
      if (navigator.share) {
        navigator.share({
          title: "Renewly",
          text: "Track your subscriptions easily with Renewly!",
          url: window.location.origin,
        });
      } else {
        navigator.clipboard.writeText(window.location.origin);
        alert("App link copied to clipboard!");
      }
    } else if (action === "contact") {
      window.location.href = "mailto:support@renewly.com?subject=Support%20Request";
    }
  };

  return (
    <div className="w-screen h-screen bg-[#f8f4f1] flex flex-col">
      <Header showNavBack={true} title="Settings" />

      {/* Preferences */}
      <div className="aspect-3/2 p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Preferences</h3>
          <div className="mb-4">
            <label className="block mb-1 text-base">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-base"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-base">Currency</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 text-base"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label className="text-base mr-4">Notifications</label>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="w-5 h-5"
            />
          </div>
          <button
            onClick={handleSavePreferences}
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 font-semibold hover:bg-blue-600 transition"
          >
            Save Preferences
          </button>
          {saved && (
            <div className="text-green-600 text-center mt-2 font-medium">
              Preferences saved!
            </div>
          )}
        </div>
      </div>

      {/* Support Us */}
      <div className="aspect-3/2 p-4 shadow mt-2">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Support Us</h3>
          <ul className="list-none p-0">
            {supportLinks.map((item) => (
              <li
                key={item.name}
                className="flex items-center px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleSupportClick(item.action)}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="flex-1 text-base">{item.name}</span>
                <span className="text-2xl text-gray-400">&rsaquo;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="w-full bg-white py-4 mt-auto shadow-inner">
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Renewly &middot; All rights reserved
        </div>
        <div className="text-center mt-1">
          <a
            href="https://renewly.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mx-2"
          >
            Privacy Policy
          </a>
          <a
            href="https://renewly.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mx-2"
          >
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Settings;