require('dotenv').config();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

let SQLiteDatabase;
try {
  SQLiteDatabase = require('better-sqlite3');
} catch (err) {
  console.error('better-sqlite3 is required to run the migration script.');
  console.error('Install it temporarily in the backend folder, then run this script again.');
  process.exit(1);
}

const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Missing DATABASE_URL or SUPABASE_DB_URL.');
  process.exit(1);
}

const sqlitePath = path.join(__dirname, 'metro_lms.db');
if (!fs.existsSync(sqlitePath)) {
  console.error(`SQLite database not found at ${sqlitePath}`);
  process.exit(1);
}

const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');
const statements = schemaSql
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean);

async function main() {
  const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' || process.env.SUPABASE_DB_URL
      ? { rejectUnauthorized: false }
      : false,
  });

  const sqlite = new SQLiteDatabase(sqlitePath, { readonly: true });

  try {
    for (const statement of statements) {
      await pool.query(statement);
    }

    const admins = sqlite.prepare('SELECT username, name, password, created_at FROM admins').all();
    const employees = sqlite.prepare('SELECT * FROM employees').all();
    const progress = sqlite.prepare('SELECT * FROM progress').all();
    const quizzes = sqlite.prepare('SELECT * FROM quiz_results').all();
    const certificates = sqlite.prepare('SELECT * FROM certificates').all();

    await pool.query('BEGIN');
    await pool.query('TRUNCATE TABLE certificates, quiz_results, progress, employees, admins RESTART IDENTITY CASCADE');

    for (const row of admins) {
      await pool.query(
        `INSERT INTO admins (username, name, password, created_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (username) DO UPDATE SET
           name = EXCLUDED.name,
           password = EXCLUDED.password,
           created_at = EXCLUDED.created_at`,
        [row.username, row.name || '', row.password, row.created_at || new Date().toISOString()]
      );
    }

    for (const row of employees) {
      await pool.query(
        `INSERT INTO employees
          (id, emp_id, name, email, department, role, modules, password, is_active, created_by, created_at, last_active)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         ON CONFLICT (emp_id) DO UPDATE SET
           name = EXCLUDED.name,
           email = EXCLUDED.email,
           department = EXCLUDED.department,
           role = EXCLUDED.role,
           modules = EXCLUDED.modules,
           password = EXCLUDED.password,
           is_active = EXCLUDED.is_active,
           created_by = EXCLUDED.created_by,
           created_at = EXCLUDED.created_at,
           last_active = EXCLUDED.last_active`,
        [
          row.id || null,
          row.emp_id,
          row.name,
          row.email || '',
          row.department || '',
          row.role || '',
          row.modules || '',
          row.password,
          row.is_active ? true : false,
          row.created_by || '',
          row.created_at || new Date().toISOString(),
          row.last_active || null,
        ]
      );
    }

    for (const row of progress) {
      await pool.query(
        `INSERT INTO progress
          (id, emp_id, module, topic, completed, score, time_spent, completed_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (emp_id, module, topic) DO UPDATE SET
           completed = EXCLUDED.completed,
           score = EXCLUDED.score,
           time_spent = EXCLUDED.time_spent,
           completed_at = EXCLUDED.completed_at`,
        [
          row.id || null,
          row.emp_id,
          row.module,
          row.topic,
          row.completed ? true : false,
          row.score ?? null,
          row.time_spent ?? 0,
          row.completed_at || new Date().toISOString(),
        ]
      );
    }

    for (const row of quizzes) {
      await pool.query(
        `INSERT INTO quiz_results
          (id, emp_id, module, quiz_type, score, passed, taken_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          row.id || null,
          row.emp_id,
          row.module,
          row.quiz_type || 'module',
          row.score ?? 0,
          row.passed ? true : false,
          row.taken_at || new Date().toISOString(),
        ]
      );
    }

    for (const row of certificates) {
      await pool.query(
        `INSERT INTO certificates
          (id, emp_id, cert_id, modules, scores, issued_at)
         VALUES ($1,$2,$3,$4::jsonb,$5::jsonb,$6)
         ON CONFLICT (emp_id) DO UPDATE SET
           cert_id = EXCLUDED.cert_id,
           modules = EXCLUDED.modules,
           scores = EXCLUDED.scores,
           issued_at = EXCLUDED.issued_at`,
        [
          row.id || null,
          row.emp_id,
          row.cert_id,
          JSON.stringify(row.modules || []),
          JSON.stringify(row.scores || {}),
          row.issued_at || new Date().toISOString(),
        ]
      );
    }

    await pool.query('COMMIT');
    console.log('SQLite data migrated successfully to Supabase/Postgres.');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Migration failed:', err);
    process.exitCode = 1;
  } finally {
    sqlite.close();
    await pool.end();
  }
}

main();
