import React, { useState } from 'react';
import { streamingApps, musicApps, gameApps } from '../utils/data';

const allApps = [...streamingApps, ...musicApps, ...gameApps];

const AddSubscription = ({ onAppSelect }) => {
  const [search, setSearch] = useState('');

  const filteredApps = allApps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-sm mx-auto bg-[#f8f4f1] p-4 rounded-lg shadow-sm">
      <h2 className="text-center text-xl font-bold mb-4">Add Subscription</h2>
      
      <input
        type="text"
        placeholder="Streaming, Music, Games and More..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Streaming */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Streaming</h3>
        <ul className="list-none p-0">
          {streamingApps.map(app => (
            <li
              key={app.name}
              className="flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => onAppSelect(app)}
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

      {/* Music */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Music Apps</h3>
        <ul className="list-none p-0">
          {musicApps.map(app => (
            <li
              key={app.name}
              className="flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => onAppSelect(app)}
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

      {/* Games */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Game Apps</h3>
        <ul className="list-none p-0">
          {gameApps.map(app => (
            <li
              key={app.name}
              className="flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => onAppSelect(app)}
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
    </div>
  );
};

export default AddSubscription;