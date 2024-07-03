// routes/users/users.js
const express = require('express');
const fs = require('fs'); // For file system access
const { validateEmail, isMissingField } = require('../../utils/validation');
const usersDataFile = 'users.json'; // Path to users data file

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validation (improve as needed)
  if (isMissingField(req.body, 'username', 'password')) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Read existing users from file
  let users = [];
  try {
    const data = fs.readFileSync(usersDataFile, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('Error reading users data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Find the user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Implement password comparison (replace with a secure hashing mechanism in production)
  if (user.password !== password) { // This is for demonstration, use secure hashing!
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Login successful, send user information (without password)
  delete user.password; // Remove password before sending response
  res.status(200).json({ message: 'success', user });
});

module.exports = router;

