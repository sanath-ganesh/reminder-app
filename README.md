# Meeting Notes Application

## Overview
This project consists of a simple REST API built with Node.js/Express and a frontend application built with Vite and React. The goal is to manage meeting notes with the ability to add, edit, delete, and view notes and reminders.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Setup Instructions](#setup-instructions)
- [User Requirements](#user-requirements)
- [Technical Requirements](#technical-requirements)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)


## Features
- Fetch all existing reminders
- Filter reminders by keywords and date range
- Add, update, and delete reminders
- List and manage meeting notes
- View truncated content with expandable details
- Toggle action items between open and completed
- Edit note content and action items
- Add new notes

## Technical Stack
- Backend: Node.js, Express, MongoDB
- Frontend: Vite, React, MaterialUI

## Setup Instructions

### Backend (Node.js/Express)
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/meeting-notes-app.git
   cd meeting-notes-app-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up MongoDB:**
   Ensure MongoDB is installed and running. Update the connection string in `config/database.js`.
4. **Run the server:**
   ```bash
   node server.js
   ```
   The server will run on http://localhost:3000.

### Frontend (Vite/React)
1. **Navigate to the frontend directory:**
   ```bash
   cd meeting-notes-app-ui
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:5173.

## User Requirements
- View existing notes with truncated content.
- Expand notes to see full content and action items.
- Toggle action item states.
- Edit note content and action items.
- Add new notes.
- Fetch all reminders.
- Filter reminders by keywords and date range.
- Add, update, and delete reminders.
- Integrate REST APIs with the React frontend.
- Use MaterialUI for UI components.
- Use fetch API to interact with the backend.

## Technical Requirements
- Use Node.js and Express for the backend.
- Use MongoDB for data persistence.
- Use Vite and React for the frontend.
- Use MaterialUI for styling and components.
- Use fetch API to interact with backend REST APIs.
- Implement React features like state, props, and effects.

## API Endpoints
- ### GET /reminders:
  Fetch all reminders.
- ### GET /reminders?search=keyword&startDate=yyyy-mm-dd&endDate=yyyy-mm-dd:
  Filter reminders.
- ### POST /reminders:
  Add a new reminder.
- ### PUT /reminders/
: Update a reminder.
- ### DELETE /reminders/
: Delete a reminder.

## Project Structure
meeting-notes-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   ├── vite.config.js

## Usage
- ### Backend: Use the provided endpoints to manage reminders.
- ### Frontend: Interact with the meeting notes application through the provided user interface.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.
