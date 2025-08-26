import { GoHomeFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterTab = () => {
  return (
    <footer className="footer rounded-xl">
      <div className="footer-icon active">
        <GoHomeFill />
      </div>
      <div className="plus-btn">
        <Link to="/add">
          <FaPlus size={28} strokeWidth={2.5} />
        </Link>
      </div>
      <div className="footer-icon">
        <Link to="/calendar">
          <FaRegCalendarCheck />
        </Link>
      </div>
    </footer>
  );
};

export default FooterTab;
