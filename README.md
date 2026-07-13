# Hiten Mehta — Portfolio

MERN stack personal portfolio monorepo (MongoDB, Express, React, Node.js) with TypeScript and Tailwind CSS.

## Structure

```
personal_portfolio/
├── api/          # Vercel serverless entry (Express)
├── frontend/     # Vite + React + TypeScript + Tailwind
├── backend/      # Express + TypeScript + Mongoose
├── shared/       # Shared TypeScript types
└── docs/         # Design system docs
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI.

4. Seed the database:

```bash
npm run seed
```

5. Start both servers from the **repo root** (no need to `cd` into `frontend/` or `backend/`):

```bash
npm run dev
```

Backend runs on `http://localhost:5000`, frontend on `http://localhost:5173`.

## Scripts

Run all commands from `personal_portfolio/` (monorepo root):

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start backend + frontend together    |
| `npm start`          | Same as `npm run dev`                |
| `npm run dev:backend`  | Backend only (optional)            |
| `npm run dev:frontend` | Frontend only (optional)           |
| `npm run seed`       | Seed MongoDB with portfolio content  |
| `npm run build`      | Build frontend and backend           |

## API

| Endpoint           | Method | Description              |
| ------------------ | ------ | ------------------------ |
| `/api/health`      | GET    | Health check             |
| `/api/portfolio`   | GET    | Full portfolio content   |

## Environment variables

| Variable       | Description                    | Default                  |
| -------------- | ------------------------------ | ------------------------ |
| `MONGODB_URI`  | MongoDB connection string      | `mongodb://127.0.0.1:27017/portfolio` |
| `PORT`         | Backend port                   | `5000`                   |
| `FRONTEND_URL` | Allowed CORS origin            | `http://localhost:5173`  |
| `VITE_API_URL` | Frontend API base (production) | `/api`                   |
