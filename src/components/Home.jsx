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
import {
  currencySymbols,
  totalYearlyFormatted,
  formatBillingCycle,
  renewInfo,
} from "../utils/utils";
import FlipTile from "./FlipTile";

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

  useEffect(() => {
    const subs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("subscription_")) {
        try {
          const sub = JSON.parse(localStorage.getItem(key));
          // if (!sub.status || sub.status !== "cancelled") {
          subs.push(sub);
          // }
        } catch (e) {
          // ignore parsing errors
        }
      }
    }
    setSubscriptions(subs);
  }, []);
  const totalYearlyValue = totalYearlyFormatted(currency, subscriptions);

  const totaSummary = (
    <div className="summary-header">
      <div className="stats-item">
        <span className="stats-icon">💰</span>
        <div className="stats-text">
          <div className="stats-label">{t("total_yearly")}</div>
          <div className="stats-value">{totalYearlyValue}</div>
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
                <FlipTile
                  key={sub.id}
                  name={sub.name}
                  price={sub.price}
                  renewalDate={sub.renewalDate}
                  icon={sub.icon}
                  status={sub.status}
                />
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
                    className="flex items-center bg-white dark:bg-gray-900 rounded-lg shadow p-3"
                  >
                    <img
                      src={sub.icon}
                      alt={sub.name}
                      className="w-10 h-10 rounded mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-sm text-gray-500">
                        {t("renews_on", renewInfo(sub.renewalDate))}
                      </p>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {currencySymbols[currency] || ""}
                      {sub.price}
                      <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">
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
