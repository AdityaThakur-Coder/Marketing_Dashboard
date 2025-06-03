# 📊 Marketing Dashboard - Lead Management System

A full-stack web application built for managing and tracking marketing leads. Developed as part of a full-stack developer assessment. Features a responsive dashboard, lead analytics, and an interactive table for managing lead data with a MySQL backend.

## 🔗 Live Demo

[Live Demo](https://marketing-lead-dashboard.netlify.app/)

---

## ✨ Features

### 🔧 Backend (Express + MySQL)
- Add and fetch leads from MySQL database
- CORS enabled for frontend-backend connection
- API routes for GET and POST
- Handles lead data: name, email, score, status, source

### 🖥️ Frontend (React + Axios)
- Responsive dashboard layout with stats & charts
- Lead submission form
- Table view for all leads
- Filters for lead status
- Axios-based API integration
- Custom styling using CSS

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MySQL

> Create a database named `crm_dashboard`. The table will be auto-created when you post data.

---

### Backend Setup

```bash
cd backend
npm install
node index.js

Frontend Setup
cd frontend
npm install
npm run dev

Frontend Configuration
Create a .env file in the frontend root:

env
VITE_BACKEND_URL=http://localhost:3000
App runs on: http://localhost:5173

🔍 API Endpoints
| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /api/leads | Get all leads  |
| POST   | /api/leads | Add a new lead |

📸 Screenshots
✅ Dashboard View

![image](https://github.com/user-attachments/assets/06c45cd4-ebc8-4a22-b713-480b78c9ea82)

📦 Deployment
Backend recommended on Render

Frontend deployed on Netlify

Ensure CORS is enabled on backend

Make sure backend supports HTTPS if frontend is deployed on HTTPS (Netlify)

🛠️ Tools & Libraries
React (Vite)

Express.js

MySQL

Axios

Netlify (Frontend Deployment)

Render (Backend Deployment)


