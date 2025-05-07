const express = require('express');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
const path = require('path');
const file = fs.readFileSync(path.resolve('swagger_api_doc.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);
const cors = require('cors'); // Import cors

const port = process.env.PORT
const hostname = '0.0.0.0';

const authroutes = require('./routes/auth.routes');
const mymealroutes = require('./routes/mymeal.routes');
const reportroutes = require('./routes/report.routes');
const settingroutes = require('./routes/setting.routes');
const dashboardroutes = require('./routes/dashboard.routes');
const authenticateToken = require('./middleware/jwt');

app.use(cors()); // Sử dụng middleware cors để xử lý CORS
// Middleware to parse JSON
app.use(express.json()); // Add middleware to parse JSON body
// Đăng ký các routes RESTful cho API

app.use('/api', authroutes);
app.use('/api/auth', authenticateToken, mymealroutes);
app.use('/api/auth', authenticateToken, reportroutes);
app.use('/api/auth', authenticateToken, settingroutes);
app.use('/api/auth', authenticateToken, dashboardroutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`);
});
