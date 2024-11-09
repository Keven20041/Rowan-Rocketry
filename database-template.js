const mysql = require('mysql2')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "username",
    password: "password",
    database: "database"
})

module.exports = pool