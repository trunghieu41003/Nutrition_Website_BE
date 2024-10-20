const express = require('express');
const app = express();

const port = process.env.PORT || 3000; // Default port is 3000
const hostname = 'localhost';

const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authenticateToken = require('./middleware/jwt');
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json()); // Add middleware to parse JSON body

// Đăng ký các routes RESTful cho API
app.use('/api', userRoutes);
app.use('/api', mealRoutes);
app.use('/api', reportRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://${hostname}:${port}`);
});
