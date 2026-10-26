# CodeQuest

CodeQuest is an algorithm-practice app with a React/Vite frontend and an Express/MongoDB backend. The applications live in separate `frontend/` and `backend/` folders.

## Project structure

- `frontend/`: React UI, Vite, Tailwind CSS, and Monaco Editor
- `backend/`: Express API, Mongoose models, authentication, and progress storage
- `.env`: local backend configuration, kept at the repository root

## Setup

1. Install workspace dependencies from the repository root:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure `MONGODB_URI` and `JWT_SECRET`. The secret must be at least 32 characters long.

3. Start MongoDB, then run both applications from the repository root:

   ```bash
   npm run dev
   ```

   The frontend waits for the backend health endpoint before starting. Open `http://localhost:5173/`.

## Run applications separately

Run either command from the repository root:

```bash
npm run dev:backend
npm run dev:frontend
```

The backend listens on port `4000`. The frontend runs on port `5173` and proxies `/api` requests to the backend.

For production, build the frontend with `npm run build` and start the API with `npm run start:backend`.

## Features

- MongoDB-backed signup, login, profiles, submissions, and solved-problem progress
- Bcrypt password hashes and HTTP-only session cookies
- Curated data-structures and algorithms problem catalog with filters
- Java and C++ code editor
- Dashboard, study plan, and submission history

No demo users or default passwords are created. Create an account through the signup page.
