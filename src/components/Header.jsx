import { FiBarChart } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <div className="avatar"></div>
      </div>
      <div className="right">
        <FiBarChart />
        <IoSettingsOutline />
      </div>
    </header>
  );
};

export default Header;
