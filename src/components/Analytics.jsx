import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "./Header";

const Analytics = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Weekly");
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const subs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("subscription_")) {
        try {
          subs.push(JSON.parse(localStorage.getItem(key)));
        } catch {}
      }
    }
    setSubscriptions(subs);
  }, []);

  // Helper to get data for a period
  function getDataForPeriod(period) {
    let labels = [];
    let labelMap = {};
    let now = new Date();
    if (period === "Weekly") {
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      labels.forEach((label) => (labelMap[label] = 0));
      subscriptions.forEach((sub) => {
        if (!sub.startDate || !sub.price) return;
        const d = new Date(sub.startDate);
        // Only count if within current week
        const dayOfWeek = d.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        // Find Monday of current week
        const curr = new Date(now);
        const diff = curr.getDate() - curr.getDay() + 1; // Monday
        const weekStart = new Date(curr.setDate(diff));
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        if (d >= weekStart && d < weekEnd) {
          // Use sub.startDate's day of week as label
          const label = labels[(d.getDay() + 6) % 7]; // Make 0=Sun go to last (Sun), 1=Mon to 0, etc.
          if (label) {
            labelMap[label] += parseFloat(sub.price) || 0;
          }
        }
      });
    } else if (period === "Monthly") {
      labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
      labels.forEach((label) => (labelMap[label] = 0));
      subscriptions.forEach((sub) => {
        if (!sub.startDate || !sub.price) return;
        const d = new Date(sub.startDate);
        const curr = new Date(now);
        // Only count if in current month
        if (
          d.getFullYear() === curr.getFullYear() &&
          d.getMonth() === curr.getMonth()
        ) {
          // Determine week of month (0-3)
          const week = Math.floor((d.getDate() - 1) / 7);
          const label = labels[week];
          if (label) {
            labelMap[label] += parseFloat(sub.price) || 0;
          }
        }
      });
    } else if (period === "Yearly") {
      labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      labels.forEach((label) => (labelMap[label] = 0));
      subscriptions.forEach((sub) => {
        if (!sub.startDate || !sub.price) return;
        const d = new Date(sub.startDate);
        const curr = new Date(now);
        // Only count if in current year
        if (d.getFullYear() === curr.getFullYear()) {
          const label = labels[d.getMonth()];
          if (label) {
            labelMap[label] += parseFloat(sub.price) || 0;
          }
        }
      });
    }
    return labels.map((label) => ({
      day: label,
      amount: labelMap[label] || 0,
    }));
  }

  const chartData = getDataForPeriod(activeTab);
  const average =
    chartData.length > 0
      ? chartData.reduce((sum, d) => sum + d.amount, 0) / chartData.length
      : 0;

  // Calculate top subscriptions by spend in the current period
  function getTopSubscriptions(period) {
    // Aggregate spend per subscription for the period
    const spendMap = {};
    subscriptions.forEach((sub) => {
      if (!sub.startDate || !sub.price) return;
      const d = new Date(sub.startDate);
      let inPeriod = false;
      const now = new Date();
      if (period === "Weekly") {
        // Check if in current week
        const curr = new Date(now);
        const diff = curr.getDate() - curr.getDay() + 1;
        const weekStart = new Date(curr.setDate(diff));
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        if (d >= weekStart && d < weekEnd) inPeriod = true;
      } else if (period === "Monthly") {
        const curr = new Date(now);
        if (
          d.getFullYear() === curr.getFullYear() &&
          d.getMonth() === curr.getMonth()
        )
          inPeriod = true;
      } else if (period === "Yearly") {
        const curr = new Date(now);
        if (d.getFullYear() === curr.getFullYear()) inPeriod = true;
      }
      if (inPeriod) {
        if (!spendMap[sub.name]) {
          spendMap[sub.name] = {
            ...sub,
            totalSpend: 0,
          };
        }
        spendMap[sub.name].totalSpend += parseFloat(sub.price) || 0;
      }
    });
    return Object.values(spendMap)
      .sort((a, b) => b.totalSpend - a.totalSpend)
      .slice(0, 3);
  }

  const topSubscriptions = getTopSubscriptions(activeTab);

  return (
    <div className="w-screen aspect-2/3 min-h-screen bg-[#f8f4f1] flex flex-col">
      {/* Header */}
      <Header showNavBack={true} title="Analytics" />

      {/* Tabs */}
      <div className="flex rounded-xl mx-4 mt-4 overflow-hidden">
        {["Weekly", "Monthly", "Yearly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 mr-2 text-sm font-medium ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-400"
            } transition-colors duration-200 hover:bg-gray-200`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Average */}
      <div className="flex justify-between items-center px-4 mt-4 bg-white rounded-lg shadow-sm py-2">
        <p>
          Average: <span className="font-bold">₹ {average.toFixed(2)}</span>
        </p>
        <select className="text-sm border rounded px-2">
          <option>
            {activeTab === "Weekly"
              ? "Current week"
              : activeTab === "Monthly"
              ? "Current month"
              : "Current year"}
          </option>
        </select>
      </div>

      {/* Chart */}
      <div className="px-4 py-4 bg-white rounded-lg shadow mt-4 mx-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#000" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="mt-4 px-4">
        {subscriptions.map((sub) => (
          <div
            key={sub.name}
            className="flex justify-between items-center py-3 px-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition mb-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={sub.icon}
                alt={sub.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{sub.name}</p>
                <p className="text-xs text-gray-500">{sub.startDate}</p>
              </div>
            </div>
            <p className="font-medium">₹ {sub.price}</p>
          </div>
        ))}
      </div>

      {/* Extra Analytics */}
      <div className="mt-6 mx-4 px-4 py-4 bg-white rounded-lg shadow">
        <h3 className="text-base font-semibold mb-4 border-b pb-2">
          Top 3 Subscriptions by Cost
        </h3>
        {topSubscriptions.map((sub, index) => (
          <div
            key={sub.name}
            className={`flex justify-between items-center text-sm py-2 ${
              index !== topSubscriptions.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
              {sub.name}
            </span>
            <span>
              ₹{" "}
              {sub.totalSpend
                ? sub.totalSpend.toFixed(2)
                : (parseFloat(sub.price) || 0).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
