# Discord Clone

A full-stack real-time chat application inspired by Discord. Users can register, log in, browse channels, create new text channels, and exchange messages instantly through WebSockets.

## Project Overview

This project is built as a modern web-based chat system with:

- a React frontend
- an Express REST API
- MongoDB for persistence
- Socket.io for real-time communication
- JWT authentication for protected routes and socket access

## Features

- User registration and login
- JWT-based authentication
- Persistent user sessions in the browser
- Default seeded channels: `general`, `random`, `announcements`
- Create custom text channels
- Load recent channel message history
- Real-time messaging with Socket.io
- Channel-based chat rooms
- Responsive Discord-inspired UI
- Password validation and user-friendly error handling

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Socket.io Client
- Backend: Node.js, Express, Socket.io
- Database: MongoDB with Mongoose
- Authentication: JWT, bcryptjs
- Styling: Pure CSS

## Project Structure

```text
Discord-Clone/
├── client/          React + Vite frontend
├── server/          Express API + Socket.io backend
├── start.bat        Starts server and client in separate terminals
└── package.json     Root scripts for development
```

## Requirements

- Node.js 18+ recommended
- npm
- MongoDB running locally or a valid MongoDB connection string

## Environment Variables

### Server

Copy `server/.env.example` to `server/.env` and update the values if needed:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/discordclone
JWT_SECRET=change_this_to_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

### Client

Copy `client/.env.example` to `client/.env` if you want to override the defaults:

```env
VITE_API_URL=/api
VITE_SOCKET_URL=http://localhost:5000
```

## Installation

From the project root:

```powershell
npm run install:all
```

This installs dependencies for both the `server` and `client`.

## Running the Project

### Option 1: Start both apps with the batch file

Double-click `start.bat`

### Option 2: Run manually in two terminals

Terminal 1:

```powershell
npm run dev:server
```

Terminal 2:

```powershell
npm run dev:client
```

Then open:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/health`

Note: visiting `http://localhost:5000` shows a backend landing page. The actual app runs on port `5173`.

## Available Scripts

At the project root:

- `npm run install:all` installs both server and client dependencies
- `npm run dev:server` starts the backend in watch mode
- `npm run dev:client` starts the Vite frontend
- `npm run build` builds the frontend for production
- `npm run start:server` runs the backend without watch mode
- `npm run reset-db` clears the MongoDB database

## API Summary

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Channels

- `GET /api/channels`
- `POST /api/channels`
- `GET /api/channels/:channelId/messages`

### Socket Events

Client emits:

- `join-channel`
- `leave-channel`
- `send-message`

Server emits:

- `joined-channel`
- `new-message`
- `error`

## Troubleshooting

- `ENOENT package.json`: run commands from the project root.
- MongoDB connection error: make sure MongoDB is running and `MONGODB_URI` is correct.
- `EADDRINUSE` on port `5000`: stop the previous backend process, then restart.
- Frontend opens but API fails: verify the backend is running on port `5000`.
- `Cannot GET /` on the backend URL: use `http://localhost:5173` for the frontend app.
