import Header from "./Header";
import FooterTab from "./FooterTab";
import { currentSubscriptions } from "../utils/data";
import { FaChevronRight } from "react-icons/fa";

const totaSummary = (
  <div className="summary-header">
    <div className="stats-item">
      <span className="stats-icon">💰</span>
      <div className="stats-text">
        <div className="stats-label">Total Yearly</div>
        <div className="stats-value">₹ 11,676.00</div>
        {/* make the data dynamic */}
      </div>
    </div>

    <div className="stats-item">
      <span className="stats-icon">🔥</span>
      <div className="stats-text">
        <div className="stats-label">Active</div>
        <div className="stats-value">03</div>
        {/* make the data dynamic */}
      </div>
    </div>
  </div>
);

const currentSubscriptionsList = (
  <div className="subscriptions">
    <div className="subscriptions-header">
      <h2>All Subscriptions</h2>
      <FaChevronRight size={20} />
    </div>
    <div className="subscriptions-list">
      {currentSubscriptions.map((sub) => (
        <div className="subscription-card" key={sub.id}>
          <div className="sub-left">
            <div className="logo-wrapper">
              <img src={sub.logo} alt={sub.name} />
            </div>
            <div className="sub-details">
              <span className="sub-name">{sub.name}</span>
              <span className="sub-info">
                Renew in next {sub.daysLeft} days | {sub.renewDate}
              </span>
            </div>
          </div>
          <div className="sub-right">
            <span className="sub-price">{sub.price}</span>
            <FaChevronRight size={20} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div class="viewport">
      <Header />
      {totaSummary}
      {currentSubscriptionsList}
      <FooterTab />
    </div>
  );
};

export default Home;
