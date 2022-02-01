// createConnection - we have to manage from our side we have to do and close the connection
// createPool - we can create a pool of connections
const { 
    createPool
} = require('mysql');

const pool = createPool ({
    host: "localhost",
    user:"root",
    password: "",
    database: "test",
    connectionLimit: 10
})

pool.query(`select * from <schema>`, (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log(result);
})

// this makes pool be accessible to other files
module.exports = pool;