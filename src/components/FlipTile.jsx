import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { PreferencesContext } from "../context/PreferencesContext";
import { currencySymbols, renewInfo } from "../utils/utils";

const FlipTile = ({ name, icon, renewalDate, price, status }) => {
  const { t } = useTranslation();
  const { currency } = useContext(PreferencesContext);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className={`inline-block min-w-[150px] cursor-pointer ${
        status && status === "cancelled" ? "opacity-50 grayscale" : ""
      }`}
    >
      <div
        className={`home-tile rounded-lg shadow relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute [backface-visibility:hidden] bg-[url('/your-image.jpg')] bg-cover bg-center">
          {/* <img src={icon} alt={name} className="w-full h-full object-fill" /> */}
        </div>

        {/* Back */}
        <div className="[transform:rotateY(180deg)] [backface-visibility:hidden] p-4">
          <div className="flex items-center space-x-2 mb-2">
            <img src={icon} alt={name} className="w-8 h-8 rounded" />
            <span className="font-semibold overflow-hidden">{name}</span>
          </div>
          <p className="text-xs truncate max-w-[120px]">
            {t("renews_on", renewInfo(renewalDate))}
          </p>
          <p className="text-sm font-bold mt-1">
            {currencySymbols[currency] || ""}
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlipTile;
