const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create a new Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name');

// Define a schema for the user data
const userSchema = new mongoose.Schema({
    name: String,
    position: String,
    contact: String,
    personalEmail: String,
    businessEmail: String,
    password: String,
    services: String,
    product: String,
    address: String,
    companyLogo: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Route to handle user registration
app.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const user = new User(userData);
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { personalEmail, password } = req.body;

    try {
        const user = await User.findOne({ personalEmail, password });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
