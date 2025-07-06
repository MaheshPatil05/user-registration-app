# User Registration Full-Stack Application
This project is a foundational full-stack web application demonstrating a user registration system. It showcases the integration of a React.js frontend, a Node.js/Express.js backend, and a MongoDB database, following a common MERN-like stack pattern.

🚀 Features
User Registration: Allows new users to register by providing their first name, last name, age, and email.

Client-Side Validation: Provides immediate feedback to the user on form input validity using React state.

Server-Side Validation: Robust validation on the backend ensures data integrity and handles cases like duplicate email registrations.

Data Persistence: Registered user data is securely stored in a MongoDB database.

API Communication: Seamless interaction between frontend and backend via RESTful API endpoints.

💻 Tech Stack
Frontend:

React.js (Functional Components, Hooks)

HTML, CSS (basic styling)

fetch API for HTTP requests

Backend:

Node.js (Runtime Environment)

Express.js (Web Framework)

CORS middleware

dotenv for environment variables

Database:

MongoDB (NoSQL Document Database)

Mongoose (ODM for Node.js)

⚙️ Setup and Installation
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js & npm (or Yarn): Ensure you have Node.js (which includes npm) installed. You can download it from nodejs.org.

MongoDB:

Local: Install MongoDB Community Server on your machine. Refer to the MongoDB documentation for detailed instructions for your OS.

Cloud (Recommended): Set up a free tier cluster on MongoDB Atlas. Make sure to create a database user and whitelist your IP address.

1. Clone the Repository
First, clone this repository to your local machine:

git clone <repository-url>
cd <project-directory> # e.g., cd user-registration-app

2. Backend Setup
Navigate into the backend directory:

cd backend

Install backend dependencies:

npm install # or yarn install

Create a .env file in the backend directory and add your MongoDB connection URI and desired port:

DB_URI='mongodb+srv://<your-atlas-username>:<your-atlas-password>@<your-cluster-name>.mongodb.net/<your-database-name>?retryWrites=true&w=majority'
OR for local MongoDB: DB_URI='mongodb://localhost:27017/your_app_db'
PORT=5000

Important: Replace <your-atlas-username>, <your-atlas-password>, <your-cluster-name>, and <your-database-name> with your actual MongoDB Atlas credentials. If using local MongoDB, adjust the DB_URI accordingly.

Start the backend server:

npm start # or node server.js or nodemon server.js (if you have nodemon installed)

The server should start on http://localhost:5000 (or your chosen PORT) and connect to MongoDB.

3. Frontend Setup
Open a new terminal window and navigate back to the root of your project, then into the frontend directory:

cd .. Go back to project root if you're in backend
cd frontend

Install frontend dependencies:

npm install  or yarn install

Start the React development server:

npm start  or yarn start

This will typically open the application in your browser at http://localhost:3000.

🚀 Usage
Ensure both the backend server and the React development server are running.

Open your browser and navigate to http://localhost:3000.

Fill out the registration form with your details.

Click the "Register" button.

Observe the console and network tab in your browser's developer tools for successful registration messages and the API call.

Verify the new user document in your MongoDB database (using MongoDB Compass or Atlas UI).

📂 Project Structure
react-app/

├── backend/

│   ├── .env          // Environment variables (ignored by Git)

│   ├── package.json

│   ├── server.js     // Express server setup, MongoDB connection, API routes

└── frontend/

    ├── public/
    
    ├── src/
    
    │   ├── App.js    // Main React component, form logic
    
    │   ├── index.css // Basic styling
    
    │   └── index.js
    
    ├── package.json
