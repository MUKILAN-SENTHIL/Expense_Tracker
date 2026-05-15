# 💰 Expense Tracker

A full-stack personal finance management application built with **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend. Track your income and expenses, visualize spending trends with charts, and export your data to Excel.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)

---

## ✨ Features

- **Authentication** — Register and log in with JWT-based auth; passwords are bcrypt-hashed
- **Profile Photo** — Upload a profile picture (JPEG/PNG); served as a static asset
- **Income Management** — Add income records with emoji icons and source labels; delete entries; download as Excel
- **Expense Management** — Add expense records with emoji icons and category labels; delete entries; download as Excel
- **Dashboard** — Financial overview with summary cards; last-30-days expense bar chart; recent transactions list; income vs expense pie chart; income line chart
- **Excel Export** — Download income or expense history as `.xlsx` files
- **Responsive UI** — Sidebar layout with Tailwind CSS; works on desktop and mobile

---

## 🛠 Tech Stack

### Frontend
| Library | Version | Purpose |
|---|---|---|
| React | ^19.2.4 | UI framework |
| Vite | ^8.0.1 | Build tool & dev server |
| Tailwind CSS | ^4.2.2 | Utility-first styling |
| React Router DOM | ^7.13.2 | Client-side routing |
| Axios | ^1.14.0 | HTTP client |
| Recharts | ^3.8.1 | Charts (bar, line, pie) |
| React Hot Toast | ^2.6.0 | Toast notifications |
| React Icons | ^5.6.0 | Icon library |
| Emoji Picker React | ^4.18.0 | Emoji selector |
| Moment.js | ^2.30.1 | Date formatting |

### Backend
| Package | Version | Purpose |
|---|---|---|
| Express | ^5.2.1 | HTTP server & routing |
| Mongoose | ^9.4.1 | MongoDB ODM |
| bcryptjs | ^3.0.3 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT auth tokens |
| multer | ^2.1.1 | File / image uploads |
| xlsx | ^0.18.5 | Excel file generation |
| cors | ^2.8.6 | Cross-origin requests |
| dotenv | ^17.4.2 | Environment variables |
| nodemon | ^3.1.14 | Dev auto-reload |

---

## 📦 Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB** instance — local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd expzip_fixed
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see [Environment Variables](#environment-variables) below), then start the server:

```bash
# Production
npm start

# Development (auto-reloads on file changes)
npm run dev
```

The backend runs on **http://localhost:8000** by default.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server runs on **http://localhost:5173** by default.

Open your browser at `http://localhost:5173` to use the app.

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` directory with the following keys:

```env
# MongoDB connection string (Atlas or local)
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# Secret key used to sign JWT tokens — use a long random string
JWT_SECRET=your_super_secret_key_here

# Port the Express server listens on (default: 8000)
PORT=8000

# (Optional) Allowed frontend origin for CORS — defaults to * if not set
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file.** Add it to `.gitignore`.

### Generating a JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📡 API Reference

All routes are prefixed with `/api/v1`. Protected routes require a `Bearer <token>` in the `Authorization` header.

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | ✗ | Register a new user |
| POST | `/login` | ✗ | Log in and receive a JWT |
| GET | `/getUser` | ✓ | Get the authenticated user's info |
| POST | `/upload-image` | ✗ | Upload a profile image (multipart/form-data, field: `image`) |

**Register body:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "yourpassword",
  "profileImageUrl": "http://localhost:8000/uploads/filename.png"
}
```

**Login body:**
```json
{
  "email": "jane@example.com",
  "password": "yourpassword"
}
```

**Login response:**
```json
{
  "token": "<jwt>",
  "user": { "_id": "...", "fullName": "Jane Doe", "email": "..." }
}
```

---

### Income — `/api/v1/income`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/add` | ✓ | Add an income record |
| GET | `/get` | ✓ | Get all income records for the user |
| DELETE | `/:id` | ✓ | Delete an income record by ID |
| GET | `/download-excel` | ✓ | Download all income as an Excel file |

**Add income body:**
```json
{
  "source": "Freelance",
  "amount": 5000,
  "date": "2026-05-01",
  "icon": "💻"
}
```

---

### Expense — `/api/v1/expense`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/add` | ✓ | Add an expense record |
| GET | `/get` | ✓ | Get all expense records for the user |
| DELETE | `/:id` | ✓ | Delete an expense record by ID |
| GET | `/download-excel` | ✓ | Download all expenses as an Excel file |

**Add expense body:**
```json
{
  "category": "Food",
  "amount": 800,
  "date": "2026-05-10",
  "icon": "🍔"
}
```

---

### Dashboard — `/api/v1/dashboard`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | ✓ | Get aggregated dashboard data (totals, recent transactions, chart data) |

---

### File Uploads — `/uploads`

Static files served from the `backend/uploads/` directory.

```
GET http://localhost:8000/uploads/<filename>
```

Accepted image types: `image/jpeg`, `image/jpg`, `image/png`

