import { FaPlus } from "react-icons/fa";

const NoData = () => {
  return (
    <div className="no-data-container">
      <div className="w-80 rounded-2xl border border-orange-200 bg-peach-50 shadow-md p-6 flex flex-col items-center space-y-6">
        {/* Circular icons */}
        <div className="flex flex-wrap justify-center gap-4 max-w-[220px]">
          {/* Example icons (replace with actual logos or <img />) */}
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/icons/youtube.png" alt="YouTube" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/icons/netflix.png" alt="Netflix" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/icons/youtube_music.png" alt="YouTube Music" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/icons/jiohotstar.png" alt="Jio Hotstar" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/icons/appletv.webp" alt="Apple TV" />
          </div>
          <div className="w-12 h-12 rounded-full object-cover">
            <img src="/icons/crunchyroll_logo.webp" alt="CrunchyRoll" />
          </div>

          <div className="w-18 h-18 rounded-full object-cover">
            <img src="/icons/prime.webp" alt="Amazon Prime" />
          </div>
        </div>

        {/* Text */}
        <p className="text-center text-gray-700 text-sm">
          Get started and watch <br /> the magic organise itself.
        </p>

        {/* Button */}
        <button className="w-full flex items-center justify-center space-x-2 rounded-xl bg-black text-white py-3 font-medium">
          <FaPlus size={20} />
          <span>Add Subscription</span>
        </button>
      </div>
    </div>
  );
};

export default NoData;
