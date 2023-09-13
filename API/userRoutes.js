const express = require('express');
const router = express.Router();
const User = require('./userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey  = require('./config')
// console.log('in useer routes', secretKey)

// Registration
router.post('/register', async (req, res) => {
  try {
    const { username, password, name, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    // Create a new user with name and role
    const newUser = await User.create({ username, password: hashedPassword, name, role });

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });
    console.log('username', user)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('pass match', passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    // Return the token only
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export both the secretKey and router in a single object
module.exports = router;
