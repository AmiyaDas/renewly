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
import { useTranslation } from "react-i18next";

const Analytics = () => {
  const { t } = useTranslation();
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
    if (cycle === "Weekly") newDate.setDate(newDate.getDate() + 7);
    else if (cycle === "Monthly") newDate.setMonth(newDate.getMonth() + 1);
    else if (cycle === "Yearly") newDate.setFullYear(newDate.getFullYear() + 1);
    return newDate;
  };

  const getOccurrences = (sub, periodStart, periodEnd) => {
    const occurrences = [];
    if (!sub?.startDate) return occurrences;
    const amount = parsePrice(sub.price);
    const cycle = ["Weekly", "Monthly", "Yearly"].includes(sub.billingCycle)
      ? sub.billingCycle
      : "Monthly";

    let current = new Date(sub.startDate);
    if (isNaN(current)) return occurrences;
    current.setHours(0, 0, 0, 0);

    let guard = 0;
    while (current < periodStart && guard < 1000) {
      current = advanceByCycle(current, cycle);
      guard++;
    }

    while (current >= periodStart && current < periodEnd && guard < 2000) {
      occurrences.push({ date: new Date(current), amount });
      current = advanceByCycle(current, cycle);
      guard++;
    }
    return occurrences;
  };

  const getDataForPeriod = (period) => {
    let labels = [];
    let labelMap = {};
    let now = new Date();

    if (period === "Weekly") {
      labels = [t("weekly_mon"), t("weekly_tue"), t("weekly_wed"), t("weekly_thu"), t("weekly_fri"), t("weekly_sat"), t("weekly_sun")];
      labels.forEach((label) => (labelMap[label] = 0));
      subscriptions.forEach((sub) => {
        if (!sub.startDate || !sub.price) return;
        const d = new Date(sub.startDate);
        const curr = new Date(now);
        const diff = curr.getDate() - curr.getDay() + 1;
        const weekStart = new Date(curr.setDate(diff));
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        if (d >= weekStart && d < weekEnd) {
          const label = labels[(d.getDay() + 6) % 7];
          if (label) labelMap[label] += parsePrice(sub.price);
        }
      });
    } else if (period === "Monthly") {
      labels = [t("monthly_week1"), t("monthly_week2"), t("monthly_week3"), t("monthly_week4")];
      labels.forEach((label) => (labelMap[label] = 0));
      subscriptions.forEach((sub) => {
        if (!sub.startDate || !sub.price) return;
        const d = new Date(sub.startDate);
        const curr = new Date(now);
        if (d.getFullYear() === curr.getFullYear() && d.getMonth() === curr.getMonth()) {
          const week = Math.floor((d.getDate() - 1) / 7);
          const label = labels[week];
          if (label) labelMap[label] += parsePrice(sub.price);
        }
      });
    } else if (period === "Yearly") {
      labels = [
        t("yearly_jan"), t("yearly_feb"), t("yearly_mar"), t("yearly_apr"), t("yearly_may"), t("yearly_jun"),
        t("yearly_jul"), t("yearly_aug"), t("yearly_sep"), t("yearly_oct"), t("yearly_nov"), t("yearly_dec")
      ];
      labels.forEach((label) => (labelMap[label] = 0));
      subscriptions.forEach((sub) => {
        if (!sub.startDate || !sub.price) return;
        const d = new Date(sub.startDate);
        const curr = new Date(now);
        if (d.getFullYear() === curr.getFullYear()) {
          const label = labels[d.getMonth()];
          if (label) labelMap[label] += parsePrice(sub.price);
        }
      });
    }

    return labels.map((label) => ({ day: label, amount: labelMap[label] || 0 }));
  };

  const chartData = getDataForPeriod(activeTab);
  const average =
    chartData.length > 0
      ? chartData.reduce((sum, d) => sum + d.amount, 0) / chartData.length
      : 0;

  const topSubscriptions = subscriptions
    .map((sub) => ({
      ...sub,
      totalSpend: parsePrice(sub.price),
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend)
    .slice(0, 3);

  const currencySymbol = currencySymbols[currency] || "";

  return (
    <div className="w-screen min-h-screen bg-[#f8f4f1] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f8f4f1]">
        <Header showNavBack={true} title={t("analytics")} />
      </div>

      <div className="flex-1">
        {/* Tabs */}
        <div className="flex bg-white rounded-xl mx-4 mt-3 overflow-hidden sticky top-14 z-20">
          {[t("weekly"), t("monthly"), t("yearly")].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(
                tab === t("weekly") ? "Weekly" : tab === t("monthly") ? "Monthly" : "Yearly"
              )}
              className={`flex-1 py-2 mr-2 text-sm font-medium ${
                activeTab === (tab === t("weekly") ? "Weekly" : tab === t("monthly") ? "Monthly" : "Yearly")
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
            {t("average")}: <span className="font-bold">{currencySymbol}{average.toFixed(2)}</span>
          </p>
          <select className="text-sm border rounded px-2">
            <option>
              {activeTab === "Weekly"
                ? t("current_week")
                : activeTab === "Monthly"
                ? t("current_month")
                : t("current_year")}
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
                <YAxis tickFormatter={(val) => `${currencySymbol}${val}`} />
                <Tooltip formatter={(value) => [`${currencySymbol}${value}`, t("amount")]} />
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
                <img src={sub.icon} alt={sub.name} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-xs text-gray-500">{sub.startDate}</p>
                </div>
              </div>
              <p className="font-medium">{currencySymbol}{sub.price}</p>
            </div>
          ))}
        </div>

        {/* Top Subscriptions */}
        <div className="mt-6 mx-4 px-4 py-4 bg-white rounded-lg shadow">
          <h3 className="text-base font-semibold mb-4 border-b pb-2">
            {t("top_subscriptions_by_cost")}
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
              <span>{currencySymbol}{sub.totalSpend.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;