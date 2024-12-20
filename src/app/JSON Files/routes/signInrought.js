const express = require('express');
const User = require('../models/signInModal');

const router = express.Router();

// Sign-Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).send({ message: 'Error creating user', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials!' });
    }
    res.send({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

module.exports = router;
