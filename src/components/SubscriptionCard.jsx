import { FaChevronRight } from "react-icons/fa";

const SubscriptionCard = ({
  name,
  renewDate,
  daysLeft,
  icon,
  price,
  onClick,
}) => {
  return (
    <div className="subscription-card" onClick={onClick}>
      <div className="sub-left">
        <div className="logo-wrapper">
          <img src={icon} alt={name} />
        </div>
        <div className="sub-details">
          <span className="sub-name">{name}</span>
          <span className="sub-info">
            Renew in next {daysLeft} days | {renewDate}
          </span>
        </div>
      </div>
      <div className="sub-right">
        <span className="sub-price">{price}</span>
        <FaChevronRight size={20} />
      </div>
    </div>
  );
};
export default SubscriptionCard;
