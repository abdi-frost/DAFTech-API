// routes/car/car.js
const express = require('express');
const fs = require('fs'); // For file system access
const { validateEmail, isMissingField } = require('../../utils/validation');
const usersDataFile = 'users.json'; // Path to users data file
const Car = require('../../models/car.model');

const router = express.Router();


// GET all cars for a user
router.get('/:userId/cars', (req, res) => {
    const userId = req.params.userId;

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
    const user = users.find(user => user.id.toString() === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Filter cars associated with the user (assuming a cars property in the user object)
    const userCars = user.cars || []; // Handle cases where the user might not have any cars

    res.status(200).json(userCars);
});

// Nested routes for car CRUD operations within a specific user (assuming a cars property in the user object)
router.get('/:userId/cars', (req, res, next) => {
    const userId = req.params.userId;

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
    const user = users.find(user => user.id.toString() === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user object to the request for access in subsequent car routes
    req.user = user;
    next();
});

// GET car by ID for a user
// router.get('/:userId/cars/:carId', (req, res) => {
//     const userId = req.params.userId;
//     const carId = req.params.carId;

//     const user = req.user; // Access user object attached in the middleware

//     // Find the car by ID within the user's cars array
//     const car = user.cars?.find(car => car.id.toString() === carId); // Handle cases where user might not have cars

//     if (!car) {
//         return res.status(404).json({ message: 'Car not found' });
//     }

//     res.status(200).json(car);
// });

router.get('/:userId/cars/:carId', (req, res) => {
    const userId = req.params.userId;
    const carId = req.params.carId;

    // Read existing users from file (assuming users data is stored in a file)
    let users = [];
    try {
        const data = fs.readFileSync(usersDataFile, 'utf8');
        users = JSON.parse(data);
    } catch (err) {
        console.error('Error reading users data:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    // Find user by ID
    const user = users.find(user => user.id.toString() === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Find the car by ID within the user's cars array
    const car = user.cars?.find(car => car.id.toString() === carId); // Handle cases where user might not have cars

    if (!car) {
        return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(car);
});


// POST create car for a user
// router.post('/:userId/cars', (req, res) => {
//     const userId = req.params.userId;
//     const newCarData = req.body; // Car data from the request body

//     // Validation (optional but recommended)
//     if (!newCarData || !newCarData.make || !newCarData.model || !newCarData.year) {
//         return res.status(400).json({ message: 'Missing required car data (make, model, year)' });
//     }

//     // Read existing users from file
//     let users = [];
//     try {
//         const data = fs.readFileSync(usersDataFile, 'utf8');
//         users = JSON.parse(data);
//     } catch (err) {
//         console.error('Error reading users data:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//     }

//     // Find user by ID
//     const user = users.find(user => user.id.toString() === userId);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate a unique car ID (assuming you don't have one already)
//     let newCarId = 1; // Replace with logic to generate a unique ID
//     if (user.cars && user.cars.length > 0) {
//         newCarId = Math.max(...user.cars.map(car => car.id)) + 1;
//     }

//     // Create new car object
//     const newCar = {
//         id: newCarId,
//         ...newCarData, // Spread operator to include make, model, year from request body
//     };

//     // Add car to user's cars array (assuming a cars property exists)
//     user.cars = user.cars || []; // Initialize cars array if it doesn't exist
//     user.cars.push(newCar);

//     // Write updated user data to file
//     try {
//         fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));
//     } catch (err) {
//         console.error('Error writing user data:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//     }

//     res.status(201).json({ message: 'Car created successfully', car: newCar });
// });

router.post('/:userId/cars', (req, res) => {
  const userId = req.params.userId;
  const newCarData = req.body; // Car data from the request body

  // Validation (optional but recommended)
  if (!newCarData || !newCarData.model || !newCarData.year || !newCarData.plateNumber) {
    return res.status(400).json({ message: 'Missing required car data (make, model, year)' });
  }

  // Read existing users from data source (replace with your logic)
  let users = [];
  try {
    const data = fs.readFileSync(usersDataFile, 'utf8'); // Replace with your data retrieval method
    users = JSON.parse(data);
  } catch (err) {
    console.error('Error reading user data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Find user by ID
  const user = users.find(user => user.id.toString() === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a unique car ID (replace with a robust strategy)
  let newCarId = 1; // Replace with logic to generate a unique ID
  if (user.cars && user.cars.length > 0) {
    newCarId = Math.max(...user.cars.map(car => car.id)) + 1;
  }

  // Create new car object using the Car class
  const newCar = new Car(newCarId, userId, newCarData.model, newCarData.year, newCarData.plateNumber, newCarData.color, newCarData.mileage, newCarData.imageUrl);

  // Add car to user's cars array (assuming a cars property exists)
  user.cars = user.cars || []; // Initialize cars array if it doesn't exist
  user.cars.push(newCar);

  // Write updated user data to data source (replace with your logic)
  try {
    fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2)); // Replace with your data storage method
  } catch (err) {
    console.error('Error writing user data:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }

  res.status(201).json({ message: 'Car created successfully', car: newCar });
});


// PUT update car for a user
router.put('/:userId/cars/:carId', (req, res) => {
    const userId = req.params.userId;
    const carId = req.params.carId;
    const updatedCarData = req.body; // Updated car data from request body

    // Validation (optional but recommended)
    if (!updatedCarData || !updatedCarData.make || !updatedCarData.model || !updatedCarData.year) {
        return res.status(400).json({ message: 'Missing required car data (make, model, year)' });
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
    const user = users.find(user => user.id.toString() === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Find the car to update by ID within the user's cars array
    const carIndex = user.cars?.findIndex(car => car.id.toString() === carId);
    if (carIndex === -1) {
        return res.status(404).json({ message: 'Car not found' });
    }

    // Update car details with data from request body
    user.cars[carIndex] = { ...user.cars[carIndex], ...updatedCarData };

    // Write updated user data to file
    try {
        fs.writeFileSync(usersDataFile, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error writing user data:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({ message: 'Car updated successfully' });
});

module.exports = router;
