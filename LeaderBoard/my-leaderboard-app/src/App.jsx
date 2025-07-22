import React, { useState, useEffect, useCallback } from 'react';
import Leaderboard from './components/Leaderboard';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import UserHistory from './components/UserHistory';
import './App.css'; // Import the main CSS file

// --- API Configuration ---
// IMPORTANT: This should match the port your Node.js backend is running on.
// Based on your app.js, it's likely 3001.
const API_BASE_URL = 'http://localhost:3001/api';

// --- API Functions (Centralized here for clarity) ---

/**
 * Fetches all users from the backend and calculates their ranks.
 * @returns {Array} An array of user objects with `id`, `name`, `totalPoints`, and `rank`.
 */
const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        // Your backend sorts by totalPoints, but doesn't assign 'rank' explicitly.
        // We'll assign rank on the frontend based on the sorted order.
        return users.map((user, index) => ({
            id: user._id, // Map MongoDB _id to 'id' for frontend consistency
            name: user.name,
            totalPoints: user.totalPoints,
            rank: index + 1,
            // Placeholder avatar. User can replace this with actual image paths if available.
            avatar: `https://placehold.co/40x40/cccccc/000000?text=${user.name.charAt(0)}`
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw to be caught by the component
    }
};

/**
 * Calls the backend API to claim points for a specific user.
 * @param {string} userId - The MongoDB _id of the user.
 * @returns {Object} The response from the backend, typically containing the updated user and points claimed.
 */
const claimPointsApi = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/claim`, { // Endpoint is /api/claim
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }), // Backend expects { userId }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Result is { user, points }
        return result;
    } catch (error) {
        console.error('Error claiming points:', error);
        throw error;
    }
};

/**
 * Fetches the claim history from the backend.
 * @returns {Array} An array of history entries.
 */
const fetchHistory = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/history`); // Endpoint is /api/history
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const history = await response.json();
        return history.map(entry => ({
            ...entry,
            id: entry._id, // Map MongoDB _id to 'id' for frontend consistency
            userName: entry.userId ? entry.userId.name : 'Unknown User' // Access name from populated userId
        }));
    } catch (error) {
        console.error('Error fetching history:', error);
        throw error;
    }
};

/**
 * Adds a new user to the backend database.
 * @param {string} name - The name of the new user.
 * @returns {Object} The newly created user object from the backend.
 */
const addUserApi = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, { // Endpoint is /api/users for POST
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }), // Backend expects { name }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};


function App() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [claimMessage, setClaimMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false); // State to toggle history visibility

    // Function to fetch all data (users and history)
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const initialUsers = await fetchUsers();
            setUsers(initialUsers);
            const initialHistory = await fetchHistory();
            setHistory(initialHistory);
        } catch (err) {
            setError('Failed to load initial data. Please ensure your backend is running on http://localhost:3001.');
            console.error('Error fetching initial data:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch initial data on component mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClaimPoints = async () => {
        if (!selectedUserId) {
            setClaimMessage('Please select a user first.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setClaimMessage('');

        try {
            const response = await claimPointsApi(selectedUserId);
            setClaimMessage(`Successfully claimed ${response.points.toLocaleString()} points for ${response.user.name}!`);

            // After claiming points, re-fetch all data to update leaderboard and history
            await fetchData();

        } catch (err) {
            setError(`Failed to claim points: ${err.message}`);
            console.error('Error claiming points:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddUser = async () => {
        const newUser = prompt("Enter new user's name:");
        if (newUser) {
            setIsLoading(true);
            setError(null);
            setClaimMessage('');
            try {
                const addedUser = await addUserApi(newUser);
                setClaimMessage(`Successfully added new user: ${addedUser.name}!`);
                // After adding, re-fetch all data to update the leaderboard and dropdown
                await fetchData();
                setSelectedUserId(addedUser._id); // Select the newly added user
            } catch (err) {
                setError(`Failed to add user: ${err.message}`);
                console.error('Error adding user:', err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Leaderboard</h1>
                <div className="header-controls">
                    <button onClick={handleAddUser} className="add-user-button">Add New User</button>
                    <button onClick={() => setShowHistory(!showHistory)} className="toggle-history-button">
                        {showHistory ? 'Hide History' : 'Show History'}
                    </button>
                </div>
            </header>

            <div className="claim-section">
                <UserSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    onSelectUser={setSelectedUserId}
                />
                <ClaimButton
                    onClick={handleClaimPoints}
                    disabled={isLoading || !selectedUserId}
                />
                {isLoading && <p className="loading-message">Processing...</p>}
                {error && <p className="error-message">{error}</p>}
                {claimMessage && <p className="success-message">{claimMessage}</p>}
            </div>

            {showHistory && (
                <UserHistory history={history} />
            )}

            <Leaderboard users={users} />
        </div>
    );
}

export default App;
