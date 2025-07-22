// src/components/Leaderboard.jsx
import React from 'react';
import UserCard from './UserCard';
import '../App.css'; // For basic styling

const Leaderboard = ({ users }) => {
    // Separate top 3 for special styling based on the image UI
    const topUsers = users.slice(0, 3);
    const otherUsers = users.slice(3);

    return (
        <div className="leaderboard-container">
            {/* Top 3 Section - styled like the image */}
            <div className="top-three-section">
                {/* Render top 3 users in specific order (2nd, 1st, 3rd) as per image */}
                {topUsers[1] && ( // Check if 2nd user exists
                    <div key={topUsers[1].id} className="top-user-spot top-2">
                        <div className="rank-badge">{topUsers[1].rank}</div>
                        <img
                            src={topUsers[1].avatar || `https://placehold.co/70x70/cccccc/000000?text=${topUsers[1].name.charAt(0)}`}
                            alt={topUsers[1].name}
                            className="top-user-avatar"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/70x70/cccccc/000000?text=${topUsers[1].name.charAt(0)}`; }}
                        />
                        <div className="top-user-name">{topUsers[1].name}</div>
                        <div className="top-user-points">{topUsers[1].totalPoints.toLocaleString()} <span className="point-icon">◎</span></div>
                    </div>
                )}
                {topUsers[0] && ( // Check if 1st user exists
                    <div key={topUsers[0].id} className="top-user-spot top-1">
                        <div className="rank-badge">{topUsers[0].rank}</div>
                        <img
                            src={topUsers[0].avatar || `https://placehold.co/80x80/cccccc/000000?text=${topUsers[0].name.charAt(0)}`}
                            alt={topUsers[0].name}
                            className="top-user-avatar"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/cccccc/000000?text=${topUsers[0].name.charAt(0)}`; }}
                        />
                        <div className="top-user-name">{topUsers[0].name}</div>
                        <div className="top-user-points">{topUsers[0].totalPoints.toLocaleString()} <span className="point-icon">◎</span></div>
                    </div>
                )}
                {topUsers[2] && ( // Check if 3rd user exists
                    <div key={topUsers[2].id} className="top-user-spot top-3">
                        <div className="rank-badge">{topUsers[2].rank}</div>
                        <img
                            src={topUsers[2].avatar || `https://placehold.co/70x70/cccccc/000000?text=${topUsers[2].name.charAt(0)}`}
                            alt={topUsers[2].name}
                            className="top-user-avatar"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/70x70/cccccc/000000?text=${topUsers[2].name.charAt(0)}`; }}
                        />
                        <div className="top-user-name">{topUsers[2].name}</div>
                        <div className="top-user-points">{topUsers[2].totalPoints.toLocaleString()} <span className="point-icon">◎</span></div>
                    </div>
                )}
            </div>

            {/* General Leaderboard List (for ranks 4+) */}
            <div className="leaderboard-list">
                {otherUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;