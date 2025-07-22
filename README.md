# 🏆 Leaderboard App

A full-stack leaderboard application where users can be added, selected, assigned random points, and dynamically ranked in real-time.

## 🛠 Tech Stack

- **Frontend**: ReactJS (Vite) + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **API Testing**: Postman
- **HTTP Client**: Axios

---

## 📸 Preview



![Leaderboard UI](https://github.com/Vanshikarahja/LeaderBoard-Project/blob/main/preview.png.png?raw=true)
![Leaderboard UI](https://github.com/Vanshikarahja/LeaderBoard-Project/blob/main/preview2.png.png?raw=true)

---

## 📁 Folder Structure

### `leaderboard-frontend/`

```
src/
├── components/
│   ├── Leaderboard.jsx
│   ├── UserCard.jsx
│   ├── UserSelector.jsx
│   ├── ClaimButton.jsx
│   └── UserHistory.jsx
├── App.jsx
├── App.css
└── main.jsx

index.html
vite.config.js
package.json
```

### `leaderboard-backend/`

```
models/
├── User.js
└── History.js

.env              # MongoDB URI, PORT
app.js            # Main server file
package.json
```

---

## 🚀 Getting Started

### 🔙 Backend Setup

1. Go to the backend folder:
   ```bash
   cd leaderboard-backend
   ```

2. Install dependencies:
   ```bash
   npm install express mongoose cors dotenv
   ```

3. Create a `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=30001
   ```

4. Start backend server:
   ```bash
   node app.js
   ```

> Backend running on: `http://localhost:3001`

---

### 🔜 Frontend Setup

1. Go to the frontend folder:
   ```bash
   cd leaderboard-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start frontend:
   ```bash
   npm run dev
   ```

> Frontend running on: `http://localhost:5173`

---

## 🔌 API Endpoints

Base URL: `http://localhost:3001`

| Method | Endpoint               | Description                      |
|--------|------------------------|----------------------------------|
| POST   | `/api/users`           | Add a new user                   |
| GET    | `/api/users`           | Get all users                    |
| POST   | `/api/claim/:userId`   | Assign random points to a user   |
| GET    | `/api/history/:userId` | Get point history for a user     |

> Use **Postman** to test APIs.

---

## 📦 Dependencies

### ✅ Backend

```bash
npm install express mongoose cors dotenv
```

### ✅ Frontend

```bash
npm create vite@latest leaderboard-frontend
npm install
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 🧩 Main Components (Frontend)

| Component       | Purpose                                |
|----------------|----------------------------------------|
| `UserSelector` | Dropdown to select user                |
| `ClaimButton`  | Button to assign random points         |
| `Leaderboard`  | Sorted leaderboard display             |
| `UserCard`     | User’s individual info display         |
| `UserHistory`  | Point claim history for selected user  |

---

## 👤 Author

**Vanshika Raheja**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/vanshika-raheja-21095b281/)

---




   

    



















