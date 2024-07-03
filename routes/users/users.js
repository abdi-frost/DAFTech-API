// routes/users/users.js
const express = require('express');
const fs = require('fs'); // For file system access
const { validateEmail, isMissingField } = require('../../utils/validation');
const usersDataFile = 'users.json'; // Path to users data file
const User = require('../../models/user.model');

const router = express.Router();

router.post('/register', (req, res) => {
  const { 
    firstName, 
    lastName, 
    dateOfBirth, 
    gender,
    email, 
    phoneNumber, 
    address,
    profilePicture, 
    spouseFirstName, 
    spouseLastName, 
    relationshipStartDate, 
    username, 
    password  } = req.body;

  // Use validation functions from utils
  if (isMissingField(req.body, 'username', 'password', 'email')) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // if (!validateEmail(email)) return res.status(400).json({ message: 'Invalid email format' })

  // Read existing users from file
  let users = [];
  try {
    const data = fs.readFileSync(usersDataFile, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('Error reading users data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Check for existing user
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  // Create a new user object using the User model
  const newUser = new User(
    Date.now(), // Use a more robust ID generation strategy in production
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    phoneNumber,
    address,
    profilePicture,
    spouseFirstName,
    spouseLastName,
    relationshipStartDate,
    username,
    password, 
  );

  console.log(newUser)

  // Add the user to the data and write it back to the file
  users.push(newUser);
  try {
    fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2)); // Pretty print for readability
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error writing users data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET user by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  // Read existing users from file
  let users = [];
  try {
    const data = fs.readFileSync(usersDataFile, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('Error reading users data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Find user by ID
  const user = users.find(user => user.id.toString() === userId); // Handle ID type conversion
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body; // Allow updating username and email

  // Validation (improve as needed)
  if (isMissingField(req.body, 'username', 'email')) {
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

  // Find user by ID
  const userIndex = users.findIndex(user => user.id.toString() === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user data
  users[userIndex].username = username;
  users[userIndex].email = email;

  // Write updated users data to file
  try {
    fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error writing users data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  // Read existing users from file
  let users = [];
  try {
    const data = fs.readFileSync(usersDataFile, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('Error reading users data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Find user by ID and remove it from the array
  const userIndex = users.findIndex(user => user.id.toString() === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);

  // Write updated users data to file
  try {
    fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'User deleted successfully' }); // Success message
  } catch (err) {
    console.error('Error writing users data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
