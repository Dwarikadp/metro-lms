require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('DATABASE_URL or SUPABASE_DB_URL is not set. The backend will not start until a Postgres database is configured.');
}

function validateConnectionString(value) {
  if (!value) return;
  try {
    const url = new URL(value);
    const host = url.hostname || '';
    if (!host.includes('supabase.co') && host !== 'localhost') {
      console.warn(`DATABASE_URL points to "${host}". On Render this usually means the env var value is malformed or incomplete.`);
    }
  } catch (error) {
    console.warn('DATABASE_URL is not a valid URL. Check that it starts with postgresql:// and contains the full Supabase host.');
  }
}

validateConnectionString(connectionString);

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' || process.env.SUPABASE_DB_URL
    ? { rejectUnauthorized: false }
    : false,
});

async function query(text, params = []) {
  const res = await pool.query(text, params);
  return res.rows;
}

async function get(text, params = []) {
  const rows = await query(text, params);
  return rows[0] || null;
}

async function all(text, params = []) {
  return query(text, params);
}

async function run(text, params = []) {
  const res = await pool.query(text, params);
  return { changes: res.rowCount, lastID: res.rows[0]?.id || null };
}

async function ensureSchema() {
  const statements = [
    `
      CREATE TABLE IF NOT EXISTS admins (
        username TEXT PRIMARY KEY,
        name TEXT NOT NULL DEFAULT '',
        password TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS employees (
        id BIGSERIAL PRIMARY KEY,
        emp_id TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        email TEXT NOT NULL DEFAULT '',
        department TEXT NOT NULL DEFAULT '',
        role TEXT NOT NULL DEFAULT '',
        modules TEXT NOT NULL DEFAULT '',
        password TEXT NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_active TIMESTAMPTZ
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS progress (
        id BIGSERIAL PRIMARY KEY,
        emp_id TEXT NOT NULL REFERENCES employees(emp_id) ON DELETE CASCADE,
        module TEXT NOT NULL,
        topic TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT TRUE,
        score INTEGER,
        time_spent INTEGER NOT NULL DEFAULT 0,
        completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (emp_id, module, topic)
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS quiz_results (
        id BIGSERIAL PRIMARY KEY,
        emp_id TEXT NOT NULL REFERENCES employees(emp_id) ON DELETE CASCADE,
        module TEXT NOT NULL,
        quiz_type TEXT NOT NULL DEFAULT 'module',
        score INTEGER NOT NULL DEFAULT 0,
        passed BOOLEAN NOT NULL DEFAULT FALSE,
        taken_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS certificates (
        id BIGSERIAL PRIMARY KEY,
        emp_id TEXT NOT NULL UNIQUE REFERENCES employees(emp_id) ON DELETE CASCADE,
        cert_id TEXT NOT NULL UNIQUE,
        modules JSONB NOT NULL,
        scores JSONB NOT NULL,
        issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    `CREATE INDEX IF NOT EXISTS idx_progress_emp ON progress(emp_id)`,
    `CREATE INDEX IF NOT EXISTS idx_progress_module ON progress(module)`,
    `CREATE INDEX IF NOT EXISTS idx_quiz_emp ON quiz_results(emp_id)`,
    `CREATE INDEX IF NOT EXISTS idx_cert_emp ON certificates(emp_id)`,
  ];

  for (const statement of statements) {
    await pool.query(statement);
  }

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Metro@Admin123';
  const existing = await get('SELECT username FROM admins LIMIT 1');
  if (!existing) {
    await run(
      'INSERT INTO admins (username, name, password) VALUES ($1, $2, $3)',
      [adminUsername, 'Metro Admin', bcrypt.hashSync(adminPassword, 10)]
    );
  }
}

module.exports = {
  pool,
  query,
  get,
  all,
  run,
  ensureSchema,
};
