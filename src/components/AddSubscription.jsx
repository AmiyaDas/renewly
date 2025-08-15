import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { streamingApps, musicApps, gameApps } from '../utils/data';

const allApps = [...streamingApps, ...musicApps, ...gameApps];

const AddSubscription = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredApps = allApps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (app) => {
    // Navigate to another component/page, passing app data
    navigate(`/subscription/${app.name}`, { state: app });
  };

  const renderList = (title, apps) => (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 px-4">{title}</h3>
      <ul className="list-none p-0">
        {apps.map(app => (
          <li
            key={app.name}
            className="flex items-center px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleSelect(app)}
          >
            <img src={app.icon} alt={app.name} className="w-10 h-10 mr-4 rounded-lg" />
            <span className="flex-1 text-lg">{app.name}</span>
            <span className="text-2xl text-gray-400">&rsaquo;</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-[#f8f4f1] flex flex-col">
      {/* Header */}
      <div className="p-4 bg-white shadow">
        <h2 className="text-center text-xl font-bold">Add Subscription</h2>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* List (scrollable) */}
      <div className="flex-1 overflow-y-auto pb-6">
        {renderList('Streaming', streamingApps)}
        {renderList('Music Apps', musicApps)}
        {renderList('Game Apps', gameApps)}
      </div>
    </div>
  );
};

export default AddSubscription;