import { FiBarChart } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";

const Header = ({ showNavBack = false, title = "", showIcons = true }) => {
  return (
    <header className="header">
      <div className="left">{showNavBack && <FaChevronLeft />}</div>

      <div className="center title">{title}</div>
      <div className="right">
        {showIcons && (
          <div className="icons">
            <FiBarChart />
            <IoSettingsOutline />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
