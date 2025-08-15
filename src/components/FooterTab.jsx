import { GoHomeFill } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterTab = () => {
  return (
    <footer className="footer">
      <div className="footer-icon active">
        <GoHomeFill />
      </div>
      <div className="plus-btn">
        <Link to="/add">
          <FaPlus size={28} strokeWidth={2.5} color="white" />
        </Link>
      </div>
      <div className="footer-icon">
        <FaRegCalendarCheck />
      </div>
    </footer>
  );
};

export default FooterTab;
