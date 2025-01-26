//auth,isStudent,isAdmin are middleware functions that we have created in middleware/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};


exports.isStudent = (req, res, next) => {
   try {
        if (req.user.role !== 'student') {
            return res.status(401).json({ message: 'Authorization denied' });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Authorization denied' });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}