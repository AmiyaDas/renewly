import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { categories } from "../utils/data";

const SubscriptionDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const app = location.state;
  const [startDate, setStartDate] = useState('2025-08-15');
  const [billingCycle, setBillingCycle] = useState('Every month');
  const [category, setCategory] = useState('Streaming');

  return (
    <div className="w-screen h-screen bg-[#f8f4f1] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#f8f4f1]">
        <button onClick={() => navigate(-1)} className="text-xl">&#8592;</button>
        <h2 className="text-lg font-semibold">Add Subscription</h2>
        <button className="bg-black text-white px-4 py-1 rounded-lg">Save</button>
      </div>

      {/* App Info */}
      <div className="flex items-center gap-4 p-4">
        <img src={app.icon} alt={name} className="w-14 h-14 rounded-full shadow" />
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
            />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Renewal Date</span>
            <input
              type="date"
              className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
            />
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span>Billing Cycle</span>
            <select
              className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
            >
              <option>Every month</option>
              <option>Every year</option>
              <option>Every week</option>
              <option>Every day</option>
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
            <span className="flex items-center gap-1">1 day before ▼</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Notification Time</span>
            <button className="bg-gray-100 px-3 py-1 rounded-lg text-sm">9:00 AM</button>
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
    </div>
  );
};

export default SubscriptionDetails;