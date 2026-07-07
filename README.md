# Mini ERP Frontend

This is the React + TypeScript frontend for the Mini ERP system. It provides a dashboard for inventory and sales management and connects to the Mini ERP backend API.

## Overview

The application includes:

- User login and protected routes
- Dashboard with sales and inventory summary
- Product listing and management
- Sales creation and sales history
- API integration with JWT-based authentication

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Query
- React Router DOM
- Axios
- Tailwind CSS

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+ installed
- A running Mini ERP backend API on port 5000
- npm or yarn

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at:

- http://localhost:5173

## Environment Variables

Create a `.env` file in the frontend root with the following value:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Variable Description

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Base URL of the backend API |

## Project Structure

```text
src/
  api/           # API calls and axios setup
  app/           # Redux store
  components/    # Reusable UI components
  features/      # Auth, dashboard, products, sales
  layouts/       # Shared layout components
  routes/        # Route definitions
  types/         # Shared TypeScript types
```

## Main Pages

- `/login` — Login page
- `/dashboard` — Main dashboard
- `/products` — Product list and management
- `/sales` — Sales history
- `/sales/new` — Create a new sale

## Backend Connection

This frontend expects the backend API to be running. The default API base URL is:

```text
http://localhost:5000/api/v1
```

The frontend automatically sends the JWT token from local storage using the axios interceptor.

## Sample Login Flow

A typical login flow is:

1. User enters email and password on the login page
2. Frontend sends request to `/auth/login`
3. Backend returns `user` and `accessToken`
4. Token is stored and used for protected requests

Example response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "123",
      "name": "Admin",
      "email": "admin@mini-erp.com",
      "role": "admin"
    },
    "accessToken": "jwt-token-here"
  }
}
```


## Notes

- Make sure the backend is running before testing the UI.
- If authentication fails, verify that the backend JWT secret and database are correctly configured.
- For local development, keep the frontend and backend on the same machine or update `VITE_API_BASE_URL` accordingly.
