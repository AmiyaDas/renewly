import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { categories, durations } from "../utils/data";
import Header from "./Header";

const SubscriptionDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  // Get subscription from location.state.subscription if present
  const app = location.state?.subscription || location.state || {};
  const [id, setId] = useState(app.id || Date.now());
  const [startDate, setStartDate] = useState(app.startDate || today);
  const [billingCycle, setBillingCycle] = useState(
    app.billingCycle || "Every month"
  );
  const [category, setCategory] = useState(app.category || "Streaming");
  const [notificationDays, setNotificationDays] = useState(
    app.notificationDays || "1 day before"
  );
  const [notificationTime, setNotificationTime] = useState(
    app.notificationTime || "09:00"
  );
  const [price, setPrice] = useState(app.price || "");
  const [renewalDate, setRenewalDate] = useState(app.renewalDate || "");
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const saveSubscription = () => {
    const subscriptionData = {
      id,
      name,
      icon:
        app.icon ||
        JSON.parse(localStorage.getItem(`subscription_${name}`) || "{}").icon ||
        "",
      startDate,
      billingCycle,
      category,
      notificationDays,
      notificationTime,
      price,
      renewalDate,
    };
    localStorage.setItem(
      `subscription_${name}`,
      JSON.stringify(subscriptionData)
    );
    navigate("/");
  };

  const handleSave = () => {
    let tempErrors = {};
    if (!startDate) tempErrors.startDate = "Start date is required";
    if (!price || isNaN(price) || parseFloat(price) <= 0)
      tempErrors.price = "Valid price is required";
    if (!renewalDate) tempErrors.renewalDate = "Renewal date is required";
    if (!billingCycle) tempErrors.billingCycle = "Billing cycle is required";
    if (!category) tempErrors.category = "Category is required";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const existingSub = localStorage.getItem(`subscription_${name}`);
    if (existingSub) {
      setShowUpdateModal(true);
      return;
    }

    saveSubscription();
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Header */}
      <Header showNavBack={true} title="Add Subscription" />

      {/* App Info */}
      <div className="flex items-center gap-4 p-4">
        {app?.icon && (
          <img
            src={app.icon}
            alt={name}
            className="w-14 h-14 rounded-full shadow"
          />
        )}
        <span className="text-lg font-medium">{name}</span>
      </div>

      {/* Form Sections */}
      <div className="flex flex-col gap-4 px-4">
        {/* First Box */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex flex-col py-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span>Start Date</span>
              <input
                type="date"
                className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                value={startDate}
                min={today}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
            )}
          </div>
          <div className="flex flex-col py-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span>Price</span>
              <span>₹</span>
              <input
                type="number"
                placeholder="0.00"
                className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>
          <div className="flex flex-col py-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span>Renewal Date</span>
              <input
                type="date"
                className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                value={renewalDate}
                onChange={(e) => setRenewalDate(e.target.value)}
              />
            </div>
            {errors.renewalDate && (
              <p className="text-red-500 text-xs mt-1">{errors.renewalDate}</p>
            )}
          </div>
          <div className="flex flex-col py-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span>Billing Cycle</span>
              <select
                className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
              >
                {durations.map((duration) => (
                  <option key={duration.key} value={duration.value}>
                    {duration.value}
                  </option>
                ))}
              </select>
            </div>
            {errors.billingCycle && (
              <p className="text-red-500 text-xs mt-1">{errors.billingCycle}</p>
            )}
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Free Trial</span>
            <input type="checkbox" className="w-5 h-5 accent-blue-500" />
          </div>
        </div>

        {/* Second Box */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex flex-col py-2 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span>Category</span>
              <select
                className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">{errors.category}</p>
            )}
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Notifications</span>
            <select
              className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
              value={notificationDays}
              onChange={(e) => setNotificationDays(e.target.value)}
            >
              <option value="1 day before">1 day before</option>
              <option value="2 days before">2 days before</option>
              <option value="1 week before">1 week before</option>
              <option value="On the day">On the day</option>
            </select>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Notification Time</span>
            <input
              type="time"
              className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
            />
          </div>
        </div>

        {/* Reminder Message */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex gap-2 items-start">
          <span className="text-blue-500 text-lg">🔔</span>
          <p className="text-sm text-gray-700">
            You’ll be reminded about this subscription on September 14, 2025,
            before it ends on September 15, 2025.
          </p>
        </div>
      </div>
      <button
        onClick={handleSave}
        className={`bg-black text-white px-4 py-1 mb-4 rounded-lg save-button ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        Save
      </button>
      <style>
        {`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.3s;
        }
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-enter {
          animation: modalEnter 0.25s ease-out forwards;
        }
      `}
      </style>
      {showUpdateModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-xs flex items-center justify-center z-50 transition-opacity duration-300 ease-out">
          <div className="bg-white rounded-lg p-6 shadow-md max-w-md w-full transform transition-all duration-300 scale-95 opacity-70 animate-modal-enter">
            <h3 className="text-lg font-semibold mb-4">Subscription Exists</h3>
            <p className="mb-4">
              This subscription already exists. Do you want to update it?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  saveSubscription();
                  setShowUpdateModal(false);
                }}
                className="bg-black text-white px-4 py-1 rounded-lg"
              >
                Yes, Update
              </button>
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  navigate("/");
                }}
                className="bg-gray-200 text-black px-4 py-1 rounded-lg"
              >
                No, Go Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetails;
