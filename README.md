# Expense Tracker

A full-stack expense tracking app built with React (Vite + Tailwind) on the frontend and Node.js/Express/MongoDB on the backend.

## Setup

### Backend
```bash
cd backend
npm install
# Edit .env with your MongoDB URL and JWT_SECRET
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend runs on **port 8000**. Frontend dev server on **port 5173**.

## Features
- User registration & login with JWT auth
- Upload profile photo
- Add/delete income records with emoji icons
- Add/delete expense records with emoji icons
- Dashboard with charts (pie, bar, line)
- Download income/expense data as Excel
- Responsive sidebar layout
