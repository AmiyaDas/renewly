import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { streamingApps, musicApps, gameApps, otherApps } from "../utils/data";
import Header from "./Header";
import { useTranslation } from "react-i18next";
const LoadingScreen = React.lazy(() => import("./LoadingScreen"));

const allApps = [...streamingApps, ...musicApps, ...gameApps];

const AddSubscription = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [streamingAppsList, setStreamingAppsList] = useState(streamingApps);
  const [musicAppsList, setMusicAppsList] = useState(musicApps);
  const [gameAppsList, setGameAppsList] = useState(gameApps);
  const [otherAppsList, setOtherAppsList] = useState(otherApps);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5 seconds, adjust as needed
    return () => clearTimeout(timer);
  }, []);

  const filterSubscriptions = (searchText) => {
    setSearch(searchText);
    const filteredStreaming = streamingApps.filter((app) =>
      app.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredMusic = musicApps.filter((app) =>
      app.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredGames = gameApps.filter((app) =>
      app.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredOthers = otherApps.filter((app) =>
      app.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setOtherAppsList(filteredOthers);
    setStreamingAppsList(filteredStreaming);
    setMusicAppsList(filteredMusic);
    setGameAppsList(filteredGames);
  };

  const handleSelect = (app) => {
    // Navigate to another component/page, passing app data
    navigate(`/subscription/${app.name}`, { state: app });
  };

  const renderList = (title, apps) => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 px-4">{title}</h3>
      <ul className="list-none p-0">
        {apps.map((app) => (
          <li
            key={app.name}
            className="flex items-center px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleSelect(app)}
          >
            <img
              src={app.icon}
              alt={app.name}
              className="w-10 h-10 mr-4 rounded-lg"
            />
            <span className="flex-1 text-lg">{app.name}</span>
            <span className="text-2xl text-gray-400">&rsaquo;</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      {!loading && (
        <div className="w-screen h-screen flex flex-col">
          <Header showNavBack={true} title={t("add_subscription")} />

          {/* Search */}
          <div className="p-4">
            <input
              type="text"
              placeholder={t("search_apps")}
              value={search}
              onChange={(e) => filterSubscriptions(e.target.value)}
              className="w-full p-2 bg-white rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* List (scrollable) */}
          <div className="flex-1 overflow-y-auto pb-6 bg-white">
            {streamingAppsList.length ? (
              renderList(t("streaming"), streamingAppsList)
            ) : (
              <></>
            )}
            {musicAppsList.length ? (
              renderList(t("music_apps"), musicAppsList)
            ) : (
              <></>
            )}
            {gameAppsList.length ? (
              renderList(t("game_apps"), gameAppsList)
            ) : (
              <></>
            )}
            {otherAppsList.length ? (
              renderList(t("other_apps"), otherAppsList)
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddSubscription;
