const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const path = require('path'); 
const file  = fs.readFileSync(path.resolve('swagger_api_doc.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);
const cors = require('cors'); // Import cors

const port = process.env.PORT || 3000; // Default port is 3000
const hostname = 'localhost';

const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const reportRoutes = require('./routes/reportRoutes');
const settingRoutes = require('./routes/settingRoutes');
const authenticateToken = require('./middleware/jwt');
require('dotenv').config();

app.use(cors()); // Sử dụng middleware cors để xử lý CORS
// Middleware to parse JSON
app.use(express.json()); // Add middleware to parse JSON body
// Đăng ký các routes RESTful cho API

app.use('/api', userRoutes);
app.use('/api', mealRoutes);
app.use('/api', reportRoutes);
app.use('/api',settingRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://${hostname}:${port}`);
});
