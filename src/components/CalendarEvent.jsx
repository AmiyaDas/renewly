import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CalendarEvent = ({ title, renewDate, daysLeft, icon, price }) => {
  const { t } = useTranslation();

  return (
    <div className="subscription-card">
      <div className="sub-left">
        <div className="logo-wrapper">
          <img src={icon} alt={title} />
        </div>
        <div className="sub-details">
          <span className="sub-name">{title}</span>
          <span className="sub-info">
            {daysLeft < 0 ? t("renew_overdue") : t("renew_info", { daysLeft })}
          </span>
        </div>
      </div>
      <div className="sub-right">
        <span className="sub-price">{price}</span>
        {
          // later add this to enable delete and cancelled operations from here as well
          /* <FaChevronRight size={20} /> */
        }
      </div>
    </div>
  );
};

export default CalendarEvent;
