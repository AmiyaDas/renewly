import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa";

const SubscriptionCard = ({
  name,
  renewDate,
  daysLeft,
  icon,
  price,
  onClick,
  isRemoving,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`subscription-card ${isRemoving ? 'fade-out-card' : ''}`} onClick={onClick}>
      <div className="sub-left">
        <div className="logo-wrapper">
          <img src={icon} alt={name} />
        </div>
        <div className="sub-details">
          <span className="sub-name">{name}</span>
          <span className="sub-info">
            {t("renew_info", { daysLeft, renewDate })}
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
