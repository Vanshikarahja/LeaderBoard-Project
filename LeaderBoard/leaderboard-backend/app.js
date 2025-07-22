// app.js
// ===== 1. Imports and Setup =====
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config(); // Load environment variables from .env file

// Import models
const User = require('./models/User');
const History = require('./models/History');

const app = express();

// Enable CORS for all origins. In a production app, you might restrict this to your frontend's origin.
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// ===== 2. Connect to MongoDB =====
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error: ' + err));

// ===== 3. API Routes =====

// Route to initialize (seed) 10 users
// ⚠️ IMPORTANT: Run this route ONCE to populate your database.
// You can remove or comment it out after initial setup.
app.post('/api/init', async (req, res) => {
  try {
    // Clear existing users and history to start fresh (optional, for development)
    await User.deleteMany({});
    await History.deleteMany({});

    const users = [
      { name: 'Rahul' },
      { name: 'Kamal' },
      { name: 'Sanak' },
      { name: 'Aarav' },
      { name: 'Meera' },
      { name: 'Vanshika' },
      { name: 'Yash' },
      { name: 'Tanya' },
      { name: 'Rohan' },
      { name: 'Anika' }
    ];

    await User.insertMany(users);
    res.status(200).send('✅ 10 users inserted successfully!');
  } catch (err) {
    console.error('❌ Error inserting users:', err);
    res.status(500).send('❌ Error inserting users: ' + err.message);
  }
});

// Get all users (Leaderboard)
// Sorts by totalPoints in descending order
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).send('❌ Error fetching users: ' + err.message);
  }
});

// Add a new user
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'User name is required.' });
  }
  try {
    const user = new User({ name });
    await user.save();
    res.status(201).json(user); // Respond with the newly created user
  } catch (err) {
    console.error('❌ Error adding new user:', err);
    res.status(500).send('❌ Error adding new user: ' + err.message);
  }
});

// Claim points for a user
app.post('/api/claim', async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    // Generate random points between 1 and 10
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    // Find user and update totalPoints
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: randomPoints } }, // Increment totalPoints
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create a history entry for the claim
    await new History({ userId: user._id, points: randomPoints }).save();

    // Respond with the updated user and the points claimed
    res.json({ user, points: randomPoints });
  } catch (err) {
    console.error('❌ Error claiming points:', err);
    res.status(500).send('❌ Error claiming points: ' + err.message);
  }
});

// Get claim history
// Sorts by timestamp descending, and populates userId to get user name
app.get('/api/history', async (req, res) => {
  try {
    // Limit to last 50 entries for performance, adjust as needed
    const history = await History.find().sort({ timestamp: -1 }).limit(50).populate('userId', 'name');
    res.json(history);
  } catch (err) {
    console.error('❌ Error fetching history:', err);
    res.status(500).send('❌ Error fetching history: ' + err.message);
  }
});

// ===== 4. Start Server =====
const PORT = process.env.PORT || 3001; // Use port from .env or default to 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB URL: ${process.env.MONGO_URL ? 'Connected' : 'Not Provided'}`);
});
