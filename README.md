# RailETA — Production Railway ETA & Live Intelligence Platform

**RailETA** is a production-quality, real-time Indian Railways tracking, ETA prediction, station live board, and journey intelligence platform built with modern web technologies and powered by the official RailKit SDK.

---

## 🚀 Key Features

- **Live Train Tracking & ETA**: Track current train station position, real-time delay minutes, expected arrival time, and vertical station-by-station running status timeline.
- **Train Schedule & Journey Search**: Search direct trains between any two stations with running days, duration, distance, and available coach classes.
- **Station Live Movement Board**: View arriving and departing trains for any junction code with live platform numbers and status indicators (ON TIME, DELAYED, CANCELLED).
- **PNR Status Verification**: Lookup 10-digit PNR booking status, coach allotment, berth allocation, and charting status.
- **Seat Availability & Fare Breakdown**: Check seat availability per class and quota along with base fare, reservation, superfast, GST, and total fare breakdown.
- **Backend Caching & Request Coalescing**: Built-in `node-cache` layer and concurrent request deduplication to protect RailKit API quotas.
- **Strict Key Isolation & Security**: `RAILKIT_API_KEY` is kept 100% backend-only. The browser client never touches or receives raw API keys.

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript & Vite
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens (Navy/Red Railway Theme)
- **Routing**: React Router DOM v6
- **Data Fetching & State**: TanStack Query (React Query)
- **Icons**: Lucide React Icons

### Backend
- **Runtime**: Node.js & Express with TypeScript
- **Railway SDK**: `railkit` Node.js SDK
- **Security**: Helmet, CORS, Rate Limiting (`express-rate-limit`), Zod input validation
- **Caching**: `node-cache` with endpoint-specific TTLs and promise request deduplication

---

## 📂 Project Structure

```
RailwayETA/
├── backend/
│   ├── src/
│   │   ├── config/          # Environment configuration
│   │   ├── controllers/     # Express route controllers
│   │   ├── middleware/      # Rate limit, Zod validation & error handlers
│   │   ├── routes/          # REST API endpoints (/stations, /trains, /pnr, etc.)
│   │   ├── services/        # RailKit SDK & Railway caching service
│   │   ├── types/           # Normalized railway interfaces
│   │   ├── utils/           # Standard JSON response helpers
│   │   ├── app.ts           # Express application setup
│   │   └── server.ts        # Server entry point
│   ├── __tests__/           # Supertest & Jest integration tests
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/             # Frontend HTTP client & modules
│   │   ├── components/      # Reusable UI components (Timeline, ETAWidget, etc.)
│   │   ├── hooks/           # TanStack Query hooks
│   │   ├── layouts/         # AppLayout & MobileNav
│   │   ├── pages/           # HomePage, TrackTrainPage, StationBoardPage, etc.
│   │   ├── types/           # Frontend TypeScript types
│   │   ├── App.tsx          # React application routes
│   │   ├── main.tsx         # React DOM entry point
│   │   └── index.css        # Tailwind CSS directives & custom keyframes
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── package.json             # Root monorepo script coordinator
├── .gitignore               # Strict gitignore excluding .env files
└── README.md                # Project documentation
```

---

## ⚙️ Local Setup Instructions

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm

### 2. Installation

Install dependencies across the monorepo:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 3. Environment Setup (Local Only)

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
RAILKIT_API_KEY=your_key_here
CORS_ORIGIN=http://localhost:3000
```

> **Security Note**: Never commit `.env` or API keys to Git repository.

### 4. Running the Application

From the project root:

```bash
# Start backend server (Port 5000)
npm run start:backend

# Start frontend dev server (Port 3000)
npm run start:frontend
```

Alternatively, run in separate terminals:
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

Open `http://localhost:3000` in your browser.

---

## 📡 REST API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status & uptime |
| `GET` | `/api/stations/search?name=...` | Search stations by name |
| `GET` | `/api/stations/:stationCode` | Station details by code |
| `GET` | `/api/stations/:stationCode/live?hours=4` | Station live arrival/departure board |
| `GET` | `/api/trains/search?name=...` | Search train by name or number |
| `GET` | `/api/trains/between?from=...&to=...&date=...` | Trains between two stations |
| `GET` | `/api/trains/:trainNumber` | Train timetable schedule |
| `GET` | `/api/trains/:trainNumber/live?date=...` | Live train running status & ETA |
| `GET` | `/api/pnr/:pnr` | 10-digit PNR booking & allotment status |
| `GET` | `/api/availability?train=...&from=...&to=...` | Seat availability per class/quota |
| `GET` | `/api/fare?train=...&from=...&to=...` | Detailed fare breakdown |

---

## 🛡️ Security & API Cost Protection

1. **Backend-Only Key Storage**: `RAILKIT_API_KEY` is loaded strictly via `process.env.RAILKIT_API_KEY` on Express server.
2. **Standardized API Caching**:
   - Station search & train schedules: **30 minutes**
   - Train search between stations: **10 minutes**
   - Live tracking & Station live board: **90 seconds**
   - PNR status: **30 seconds**
   - Seat availability: **60 seconds**
3. **In-Flight Request Coalescing**: Concurrent duplicate requests for the same live train or station board trigger a single RailKit call and resolve shared promises.
4. **Rate Limiting**: `express-rate-limit` enforces rate limits to prevent API abuse.

---

## 🧪 Testing

Run backend Supertest integration test suite:

```bash
cd backend
npm test
```

---

## 📜 License

MIT License. Built for real-time Indian Railways travel intelligence.
