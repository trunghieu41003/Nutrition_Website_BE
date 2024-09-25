const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Default port is 3000
const hostname = 'localhost';
const connection = require('./config/database'); // Import the connection pool
const foodRoutes = require('./routes/foodRoutes');
require('dotenv').config();

// Middleware to parse JSON
app.use(express.json()); // Add middleware to parse JSON body

// Đăng ký các routes RESTful cho API
app.use('/api/foods', foodRoutes);

// A simple endpoint to test the database connection
app.get('/test-query', (req, res) => {
    connection.query(
        'SELECT * FROM foods WHERE name = "Apple" ',
        (err, results, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database query failed' });
            }
            console.log(results); // logs the details of the food 'Chicken Breast'
            return res.json(results); // Send results as a JSON response
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://${hostname}:${port}`);
});
