const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email }); // Use 'User' model here
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        // Create a new user instance
        const newUser = new User({  // Use 'User' here
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Save the user to the database
        await newUser.save();

        // Optionally generate a token for the user (if needed)
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Send success response
        return res.status(201).json({
            message: 'User created successfully',
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'User cannot be registered, please try again later',
        });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Set token in a cookie
        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
            httpOnly: true,
        };

        // Send response
        res.cookie('token', token, options)
            .status(200)
            .json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login failed, please try again later' });
    }
};
