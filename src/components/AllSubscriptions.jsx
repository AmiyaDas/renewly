import Header from "./Header";
import { useState, useEffect } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { useTranslation } from "react-i18next";

const AllSubscriptions = () => {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState([]);
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
      {subscriptions.map((sub) => (
        <SubscriptionCard
          key={sub.id}
          name={sub.name}
          renewDate={sub.renewDate}
          daysLeft={sub.daysLeft}
          icon={sub.icon}
          price={sub.price}
        />
      ))}
    </div>
  );
  return (
    <div className="w-screen min-h-screen viewport">
      <Header showNavBack={true} title={t("all_subscriptions")} showIcons={true} />
      <div className="subscriptions">{allSubs}</div>
    </div>
  );
};

export default AllSubscriptions;
