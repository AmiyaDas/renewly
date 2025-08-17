import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NoData = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="no-data-container">
      <div className="w-80 rounded-2xl border border-orange-200 bg-peach-50 shadow-md p-6 flex flex-col items-center space-y-6">
        {/* Circular icons */}
        <div className="flex flex-wrap justify-center gap-4 max-w-[220px]">
          {/* Example icons (replace with actual logos or <img />) */}
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/renewly/icons/youtube.png" alt="YouTube" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/renewly/icons/netflix.png" alt="Netflix" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/renewly/icons/youtube_music.png" alt="YouTube Music" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/renewly/icons/jiohotstar.png" alt="Jio Hotstar" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/renewly/icons/appletv.webp" alt="Apple TV" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/renewly/icons/crunchyroll_logo.webp" alt="CrunchyRoll" />
          </div>

          <div className="w-18 h-18 rounded-full object-cover">
            <img src="/renewly/icons/prime.webp" alt="Amazon Prime" />
          </div>
        </div>

        {/* Text */}
        <p className="text-center text-gray-700 text-sm">
          {t("no_data_message")}
        </p>

        {/* Button */}
        <button
          className="w-full flex items-center justify-center space-x-2 rounded-xl bg-black text-white py-3 font-medium"
          onClick={() => navigate("/add")}
        >
          <FaPlus size={20} />
          <span>{t("add_subscription")}</span>
        </button>
      </div>
    </div>
  );
};

export default NoData;
