// backend/db.js  — drop-in PostgreSQL replacement
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Thin wrapper so the rest of server.js stays the same shape
const db = {
  // Synchronous-style interface mapped to async pool queries
  // Use these in async route handlers
  async query(sql, params = []) {
    const res = await pool.query(sql, params);
    return res.rows;
  },
  async get(sql, params = []) {
    const res = await pool.query(sql, params);
    return res.rows[0] || null;
  },
  async run(sql, params = []) {
    const res = await pool.query(sql, params);
    return { changes: res.rowCount, lastID: res.rows[0]?.id };
  }
};

module.exports = db;