import Header from "./Header";
import FooterTab from "./FooterTab";
import { FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import NoData from "./NoData";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionModal from "./SubscriptionModal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { currency } = useContext(PreferencesContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [currentModalData, setCurrentModalData] = useState({
    name: "",
    renewalDate: "",
    startDate: "",
    billingCycle: "",
    icon: "",
    category: "",
    price: "",
  });
  const [removingId, setRemovingId] = useState(null);

  const openModal = (sub) => {
    setCurrentModalData({
      name: sub.name,
      renewalDate: sub.renewalDate,
      startDate: sub.startDate,
      billingCycle: sub.billingCycle,
      icon: sub.icon,
      category: sub.category,
      price: sub.price,
    });
    setSelectedSub(sub);
    setOpen(true);
  };

  const closeModal = (deleted, deletedId) => {
    setOpen(false);
    setSelectedSub(null);
    if (deleted && deletedId) {
      setRemovingId(deletedId);
      setTimeout(() => {
        const updatedSubs = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("subscription_")) {
            try {
              updatedSubs.push(JSON.parse(localStorage.getItem(key)));
            } catch {}
          }
        }
        setSubscriptions(updatedSubs);
        setRemovingId(null);
      }, 300); // match animation duration
    }
  };

  const formatBillingCycle = (cycle) => {
    switch (cycle.toLowerCase()) {
      case "monthly":
      case "every month":
        return "per month";
      case "yearly":
      case "every year":
        return "per year";
      case "weekly":
      case "every week":
        return "per week";
      default:
        return cycle;
    }
  };

  useEffect(() => {
    const subs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("subscription_")) {
        try {
          const sub = JSON.parse(localStorage.getItem(key));
          if (!sub.status || sub.status !== "cancelled") {
            subs.push(sub);
          }
        } catch (e) {
          // ignore parsing errors
        }
      }
    }
    setSubscriptions(subs);
  }, []);

  const totalYearly = subscriptions.reduce((total, sub) => {
    let yearlyPrice = 0;
    const cycle = (sub.billingCycle || "").toLowerCase();
    const priceNum =
      parseFloat(sub.price.toString().replace(/[^0-9.]/g, "")) || 0;

    if (cycle.includes("month")) {
      yearlyPrice = priceNum * 12;
    } else if (cycle.includes("year")) {
      yearlyPrice = priceNum;
    } else if (cycle.includes("week")) {
      yearlyPrice = priceNum * 52;
    } else {
      yearlyPrice = priceNum;
    }

    return total + yearlyPrice;
  }, 0);

  // Lookup currency symbol
  const currencySymbols = { USD: "$", EUR: "€", INR: "₹", GBP: "£" };
  const totalYearlyFormatted = `${
    currencySymbols[currency] || ""
  } ${totalYearly.toFixed(2)}`;

  const totaSummary = (
    <div className="summary-header">
      <div className="stats-item">
        <span className="stats-icon">💰</span>
        <div className="stats-text">
          <div className="stats-label">{t("total_yearly")}</div>
          <div className="stats-value">{totalYearlyFormatted}</div>
        </div>
      </div>

      <div className="stats-item">
        <span className="stats-icon">🔥</span>
        <div className="stats-text">
          <div className="stats-label">{t("active")}</div>
          <div className="stats-value">
            {subscriptions.length.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRenewInfo = (renewDate) => {
    if (!renewDate) return t("no_renewal_date");
    const renew = new Date(renewDate);
    if (isNaN(renew)) return t("invalid_date");
    const today = new Date();
    const diffTime = renew - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const options = { year: "numeric", month: "short", day: "numeric" };
    const dateStr = renew.toLocaleDateString(undefined, options);
    return t("renews_on", {
      date: dateStr,
      daysLeft: diffDays >= 0 ? diffDays + " days left" : "Expired",
    });
  };

  const currentSubscriptionsList = (
    <div className="subscriptions">
      <Link to="/subscriptions" className="subscriptions-header-link">
        <div className="subscriptions-header">
          <h2>{t("all_subscriptions")}</h2>
          <FaChevronRight size={20} />
        </div>
      </Link>
      <div className="subscriptions-list">
        {subscriptions.map((sub, index) => {
          const daysLeft = (() => {
            if (!sub.renewalDate) return null;
            const today = new Date();
            const renew = new Date(sub.renewalDate);
            const diffTime = renew - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays >= 0 ? diffDays : 0;
          })();
          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={
                sub.status === "cancelled" ? "opacity-50 grayscale" : ""
              }
            >
              <SubscriptionCard
                name={sub.name}
                // renewDate={sub.renewalDate}
                daysLeft={daysLeft}
                icon={sub.icon}
                price={`${currencySymbols[currency] || ""}${
                  sub.price
                } ${formatBillingCycle(sub.billingCycle)}`}
                onClick={() => openModal(sub)}
                isRemoving={removingId === sub.id}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-screen min-h-screen viewport">
      {subscriptions?.length == 0 ? (
        <NoData />
      ) : (
        <>
          <Header showIcons={true} title={t("renewly")} isAppTitle={true} />
          {totaSummary}
          <div className="overflow-x-auto whitespace-nowrap px-4 py-2">
            <div className="flex space-x-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => openModal(sub)}
                  className={`inline-block min-w-[150px] bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-4 shadow cursor-pointer ${
                    sub.status === "cancelled" ? "opacity-50 grayscale" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={sub.icon}
                      alt={sub.name}
                      className="w-8 h-8 rounded"
                    />
                    <span className="font-semibold">{sub.name}</span>
                  </div>
                  <p className="text-xs truncate max-w-[120px]">
                    {renderRenewInfo(sub.renewalDate)}
                  </p>
                  <p className="text-sm font-bold mt-1">
                    {currencySymbols[currency] || ""}
                    {sub.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-4">
            <h3 className="text-lg font-semibold mb-3">
              {t("most_expensive")}
            </h3>
            <div className="grid gap-4">
              {subscriptions
                .slice()
                .sort((a, b) => {
                  const normalize = (sub) => {
                    const price =
                      parseFloat(
                        sub.price.toString().replace(/[^0-9.]/g, "")
                      ) || 0;
                    const cycle = (sub.billingCycle || "").toLowerCase();
                    if (cycle.includes("month")) return price * 12;
                    if (cycle.includes("week")) return price * 52;
                    return price;
                  };
                  return normalize(b) - normalize(a);
                })
                .slice(0, 1)
                .map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center bg-white rounded-lg shadow p-3"
                  >
                    <img
                      src={sub.icon}
                      alt={sub.name}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-sm text-gray-500">
                        {renderRenewInfo(sub.renewalDate)}
                      </p>
                    </div>
                    <span className="font-bold">
                      {currencySymbols[currency] || ""}
                      {sub.price}
                      <span className="ml-1 text-xs text-gray-400">
                        /{sub.billingCycle}
                      </span>
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {currentSubscriptionsList}

          <FooterTab />
        </>
      )}
      <SubscriptionModal
        isOpen={open}
        onClose={(deleted) => closeModal(deleted, selectedSub?.id)}
        subscription={selectedSub}
      />
    </div>
  );
};

export default Home;
