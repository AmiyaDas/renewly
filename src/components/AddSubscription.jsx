import React, { useState } from 'react';
import streamingApps from '../utils/data';
// Example data for streaming apps


const AddSubscription = ({ onAppSelect }) => {
    const [search, setSearch] = useState('');

    const filteredApps = streamingApps.filter(app =>
        app.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', background: '#f8f4f1', padding: 16 }}>
            <h2 style={{ textAlign: 'center' }}>Add Subscription</h2>
            <input
                type="text"
                placeholder="Streaming, Music, Games and More..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: 10,
                    marginBottom: 16,
                    borderRadius: 8,
                    border: '1px solid #ddd',
                    fontSize: 16
                }}
            />
            <div>
                <h3>Streaming</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredApps.map(app => (
                        <li
                            key={app.name}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 0',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer'
                            }}
                            onClick={() => onAppSelect(app)}
                        >
                            <img
                                src={app.icon}
                                alt={app.name}
                                style={{ width: 40, height: 40, marginRight: 16, borderRadius: 8 }}
                            />
                            <span style={{ flex: 1, fontSize: 18 }}>{app.name}</span>
                            <span style={{ fontSize: 24, color: '#bbb' }}>&#8250;</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Music Apps</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {filteredApps.map(app => (
                        <li
                            key={app.name}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 0',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer'
                            }}
                            onClick={() => onAppSelect(app)}
                        >
                            <img
                                src={app.icon}
                                alt={app.name}
                                style={{ width: 40, height: 40, marginRight: 16, borderRadius: 8 }}
                            />
                            <span style={{ flex: 1, fontSize: 18 }}>{app.name}</span>
                            <span style={{ fontSize: 24, color: '#bbb' }}>&#8250;</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddSubscription;