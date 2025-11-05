# MERN + OAuth Image Search App (Unsplash)

This is a full-stack MERN application that allows users to log in using **Google, GitHub, or Facebook**, search for images using the **Unsplash API**, select multiple images, view **Top Search Terms**, and **Personal Search History**.

---

## Features

- OAuth Login (Google, GitHub, Facebook)
- Only authenticated users can search images
- Fetches image results using Unsplash Search API
- Displays results in a responsive 4-column grid
- Multi-select images with a selection counter
- Shows **Top 5 Most Searched Terms** globally
- Shows **User’s Search History**

---

## Tech Stack

| Frontend | React (Vite), Axios |
| Backend | Node.js, Express.js |
| Authentication | Passport.js (OAuth Strategies) |
| Database | MongoDB + Mongoose |
| API | Unsplash Search API |

---

## Folder Structure

project-root/
│
├── server/ # Backend (Node + Express + Passport)
│ ├── config/ # OAuth strategy configs
│ ├── models/ # User + SearchHistory schemas
│ ├── routes/ # Authentication & API routes
│ └── server.js # Server entry file
│
└── client/ # Frontend (React Vite)
├── src/
│ ├── components/ # UI Components
│ ├── pages/ # Page views
│ └── App.jsx # Root component
└── index.css # Basic Styling

CLIENT_URL=http://localhost:5173


## Installation & Setup

### Backend Setup
cd server
npm install
npm start

shell
Copy code

### Frontend Setup
cd client
npm install
npm run dev

> Make sure Backend runs on **http://localhost:3000**  
> And Frontend runs on **http://localhost:5173**


## API Endpoints

### **Auth Routes**
| Method | Route | Description |
|--------|--------|-------------|
| GET | `/auth/google` | Login with Google |
| GET | `/auth/github` | Login with GitHub |
| GET | `/auth/facebook` | Login with Facebook |
| GET | `/auth/logout` | Logout user |

### **Search Images**
POST /api/search
Body: { "term": "nature" }

### **Top Search Terms**
GET /api/top-searches

### **User Search History**
GET /api/history

---

## Example cURL Requests

### Get Top Searches
curl http://localhost:3000/api/top-searches

### Search Images
curl -X POST http://localhost:3000/api/search
-H "Content-Type: application/json"
-d '{"term": "flowers"}'

### Get User Search History (Requires Auth Cookie)
curl --cookie "connect.sid=your_session_cookie" http://localhost:3000/api/history

---
