import Header from "./Header";
import FooterTab from "./FooterTab";
import { FaChevronRight } from "react-icons/fa";
import HomeChart from "./HomeChart";
import { useState, useEffect } from "react";
import NoData from "./NoData";
import { Link } from "react-router-dom";
import SubscriptionCard from "./SubscriptionCard";

const Home = () => {
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
          // ignore parsing errors
        }
      }
    }
    setSubscriptions(subs);
  }, []);

  const totalYearly = subscriptions.reduce((total, sub) => {
    let yearlyPrice = 0;
    if (typeof sub.price === "string") {
      // Remove currency symbol and commas, parse float
      const priceNum = parseFloat(sub.price.replace(/[^0-9.]/g, ""));
      if (sub.billingCycle === "monthly") {
        yearlyPrice = priceNum * 12;
      } else if (sub.billingCycle === "yearly") {
        yearlyPrice = priceNum;
      } else {
        yearlyPrice = priceNum;
      }
    } else if (typeof sub.price === "number") {
      if (sub.billingCycle === "monthly") {
        yearlyPrice = sub.price * 12;
      } else if (sub.billingCycle === "yearly") {
        yearlyPrice = sub.price;
      } else {
        yearlyPrice = sub.price;
      }
    }
    return total + yearlyPrice;
  }, 0);

  const totalYearlyFormatted = `₹ ${totalYearly.toFixed(2)}`;

  const totaSummary = (
    <div className="summary-header">
      <div className="stats-item">
        <span className="stats-icon">💰</span>
        <div className="stats-text">
          <div className="stats-label">Total Yearly</div>
          <div className="stats-value">{totalYearlyFormatted}</div>
        </div>
      </div>

      <div className="stats-item">
        <span className="stats-icon">🔥</span>
        <div className="stats-text">
          <div className="stats-label">Active</div>
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
          <h2>All Subscriptions</h2>
          <FaChevronRight size={20} />
        </div>
      </Link>
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
    </div>
  );

  return (
    <div className="w-screen min-h-screen viewport">
      {subscriptions?.length == 0 ? (
        <NoData />
      ) : (
        <>
          <Header showIcons={true} title="Renewly" isAppTitle={true} />
          {totaSummary}
          {/* <HomeChart /> */}
          {currentSubscriptionsList}

          <FooterTab />
        </>
      )}
    </div>
  );
};

export default Home;
