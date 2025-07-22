// src/components/UserSelector.jsx
import React from 'react';
import '../App.css';

const UserSelector = ({ users, selectedUserId, onSelectUser }) => {
    return (
        <div className="user-selector">
            <label htmlFor="user-select">Select User:</label>
            <select
                id="user-select"
                value={selectedUserId || ''}
                onChange={(e) => onSelectUser(e.target.value)}
            >
                <option value="" disabled>Choose a user</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserSelector;