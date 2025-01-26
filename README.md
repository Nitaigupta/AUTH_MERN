# Auth MERN Backend

This is the backend for the MERN authentication system, built with **Node.js**, **Express.js**, and **MongoDB**. It handles user authentication, token generation, and secure storage.

---

## Features

- **User Registration**: Sign up with email and password.
- **User Login**: Authenticate using email and password.
- **JWT Authentication**: Secure routes using JSON Web Tokens (JWT).
- **Password Hashing**: Protect user passwords with `bcrypt`.
- **Environment Variables**: Use `dotenv` for configuration management.
- **Error Handling**: Centralized error handling for clean and consistent API responses.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nitaigupta/AUTH_MERN.git
   cd AUTH_MERN/backend

   npm install
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
npm run dev
backend/
│
├── controllers/
│   └── authController.js   # Handles business logic for authentication
│
├── middlewares/
│   └── authMiddleware.js   # Protects routes with JWT authentication
│
├── models/
│   └── User.js             # Mongoose schema for users
│
├── routes/
│   └── authRoutes.js       # Defines API routes
│
├── config/
│   └── db.js               # MongoDB connection configuration
│
├── .env                    # Environment variables
├── server.js               # Entry point of the application
└── package.json            # Dependencies and scripts


### How to Use
1. Save the content above as `README.md` in the `backend` folder of your project.
2. Customize the fields like MongoDB URI placeholder, author details, and additional features as needed.

Let me know if you need anything added!

