const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. MongoDB Connection ---
// Use your MongoDB Atlas connection string OR local connection string
// IMPORTANT: Replace <password> and <username> for Atlas URI!
// For local: 'mongodb://localhost:27017/my_app_db'
const DB_URI = 'mongodb+srv://<username>:<password>-registration-cluster.bs5oewk.mongodb.net/?retryWrites=true&w=majority&appName=my-registration-cluster'; // MongoDB Atlas URI example replace <username> and <password>

mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- 2. Define Mongoose Schema and Model ---
// A Schema defines the structure of your documents within a collection.
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true // Removes whitespace from both ends of a string
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email addresses are unique in the collection
    lowercase: true, // Stores emails in lowercase
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Basic regex for email format
  }
}, {
  timestamps: true // Adds `createdAt` and `updatedAt` fields automatically
});

// Create a Model from the Schema. Mongoose will create a 'users' collection for this.
const User = mongoose.model('User', userSchema);

// --- Middleware ---
app.use(cors()); // Enables cross-origin requests (important for React frontend)
app.use(express.json()); // Body parser for JSON data

// --- Routes ---

// Basic route to test if the server is running
app.get('/', (req, res) => {
  res.send('Backend server is running and connected to MongoDB!');
});

// Route to handle form registration
app.post('/register', async (req, res) => {
  const { firstName, lastName, age, email } = req.body;

  // Server-side validation (Mongoose also validates based on schema, but good to have upfront checks)
  if (!firstName || !lastName || age === undefined || !email) { // Check for undefined age explicitly
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Additional age validation if not already handled by Mongoose schema
  if (isNaN(age) || age < 0 || age > 120) {
      return res.status(400).json({ message: 'Invalid age provided. Must be between 0 and 120.' });
  }

  try {
    // Create a new user instance based on the Mongoose Model
    const newUser = new User({
      firstName,
      lastName,
      age,
      email
    });

    // Save the new user document to the MongoDB database
    const savedUser = await newUser.save();

    console.log('User registered successfully:', savedUser);
    res.status(201).json({ message: 'User registered successfully!', user: savedUser });

  } catch (error) {
    // Handle duplicate email error (unique: true on email field)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(409).json({ message: 'This email address is already registered.' });
    }
    // Handle Mongoose validation errors (e.g., missing required fields, invalid format)
    if (error.name === 'ValidationError') {
        const errors = {};
        for (let field in error.errors) {
            errors[field] = error.errors[field].message;
        }
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});