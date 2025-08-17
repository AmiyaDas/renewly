import { useState, useEffect, useContext } from "react";
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
import { PreferencesContext } from "../context/PreferencesContext";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("Weekly");
  const [subscriptions, setSubscriptions] = useState([]);

  const { currency } = useContext(PreferencesContext);
  const currencySymbols = { USD: "$", EUR: "€", INR: "₹", GBP: "£" };

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

  const parsePrice = (price) => {
    const p = parseFloat(price);
    return isNaN(p) ? 0 : p;
  };

  const advanceByCycle = (date, cycle) => {
    const newDate = new Date(date);
    if (cycle === "Weekly") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (cycle === "Monthly") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (cycle === "Yearly") {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    return newDate;
  };

  const getOccurrences = (sub, periodStart, periodEnd) => {
    const occurrences = [];
    if (!sub?.startDate) return occurrences;
    const amount = parsePrice(sub.price);
    const cycleRaw = sub.billingCycle || "Monthly";
    const cycle = ["Weekly", "Monthly", "Yearly"].includes(cycleRaw)
      ? cycleRaw
      : "Monthly";

    let current = new Date(sub.startDate);
    if (isNaN(current)) return occurrences;
    current.setHours(0, 0, 0, 0);

    // Move to the first occurrence that is on/after periodStart
    let guard = 0;
    while (current < periodStart && guard < 1000) {
      current = advanceByCycle(current, cycle);
      guard++;
    }
    if (guard >= 1000) return occurrences; // safety

    while (current >= periodStart && current < periodEnd && guard < 2000) {
      occurrences.push({ date: new Date(current), amount });
      current = advanceByCycle(current, cycle);
      guard++;
    }
    return occurrences;
  };

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
    const spendMap = {};

    const now = new Date();
    let periodStart, periodEnd;

    if (period === "Weekly") {
      const curr = new Date(now);
      const diff = curr.getDate() - curr.getDay() + 1; // Monday
      periodStart = new Date(curr.setDate(diff));
      periodStart.setHours(0, 0, 0, 0);
      periodEnd = new Date(periodStart);
      periodEnd.setDate(periodEnd.getDate() + 7);
    } else if (period === "Monthly") {
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    } else if (period === "Yearly") {
      periodStart = new Date(now.getFullYear(), 0, 1);
      periodEnd = new Date(now.getFullYear() + 1, 0, 1);
    }

    subscriptions.forEach((sub) => {
      if (!sub.startDate || !sub.price) return;
      const occurrences = getOccurrences(sub, periodStart, periodEnd);
      const totalSpend = occurrences.reduce((acc, curr) => acc + curr.amount, 0);

      if (!spendMap[sub.name]) spendMap[sub.name] = { ...sub, totalSpend: 0 };
      spendMap[sub.name].totalSpend += totalSpend;
    });

    return Object.values(spendMap)
      .sort((a, b) => b.totalSpend - a.totalSpend)
      .slice(0, 3);
  }

  const topSubscriptions = getTopSubscriptions(activeTab);

  return (
    <div className="w-screen min-h-screen bg-[#f8f4f1] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f8f4f1]">
        <Header showNavBack={true} title="Analytics" />
      </div>
      <div className="flex-1">

      {/* Tabs */}
      <div className="flex bg-white rounded-xl mx-4 mt-3 overflow-hidden sticky top-14 z-20">
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
      <div className="flex justify-between items-center px-4 mx-4 mt-4 bg-white rounded-lg shadow-sm py-2">
        <p>
          Average: <span className="font-bold">{currencySymbols[currency] || ""} {average.toFixed(2)}</span>
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
          <ResponsiveContainer
            width="100%"
            height="100%"
            className="charts-container"
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(val) => `${currencySymbols[currency] || ""}${val}`} />
              <Tooltip formatter={(value) => [`${currencySymbols[currency] || ""}${value}`, "Amount"]} />
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
            <p className="font-medium">{currencySymbols[currency] || ""} {sub.price}</p>
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
              {currencySymbols[currency] || ""}{" "}
              {sub.totalSpend
                ? sub.totalSpend.toFixed(2)
                : (parseFloat(sub.price) || 0).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Analytics;
