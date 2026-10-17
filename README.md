# Little English Buddy

A friendly React frontend that helps young learners practice English through conversation, playful modes, quick replies, and mood-aware activities.

## Features

- Chat with the English Buddy in a persistent browser session
- Practice through learning and play modes
- Choose a mood to personalize the conversation
- View learning level, progress, stars, achievements, and current activity
- Use suggested quick replies for guided practice
- Retry failed requests or reset the current session
- Responsive layout for desktop and mobile screens

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A running Little English Buddy backend API

### Installation

```bash
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Set `VITE_API_BASE_URL` in `.env` to the base URL of the backend API. The default is:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server on port `5173` |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Backend API

The frontend uses the configured API base URL and expects these endpoints:

- `POST /chat` to send a message or mood selection
- `GET /chat/session/:sessionId` to load the saved session
- `DELETE /chat/session/:sessionId` to reset the session

Chat responses should include a successful response with a `data.reply` value. Session data provides the conversation and learning information used by the dashboard.

## Project Structure

```text
src/
├── components/       Reusable chat, layout, learning, mood, and common UI
├── context/          Session state and API lifecycle management
├── hooks/            Custom React hooks
├── pages/            Route-level pages
├── services/         Backend API client
└── utils/            Session and mood helpers
```

The browser stores the generated session ID in local storage under `littleEnglishBuddy.sessionId`, allowing the conversation to be restored when the app is reopened.

## Production Build

Build the app with:

```bash
npm run build
```

The generated static files are placed in `dist/` and can be deployed to a static hosting provider such as Vercel. Make sure `VITE_API_BASE_URL` is configured in the deployment environment before building.
