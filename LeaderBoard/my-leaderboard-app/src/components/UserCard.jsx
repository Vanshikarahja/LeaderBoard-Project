// src/components/UserCard.jsx
import React from 'react';
import '../App.css'; // For basic styling

const UserCard = ({ user }) => {
    const { rank, name, totalPoints, avatar } = user;
    return (
        <div className="user-card">
            <div className="user-rank">{rank}</div>
            <div className="user-avatar-name">
                {/* Use a placeholder image if avatar is not provided or fails to load */}
                <img
                    src={avatar || `https://placehold.co/40x40/cccccc/000000?text=${name.charAt(0)}`}
                    alt={name}
                    className="avatar"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/cccccc/000000?text=${name.charAt(0)}`; }}
                />
                <span className="user-name">{name}</span>
            </div>
            <div className="user-points">
                {totalPoints.toLocaleString()} <span className="point-icon">◎</span>
            </div>
        </div>
    );
};

export default UserCard;