const express = require('express');
const router = express.Router();
// User model would be imported here in a real application
// const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  // In a real app: Hash password, create user in DB, return JWT
  const { name, email, password } = req.body;
  console.log('Registering user:', { name, email });
  res.status(201).json({ msg: 'User registration placeholder' });
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
  // In a real app: Check credentials, return JWT
  const { email, password } = req.body;
  console.log('Logging in user:', { email });
  res.json({ token: 'sample_jwt_token' });
});

// This line is crucial for the file to work correctly.
module.exports = router;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();      // Initialize Express app       