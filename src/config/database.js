const mysql = require('mysql2');
const connection  = mysql.createPool ({
    host: '127.0.0.1',
    user: 'root',
    password: 'Trunghieu2003',
    database: 'healthcare',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;