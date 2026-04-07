const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new Database(path.join(__dirname, 'metro_lms.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── SCHEMA ──────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id      TEXT    UNIQUE NOT NULL,
    name        TEXT    NOT NULL,
    email       TEXT,
    department  TEXT,
    role        TEXT,
    modules     TEXT    NOT NULL DEFAULT 'CRM',
    password    TEXT    NOT NULL,
    is_active   INTEGER NOT NULL DEFAULT 1,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    created_by  TEXT    NOT NULL DEFAULT 'system'
  );

  CREATE TABLE IF NOT EXISTS admins (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    username  TEXT UNIQUE NOT NULL,
    password  TEXT NOT NULL,
    name      TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS progress (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id      TEXT NOT NULL,
    module      TEXT NOT NULL,
    topic       TEXT NOT NULL,
    completed   INTEGER NOT NULL DEFAULT 0,
    score       INTEGER,
    time_spent  INTEGER DEFAULT 0,
    completed_at TEXT,
    UNIQUE(emp_id, module, topic)
  );

  CREATE TABLE IF NOT EXISTS quiz_results (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id      TEXT NOT NULL,
    module      TEXT NOT NULL,
    quiz_type   TEXT NOT NULL DEFAULT 'module',
    score       INTEGER NOT NULL,
    passed      INTEGER NOT NULL,
    taken_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS certificates (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id       TEXT NOT NULL,
    cert_id      TEXT UNIQUE NOT NULL,
    modules      TEXT NOT NULL,
    scores       TEXT NOT NULL,
    issued_at    TEXT NOT NULL DEFAULT (datetime('now')),
    issued_by    TEXT NOT NULL DEFAULT 'Metro Group'
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id     TEXT NOT NULL,
    token      TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    expires_at TEXT NOT NULL,
    is_admin   INTEGER NOT NULL DEFAULT 0
  );
`);

// ── SEED DEFAULT ADMIN ───────────────────────────────────
const adminExists = db.prepare('SELECT id FROM admins WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('Metro@Admin123', 10);
  db.prepare(`INSERT INTO admins (username, password, name) VALUES (?, ?, ?)`)
    .run('admin', hash, 'HR Administrator');
  console.log('✓ Default admin created  →  username: admin  |  password: Metro@Admin123');
}

// ── SEED SAMPLE EMPLOYEES ────────────────────────────────
const sampleEmployees = [
  { emp_id: 'EMP001', name: 'Rahul Sharma',   email: 'rahul@metrogroup.com',   dept: 'Sales',    role: 'CRM Executive',    modules: 'CRM' },
  { emp_id: 'EMP002', name: 'Priya Mehta',    email: 'priya@metrogroup.com',   dept: 'HR',       role: 'HR Executive',     modules: 'ELC' },
  { emp_id: 'EMP003', name: 'Amit Patel',     email: 'amit@metrogroup.com',    dept: 'Finance',  role: 'Payroll Executive',modules: 'Payroll' },
  { emp_id: 'EMP004', name: 'Sneha Joshi',    email: 'sneha@metrogroup.com',   dept: 'IT',       role: 'System Admin',     modules: 'Administration' },
  { emp_id: 'EMP005', name: 'Vikram Nair',    email: 'vikram@metrogroup.com',  dept: 'Sales',    role: 'Sales Manager',    modules: 'CRM,ELC' },
];

const insertEmp = db.prepare(`
  INSERT OR IGNORE INTO employees (emp_id, name, email, department, role, modules, password, created_by)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

sampleEmployees.forEach(e => {
  const hash = bcrypt.hashSync(e.emp_id + '@Metro', 10);
  insertEmp.run(e.emp_id, e.name, e.email, e.dept, e.role, e.modules, hash, 'system');
});

console.log('✓ Database ready  →  metro_lms.db');
module.exports = db;