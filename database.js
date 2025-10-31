const mysql = require('mysql2')

// Load environment variables from .env if present
try {
  require('dotenv').config()
} catch (e) {
  // dotenv may not be installed in some environments; fallback to process.env
}

const pool = mysql.createPool({
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'username',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'database',
  waitForConnections: true,
  queueLimit: 0,
})

// Use promise-based pool for convenience
const promisePool = pool.promise()

async function testConnection() {
  // Try a simple query to validate connectivity
  try {
    await promisePool.query('SELECT 1')
    return true
  } catch (err) {
    // rethrow so callers can decide how to handle
    throw err
  }
}

module.exports = { pool, promisePool, testConnection }