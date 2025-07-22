// src/api/index.js

let usersData = [
    { id: 'user1', name: 'Swetambari', totalPoints: 10229695, rank: 1, avatar: '/assets/swetambari.png' },
    { id: 'user2', name: 'Shyla', totalPoints: 10005725, rank: 2, avatar: '/assets/shyla.png' },
    { id: 'user3', name: 'Global KING', totalPoints: 9444665, rank: 3, avatar: '/assets/global_king.png' },
    { id: 'user4', name: 'Ashok', totalPoints: 8040750, rank: 4, avatar: '/assets/ashok.png' },
    { id: 'user5', name: 'Abhishek', totalPoints: 8024750, rank: 5, avatar: '/assets/abhishek.png' },
    { id: 'user6', name: 'Teqir', totalPoints: 8006380, rank: 6, avatar: '/assets/teqir.png' },
    { id: 'user7', name: 'Divine', totalPoints: 8006100, rank: 7, avatar: '/assets/Divine.png' },
    { id: 'user8', name: 'Shree Krishna', totalPoints: 8005795, rank: 8, avatar: '/assets/shreekrishna.png' },
    { id: 'user9', name: 'Devil', totalPoints: 0, rank: 999, avatar: '/assets/devil.png' },
    // Add more dummy users as needed
];

let historyData = []; // To store point claim history

const generateRandomPoints = () => Math.floor(Math.random() * 1000000) + 100000; // Random points between 100,000 and 1,099,999

export const fetchUsers = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            // Sort users by points to determine initial ranks
            const sortedUsers = [...usersData].sort((a, b) => b.totalPoints - a.totalPoints);
            const usersWithRanks = sortedUsers.map((user, index) => ({
                ...user,
                rank: index + 1,
            }));
            usersData = usersWithRanks; // Update the internal usersData
            resolve([...usersData]); // Return a copy
        }, 300);
    });
};

export const claimPointsApi = async (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = usersData.findIndex(user => user.id === userId);
            if (userIndex === -1) {
                return reject(new Error('User not found'));
            }

            const pointsClaimed = generateRandomPoints();
            usersData[userIndex].totalPoints += pointsClaimed;

            // Update ranks after points are claimed
            const sortedUsers = [...usersData].sort((a, b) => b.totalPoints - a.totalPoints);
            usersData = sortedUsers.map((user, index) => ({
                ...user,
                rank: index + 1,
            }));

            const historyEntry = {
                id: `history_${Date.now()}_${userId}`,
                userId: userId,
                userName: usersData[userIndex].name,
                points: pointsClaimed,
                timestamp: new Date().toISOString(),
            };
            historyData.unshift(historyEntry); // Add to the beginning for most recent first

            resolve({
                userId,
                pointsClaimed,
                newTotalPoints: usersData[userIndex].totalPoints,
                updatedUsers: [...usersData], // Return the updated list for leaderboard refresh
            });
        }, 500); // Simulate API latency
    });
};

export const fetchHistory = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([...historyData]); // Return a copy
        }, 200);
    });
};