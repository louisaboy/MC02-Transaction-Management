// createConnection - we have to manage from our side we have to do and close the connection
// createPool - we can create a pool of connections
const mysql = require('mysql');
require('dotenv').config();

// connectionLimit how many parallel connections you want
// Create connection to MySQL
const pool = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
// 
pool.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql Connected');
})
// this makes pool be accessible to other files
module.exports = pool;