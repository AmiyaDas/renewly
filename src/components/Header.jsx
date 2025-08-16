import { FiBarChart } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const Header = ({
  showNavBack = false,
  title = "",
  showIcons = false,
  isAppTitle = false,
}) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="left">
        {showNavBack && <FaChevronLeft onClick={() => navigate(-1)} />}
      </div>

      <div className={"center title" + (isAppTitle ? " app-title" : "")}>
        {title}
      </div>
      <div className="right">
        {showIcons && (
          <div className="icons">
            <FiBarChart />
             <Link to="/settings">
              <IoSettingsOutline />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
