import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { categories, durations } from "../utils/data";
import Header from "./Header";

const SubscriptionDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get subscription from location.state.subscription if present
  const app = location.state?.subscription || location.state || {};
  const [id, setId] = useState(app.id || Date.now());
  const [startDate, setStartDate] = useState(app.startDate || "2025-08-15");
  const [billingCycle, setBillingCycle] = useState(app.billingCycle || "Every month");
  const [category, setCategory] = useState(app.category || "Streaming");
  const [notificationDays, setNotificationDays] = useState(app.notificationDays || "1 day before");
  const [notificationTime, setNotificationTime] = useState(app.notificationTime || "09:00");
  const [price, setPrice] = useState(app.price || "");
  const [renewalDate, setRenewalDate] = useState(app.renewalDate || "");

  const handleSave = () => {
    const subscriptionData = {
      id,
      name,
      icon: app.icon || "",
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

  
  return (
    <div className="w-screen h-screen bg-[#f8f4f1] flex flex-col">
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
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Start Date</span>
            <input
              type="date"
              className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
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
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Renewal Date</span>
            <input
              type="date"
              className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
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
          <div className="flex justify-between items-center py-2">
            <span>Free Trial</span>
            <input type="checkbox" className="w-5 h-5 accent-blue-500" />
          </div>
        </div>

        {/* Second Box */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
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
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Notifications</span>
            <select
              className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
              value={notificationDays}
              onChange={(e) => setNotificationDays(e.target.value)}
            >
              <option value="1 day before">1 day before</option>
              <option value="2 days before">2 days before</option>
              <option value="3 days before">3 days before</option>
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
        className="bg-black text-white px-4 py-1 mb-4 rounded-lg save-button"
      >
        Save
      </button>
    </div>
  );
};

export default SubscriptionDetails;
