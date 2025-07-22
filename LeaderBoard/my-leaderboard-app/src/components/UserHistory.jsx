// src/components/UserHistory.jsx
import React from 'react';
import '../App.css';

const UserHistory = ({ history }) => {
    return (
        <div className="user-history-container">
            <h3>Claim History</h3>
            {history.length === 0 ? (
                <p>No claim history yet.</p>
            ) : (
                <ul className="history-list">
                    {history.map(entry => (
                        <li key={entry.id} className="history-item">
                            <span className="history-user">{entry.userName}</span> claimed{' '}
                            <span className="history-points">{entry.points.toLocaleString()}</span> points at{' '}
                            <span className="history-timestamp">{new Date(entry.timestamp).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserHistory;