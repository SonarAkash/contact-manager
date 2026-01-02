# Contact Management System - Assignment

A full-stack Contact Management application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates CRUD operations, RESTful API design, server-side validation, and responsive UI implementation using Tailwind CSS.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Axios, React Hot Toast
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **State Management:** React Hooks (useState, useEffect)

## Features

- **Create Contact:** Real-time validation for required fields and data formats.
- **Read Contacts:** Fetches and displays contacts in a responsive grid layout.
- **Update Contact:** Edit existing contact details with pre-filled forms.
- **Delete Contact:** Secure deletion with a modal confirmation dialog.
- **Search/Validation:** Strict backend and frontend validation (e.g., exact 10-digit phone numbers).
- **UX Enhancements:** Expandable message cards, toast notifications, and loading states.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Connection String (Atlas or Local)

### 1. Installation
Clone the repository and install dependencies for both client and server.

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Environment Variables
Create a .env file in the server directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Running the Application
You need to run the backend and frontend in separate terminals.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/contacts | Fetch all contacts |
| POST | /api/contacts | Create a new contact |
| PUT | /api/contacts/:id | Update an existing contact |
| DELETE | /api/contacts/:id | Delete a contact |

## Project Structure

```
root/
├── client/           # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   └── App.jsx
│   └── tailwind.config.js
│
└── server/           # Node.js Backend
    ├── models/       # Mongoose Schemas
    ├── index.js      # Server Entry & Routes
    └── package.json
```