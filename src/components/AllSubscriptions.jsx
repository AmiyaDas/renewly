import Header from "./Header";
import { useState, useEffect, useContext } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { useTranslation } from "react-i18next";
import { PreferencesContext } from "../context/PreferencesContext";
import { currencySymbols, formatBillingCycle } from "../utils/utils";

// list of all current subscriptions
const AllSubscriptions = () => {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState([]);
  const { currency } = useContext(PreferencesContext);

  useEffect(() => {
    const subs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("subscription_")) {
        try {
          const sub = JSON.parse(localStorage.getItem(key));
          subs.push(sub);
        } catch (e) {
          console.error("Error parsing subscription:", e);
        }
      }
    }
    setSubscriptions(subs);
  }, []);

  const allSubs = (
    <div className="subscriptions-list">
      {subscriptions.map((sub) => {
        const daysLeft = (() => {
          if (!sub.renewalDate) return null;
          const today = new Date();
          const renew = new Date(sub.renewalDate);
          const diffTime = renew - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays >= 0 ? diffDays : 0;
        })();
        return (
          <SubscriptionCard
            key={sub.id}
            name={sub.name}
            renewDate={sub.renewalDate}
            daysLeft={daysLeft}
            icon={sub.icon}
            price={`${currencySymbols[currency] || ""}${
              sub.price
            } ${formatBillingCycle(sub.billingCycle)}`}
          />
        );
      })}
    </div>
  );
  return (
    <div className="w-screen min-h-screen viewport">
      <Header
        showNavBack={true}
        title={t("all_subscriptions")}
        showIcons={true}
      />
      <div className="subscriptions">{allSubs}</div>
    </div>
  );
};

export default AllSubscriptions;
