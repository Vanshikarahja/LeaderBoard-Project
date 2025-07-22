# 🏆 Leaderboard App

A full-stack leaderboard application where users can be added, selected, assigned random points, and dynamically ranked in real-time.

## 🛠 Tech Stack

- **Frontend**: ReactJS (Vite) + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **API Client**: Postman
- **State & API Handling**: Axios

---

## 📁 Folder Structure

### 📦 `leaderboard-frontend/`

src/
├── components/
│ ├── Leaderboard.jsx
│ ├── UserCard.jsx
│ ├── UserSelector.jsx
│ ├── ClaimButton.jsx
│ └── UserHistory.jsx
├── App.jsx
├── App.css
└── main.jsx

index.html
vite.config.js
package.json

shell
Copy
Edit

### 📦 `leaderboard-backend/`

models/
├── User.js
└── History.js

.env # MongoDB URI, PORT
app.js # Main entry point
package.json

yaml
Copy
Edit

---

## 🚀 Getting Started

### 🔙 Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd leaderboard-backend
Install dependencies:

bash
Copy
Edit
npm install express mongoose cors dotenv
Set up your .env file:

ini
Copy
Edit
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaderboard_db
PORT=5000
Run the server:

bash
Copy
Edit
node app.js
Your backend runs on http://localhost:5000

🔜 Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd leaderboard-frontend
Install dependencies:

bash
Copy
Edit
npm install
Run the app:

bash
Copy
Edit
npm run dev
Your frontend runs on http://localhost:5173

🔌 API Endpoints
Base URL: http://localhost:5000

Method	Endpoint	Description
POST	/api/users	Add a new user
GET	/api/users	Get all users
POST	/api/claim/:userId	Claim random points for a user
GET	/api/history/:userId	Get point history of a user

Test your APIs with Postman.

📦 Dependencies Used
✅ Backend
bash
Copy
Edit
npm install express mongoose cors dotenv
✅ Frontend
bash
Copy
Edit
npm create vite@latest leaderboard-frontend
npm install
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Tailwind configured in:

tailwind.config.js

src/index.css or App.css

🧩 Components Breakdown
UserSelector.jsx: Dropdown to select a user

ClaimButton.jsx: Random point generator

Leaderboard.jsx: Displays sorted users

UserCard.jsx: Displays each user's data

UserHistory.jsx: Shows claimed points history

📸 Preview
md
Copy
Edit
![Leaderboard UI](./preview.png)
👤 Author
Vanshika Raheja
🔗 LinkedIn