---

## 🗃 Data Models

### User

| Field | Type | Required | Notes |
|---|---|---|---|
| `fullName` | String | ✓ | — |
| `email` | String | ✓ | Unique |
| `password` | String | ✓ | Auto-hashed with bcrypt (salt rounds: 10) |
| `profileImageUrl` | String | ✗ | Defaults to `""` |
| `createdAt` | Date | — | Auto (timestamps) |
| `updatedAt` | Date | — | Auto (timestamps) |

### Income

| Field | Type | Required | Notes |
|---|---|---|---|
| `userId` | ObjectId | ✓ | References `User` |
| `source` | String | ✓ | e.g. `"Salary"`, `"Freelance"` |
| `amount` | Number | ✓ | — |
| `date` | Date | ✗ | Defaults to `Date.now` |
| `icon` | String | ✗ | Emoji character |
| `createdAt` | Date | — | Auto |
| `updatedAt` | Date | — | Auto |

### Expense

| Field | Type | Required | Notes |
|---|---|---|---|
| `userId` | ObjectId | ✓ | References `User` |
| `category` | String | ✓ | e.g. `"Food"`, `"Transport"` |
| `amount` | Number | ✓ | — |
| `date` | Date | ✗ | Defaults to `Date.now` |
| `icon` | String | ✗ | Emoji character |
| `createdAt` | Date | — | Auto |
| `updatedAt` | Date | — | Auto |

---

## 📜 Scripts

### Backend (`backend/`)

| Script | Command | Description |
|---|---|---|
| `start` | `node server.js` | Run in production |
| `dev` | `nodemon server.js` | Run in development with auto-reload |

### Frontend (`frontend/`)

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start Vite dev server (port 5173) |
| `build` | `vite build` | Build for production (outputs to `dist/`) |
| `preview` | `vite preview` | Preview the production build locally |
| `lint` | `eslint .` | Lint source files |

---

## 🗂 Folder Structure

```
expzip_fixed/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, get user
│   │   ├── dashboardController.js # Aggregated stats
│   │   ├── expenseController.js   # CRUD + Excel export
│   │   └── incomeController.js    # CRUD + Excel export
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT protect middleware
│   │   └── uploadMiddleware.js    # Multer image upload config
│   ├── models/
│   │   ├── Expense.js
│   │   ├── Income.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── incomeRoutes.js
│   ├── uploads/                   # Stored profile images
│   ├── .env                       # ← create this (not committed)
│   ├── package.json
│   └── server.js                  # Express app entry point
│
└── frontend/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── assets/                # Static images
    │   ├── components/
    │   │   ├── Cards/             # InfoCard, TransactionInfoCard, CharAvatar
    │   │   ├── Charts/            # Bar, Line, Pie, Tooltip, Legend
    │   │   ├── Dashboard/         # Dashboard section components
    │   │   ├── Expense/           # Expense form, list, overview
    │   │   ├── Income/            # Income form, list, overview
    │   │   ├── Inputs/            # Input, ProfilePhotoSelector
    │   │   ├── layouts/           # AuthLayout, DashboardLayout, Navbar, SideMenu
    │   │   ├── DeleteAlert.jsx
    │   │   ├── EmojiPickerPopup.jsx
    │   │   └── Modal.jsx
    │   ├── context/
    │   │   └── userContext.jsx    # Global user state
    │   ├── hooks/
    │   │   └── useUserAuth.jsx    # Auth guard hook
    │   ├── pages/
    │   │   ├── Auth/              # Login, SignUp
    │   │   └── Dashboard/         # Home, Income, Expense
    │   ├── utils/
    │   │   ├── apiPaths.js        # Centralized API endpoint constants
    │   │   ├── axiosinstance.js   # Axios instance with base URL
    │   │   ├── data.js            # Static data / constants
    │   │   ├── helper.js          # Utility functions
    │   │   └── uploadimage.js     # Profile image upload helper
    │   ├── App.jsx                # Route definitions
    │   ├── index.css              # Tailwind base styles
    │   └── main.jsx               # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** (10 salt rounds) before storage — plain-text passwords are never persisted.
- All protected API routes validate a signed **JWT** on every request.
- File uploads are restricted to `image/jpeg`, `image/jpg`, and `image/png` MIME types.
- Keep `JWT_SECRET` long (64+ hex chars) and never expose it publicly.
- For production, set `CLIENT_URL` to your actual frontend domain instead of `*`.

---

## 🌐 Production Deployment Tips

1. Set `NODE_ENV=production` in your backend environment.
2. Build the frontend: `cd frontend && npm run build` — serve the `dist/` folder via a static host (Vercel, Netlify) or from Express.
3. Use a process manager like **PM2** for the backend: `pm2 start server.js`.
4. Store secrets in your hosting platform's secret manager, not in `.env` files committed to version control.
5. Point `BASE_URL` in `frontend/src/utils/apiPaths.js` to your production backend URL before building.
