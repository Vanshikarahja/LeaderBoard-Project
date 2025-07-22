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


### 📦 `leaderboard-backend/`

models/
├── User.js
└── History.js

.env # MongoDB URI, PORT
app.js # Main entry point
package.json



---

## 🚀 Getting Started

### 🔙 Backend Setup

1. Navigate to the backend folder:
   
   cd leaderboard-backend
   
2.Install dependencies:
    
 npm install express mongoose cors dotenv

3.Set up your .env file:

 MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaderboard_db
PORT=5000

4.Run the server
  node app.js

  Server running on port 3001


🔜 Frontend Setup
1.Navigate to the frontend folder:
    ```bash
   cd myleaderboard-app


2.Install dependencies:
  npm install

3.Run the app: 
  npm run dev
frontend runs on http://localhost:5173


🔌 API Endpoints
Base URL: http://localhost:5000

Method	Endpoint	Description
POST	/api/users	Add a new user
GET	/api/users	Get all users
POST	/api/claim/:userId	Claim random points for a user
GET	/api/history/:userId	Get point history of a user

Test your APIs with Postman.



📦 Dependencies Used
1. Backend
   npm install express mongoose cors dotenv
2.Frontend
   npm create vite@latest my-leaderboard-app
   npm install
   npm install axios
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p



🧩 Components Breakdown
   UserSelector.jsx: Dropdown to select a user

   ClaimButton.jsx: Random point generator

   Leaderboard.jsx: Displays sorted users

   UserCard.jsx: Displays each user's data

   UserHistory.jsx: Shows claimed points history


📸 Preview

![Leaderboard UI](./preview.png)


👤 Author
Vanshika Raheja
🔗 [LinkedIn Profile](https://www.linkedin.com/in/vanshika-raheja-21095b281/)



   

    



















