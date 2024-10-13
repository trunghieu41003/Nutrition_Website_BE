const express = require('express');
const app = express();

const port = process.env.PORT || 3000; // Default port is 3000
const hostname = 'localhost';

const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json()); // Add middleware to parse JSON body

// Đăng ký các routes RESTful cho API
app.use('/api', foodRoutes);
app.use('/api', userRoutes);
app.use('/api', mealRoutes);
app.use('/api', diaryRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://${hostname}:${port}`);
});
