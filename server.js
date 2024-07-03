const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');

const fs = require('fs');
const usersDataFile = 'users.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes); 
app.use('/auth', authRoutes); 
app.use('/car', carRoutes); 
// (We'll add more code here for functionalities)

const port =  3000; // Use environment variable for port or default to 3000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});