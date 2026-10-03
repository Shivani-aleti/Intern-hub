# MERN Job Portal

A full-stack job portal web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows users to search, filter, and post jobs, as well as manage their own job postings. The project features a modern UI with React, a RESTful API with Express and MongoDB, and user authentication via Firebase.

---

![image](https://github.com/user-attachments/assets/15433576-781b-446f-95be-85cc17297493)


## Features

### For Job Seekers
- **Browse Jobs:** View a list of available jobs with filtering by location, salary, experience, employment type, and posting date.
- **Search:** Search jobs by title or keywords.
- **Salary Estimates:** View salary estimates for various roles.
- **Newsletter:** Subscribe for job alerts and upload your resume.

### For Employers
- **Post Jobs:** Fill out a form to post new job listings.
- **Manage My Jobs:** View, search, edit, and delete jobs posted by you.

### General
- **Responsive Design:** Works well on desktop and mobile.
- **Modern UI:** Built with React, Tailwind CSS, and Vite.
- **Authentication:** Google sign-in via Firebase.
- **RESTful API:** Node.js/Express backend with MongoDB for data storage.

---

## Project Structure

```
sweproject/
│
├── job-portal-client/    # React frontend
│   ├── public/           # Static assets (images, jobs.json, salary.json)
│   ├── src/              # React source code (components, pages, sidebar, firebase)
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── ...
│
├── job-portal-server/    # Express backend
│   ├── index.js          # Main server file
│   ├── .env              # Environment variables (MongoDB credentials)
│   └── ...
│
├── package.json          # Project-level dependencies
└── .gitattributes
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Firebase project for authentication

### 1. Clone the Repository

```sh
git clone <repo-url>
cd sweproject
```

### 2. Setup the Server

```sh
cd job-portal-server
npm install
# Create a .env file with your MongoDB credentials:
# DB_USER=yourMongoUser
# DB_PASSWORD=yourMongoPassword
npm start
```

The server will run on `http://localhost:3000`.

### 3. Setup the Client

```sh
cd ../job-portal-client
npm install
npm run dev
```

The client will run on `http://localhost:5173` (or as shown in your terminal).

---

## Usage

- **Browse jobs:** Use the homepage filters and search bar.
- **Post a job:** Go to "Post a Job" and fill out the form.
- **Manage jobs:** Go to "My Jobs" to view, edit, or delete your postings.
- **Login:** Use Google authentication to log in.

---

## API Endpoints

- `POST /post-job` — Add a new job
- `GET /all-jobs` — Get all jobs
- `GET /myJobs/:email` — Get jobs posted by a user
- `DELETE /job/:id` — Delete a job by ID

---

## Customization

- **Firebase:** Update `src/firebase/firebase.config.js` with your Firebase project credentials.
- **MongoDB:** Update `.env` in the server with your MongoDB Atlas credentials.
- **Static Data:** Jobs and salary data are in `job-portal-client/public/jobs.json` and `salary.json`.

---

## License

This project is for educational purposes.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase](https://firebase.google.com/)
