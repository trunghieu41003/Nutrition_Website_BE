const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Gán giá trị mặc định là 3000 nếu PORT không được thiết lập trong .env
const hostname = 'localhost';
const connection = require('./config/database')

// A simple SELECT query
connection.query(
  'SELECT * FROM Product WHERE name_food = "Chicken Breast"',
  function (err, results, fields) {
    if (err) {
      console.error(err);
    } else {
      console.log(results); // logs the details of the food 'Chicken Breast'
      console.log(fields);  // logs extra meta data about results, if available
    }
  }
);
// Close the connection
connection.end();

require('dotenv').config();

// Middleware để phân tích JSON
app.use(express.json()); // Thêm middleware để phân tích body JSON

// Import api.js
const apiRouter = require('./routes/api');
const webRouter = require('./routes/web');

// Sử dụng apiRouter cho các route bắt đầu bằng /api
app.use('/api', apiRouter);
app.use('/',webRouter);

// Lắng nghe server
app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
