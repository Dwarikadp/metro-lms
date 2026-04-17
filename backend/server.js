require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const path    = require('path');
const db      = require('./db');
const { authMiddleware, adminMiddleware, JWT_SECRET } = require('./middleware');

const app  = express();
const PORT = process.env.PORT || 3001;


// ── SSE: live push to admin dashboard ───────────────────────
const adminClients = new Set();

function pushToAdmin(event, data) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  adminClients.forEach(client => {
    try { client.write(msg); } catch(e) { adminClients.delete(client); }
  });
}

// ── MIDDLEWARE ────────────────────────────────────────────
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
// Static files served via explicit routes below (no wildcard static)

// ═══════════════════════════════════════════════════════
//  AUTH ROUTES
// ═══════════════════════════════════════════════════════

// Employee Login
app.post('/api/auth/login', (req, res) => {
  const { emp_id, password } = req.body;
  if (!emp_id || !password) {
    return res.status(400).json({ error: 'Employee ID and password are required' });
  }

  const emp = db.prepare('SELECT * FROM employees WHERE emp_id = ? AND is_active = 1').get(emp_id.trim().toUpperCase());
  if (!emp) {
    return res.status(401).json({ error: 'Employee ID not found or access has been deactivated. Please contact HR.' });
  }

  const passwordMatch = bcrypt.compareSync(password, emp.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Incorrect password. Please contact HR if you have not set a password.' });
  }

  const token = jwt.sign(
    { emp_id: emp.emp_id, name: emp.name, role: emp.role, modules: emp.modules, isAdmin: false },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: {
      emp_id: emp.emp_id,
      name:   emp.name,
      email:  emp.email,
      role:   emp.role,
      department: emp.department,
      modules: emp.modules.split(',')
    }
  });
});

// Admin Login
app.post('/api/auth/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  const token = jwt.sign(
    { username: admin.username, name: admin.name, isAdmin: true },
    JWT_SECRET,
    { expiresIn: '12h' }
  );

  res.json({ token, admin: { username: admin.username, name: admin.name } });
});

// Verify token
app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ═══════════════════════════════════════════════════════
//  EMPLOYEE ROUTES (protected)
// ═══════════════════════════════════════════════════════

// Get my progress
app.get('/api/me/progress', authMiddleware, (req, res) => {
  const rows = db.prepare('SELECT * FROM progress WHERE emp_id = ?').all(req.user.emp_id);
  const results = db.prepare('SELECT * FROM quiz_results WHERE emp_id = ?').all(req.user.emp_id);
  const cert = db.prepare('SELECT * FROM certificates WHERE emp_id = ?').get(req.user.emp_id);
  res.json({ progress: rows, quiz_results: results, certificate: cert || null });
});

// Save topic completion
app.post('/api/me/progress/topic', authMiddleware, (req, res) => {
  const { module, topic, score, time_spent } = req.body;
  if (!module || !topic) return res.status(400).json({ error: 'module and topic required' });

  db.prepare(`
    INSERT INTO progress (emp_id, module, topic, completed, score, time_spent, completed_at)
    VALUES (?, ?, ?, 1, ?, ?, datetime('now'))
    ON CONFLICT(emp_id, module, topic) DO UPDATE SET
      completed = 1, score = excluded.score,
      time_spent = excluded.time_spent, completed_at = excluded.completed_at
  `).run(req.user.emp_id, module, topic, score || null, time_spent || 0);

  // broadcast live update to admin
  const emp = db.prepare('SELECT name FROM employees WHERE emp_id = ?').get(req.user.emp_id);
  pushToAdmin('progress', {
    emp_id: req.user.emp_id,
    name:   emp ? emp.name : req.user.emp_id,
    module, topic,
    type:   'topic',
    time:   new Date().toISOString()
  });

  res.json({ ok: true });
});

// Save quiz result
app.post('/api/me/quiz', authMiddleware, (req, res) => {
  const { module, quiz_type, score, passed } = req.body;
  if (!module || score === undefined) return res.status(400).json({ error: 'module and score required' });

  db.prepare(`
    INSERT INTO quiz_results (emp_id, module, quiz_type, score, passed)
    VALUES (?, ?, ?, ?, ?)
  `).run(req.user.emp_id, module, quiz_type || 'module', score, passed ? 1 : 0);

  // broadcast live update to admin
  const empQ = db.prepare('SELECT name FROM employees WHERE emp_id = ?').get(req.user.emp_id);
  pushToAdmin('quiz', {
    emp_id: req.user.emp_id,
    name:   empQ ? empQ.name : req.user.emp_id,
    module, score, passed: passed ? 1 : 0,
    time:   new Date().toISOString()
  });

  res.json({ ok: true });
});

// Issue certificate
app.post('/api/me/certificate', authMiddleware, (req, res) => {
  const { modules, scores } = req.body;
  if (!modules || !scores) return res.status(400).json({ error: 'modules and scores required' });

  const existing = db.prepare('SELECT * FROM certificates WHERE emp_id = ?').get(req.user.emp_id);
  if (existing) return res.json({ certificate: existing });

  const cert_id = `MG-FV-${req.user.emp_id}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  db.prepare(`
    INSERT INTO certificates (emp_id, cert_id, modules, scores)
    VALUES (?, ?, ?, ?)
  `).run(req.user.emp_id, cert_id, JSON.stringify(modules), JSON.stringify(scores));

  const cert = db.prepare('SELECT * FROM certificates WHERE cert_id = ?').get(cert_id);
  pushToAdmin('certificate', {
    emp_id:  req.user.emp_id,
    name:    req.user.name,
    cert_id, modules,
    time:    new Date().toISOString()
  });
  res.json({ certificate: cert });
});

// Verify certificate (public)
app.get('/api/certificate/verify/:cert_id', (req, res) => {
  const cert = db.prepare(`
    SELECT c.*, e.name, e.role, e.department
    FROM certificates c JOIN employees e ON c.emp_id = e.emp_id
    WHERE c.cert_id = ?
  `).get(req.params.cert_id);

  if (!cert) return res.status(404).json({ error: 'Certificate not found' });
  res.json({ valid: true, certificate: cert });
});

// ═══════════════════════════════════════════════════════
//  ADMIN ROUTES (admin-only)
// ═══════════════════════════════════════════════════════

// Get all employees
app.get('/api/admin/employees', adminMiddleware, async (req, res) => {
  try {
    const employees = await db.query('SELECT * FROM employees ORDER BY created_at DESC');
    res.json({ employees });
  } catch(e) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get single employee detail
app.get('/api/admin/employees/:emp_id', adminMiddleware, (req, res) => {
  const emp = db.prepare('SELECT * FROM employees WHERE emp_id = ?').get(req.params.emp_id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });

  const progress = db.prepare('SELECT * FROM progress WHERE emp_id = ? ORDER BY completed_at DESC').all(req.params.emp_id);
  const quizzes  = db.prepare('SELECT * FROM quiz_results WHERE emp_id = ? ORDER BY taken_at DESC').all(req.params.emp_id);
  const cert     = db.prepare('SELECT * FROM certificates WHERE emp_id = ?').get(req.params.emp_id);

  res.json({ ...emp, password: undefined, progress, quizzes, certificate: cert || null });
});

// Create employee
app.post('/api/admin/employees', adminMiddleware, (req, res) => {
  const { emp_id, name, email, department, role, modules, password } = req.body;
  if (!emp_id || !name || !modules) {
    return res.status(400).json({ error: 'emp_id, name and modules are required' });
  }

  const existing = db.prepare('SELECT id FROM employees WHERE emp_id = ?').get(emp_id.toUpperCase());
  if (existing) return res.status(409).json({ error: `Employee ID ${emp_id} already exists` });

  const rawPwd = password || (emp_id.toUpperCase() + '@Metro');
  const hash   = bcrypt.hashSync(rawPwd, 10);

  db.prepare(`
    INSERT INTO employees (emp_id, name, email, department, role, modules, password, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(emp_id.toUpperCase(), name, email || '', department || '', role || '', modules, hash, req.user.username);

  res.json({ ok: true, emp_id: emp_id.toUpperCase(), default_password: rawPwd });
});

// Update employee
app.put('/api/admin/employees/:emp_id', adminMiddleware, (req, res) => {
  const { name, email, department, role, modules, is_active } = req.body;
  const emp = db.prepare('SELECT id FROM employees WHERE emp_id = ?').get(req.params.emp_id);
  if (!emp) return res.status(404).json({ error: 'Employee not found' });

  db.prepare(`
    UPDATE employees SET
      name = COALESCE(?, name),
      email = COALESCE(?, email),
      department = COALESCE(?, department),
      role = COALESCE(?, role),
      modules = COALESCE(?, modules),
      is_active = COALESCE(?, is_active)
    WHERE emp_id = ?
  `).run(name, email, department, role, modules, is_active, req.params.emp_id);

  res.json({ ok: true });
});

// Reset employee password
app.post('/api/admin/employees/:emp_id/reset-password', adminMiddleware, (req, res) => {
  const newPwd = req.body.password || (req.params.emp_id + '@Metro');
  const hash   = bcrypt.hashSync(newPwd, 10);
  db.prepare('UPDATE employees SET password = ? WHERE emp_id = ?').run(hash, req.params.emp_id);
  res.json({ ok: true, new_password: newPwd });
});

// Delete / deactivate employee
app.delete('/api/admin/employees/:emp_id', adminMiddleware, (req, res) => {
  db.prepare('UPDATE employees SET is_active = 0 WHERE emp_id = ?').run(req.params.emp_id);
  res.json({ ok: true });
});

// Bulk create employees (CSV import)
app.post('/api/admin/employees/bulk', adminMiddleware, (req, res) => {
  const { employees } = req.body;
  if (!Array.isArray(employees)) return res.status(400).json({ error: 'employees array required' });

  const insert = db.prepare(`
    INSERT OR IGNORE INTO employees (emp_id, name, email, department, role, modules, password, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const results = [];
  const insertMany = db.transaction((emps) => {
    for (const e of emps) {
      const rawPwd = e.password || (e.emp_id.toUpperCase() + '@Metro');
      const hash   = bcrypt.hashSync(rawPwd, 10);
      const info   = insert.run(e.emp_id.toUpperCase(), e.name, e.email || '', e.department || '', e.role || '', e.modules || 'CRM', hash, req.user.username);
      results.push({ emp_id: e.emp_id.toUpperCase(), created: info.changes > 0, default_password: rawPwd });
    }
  });
  insertMany(employees);
  res.json({ ok: true, results });
});

// Dashboard stats
app.get('/api/admin/stats', adminMiddleware, (req, res) => {
  const total      = db.prepare('SELECT COUNT(*) as c FROM employees WHERE is_active = 1').get().c;
  const started    = db.prepare('SELECT COUNT(DISTINCT emp_id) as c FROM progress WHERE completed = 1').get().c;
  const certs      = db.prepare('SELECT COUNT(*) as c FROM certificates').get().c;
  const quizzes    = db.prepare('SELECT COUNT(*) as c FROM quiz_results WHERE passed = 1').get().c;
  const avgScore   = db.prepare('SELECT AVG(score) as a FROM quiz_results WHERE passed = 1').get().a;
  const modStats   = db.prepare(`
    SELECT module, COUNT(DISTINCT emp_id) as learners, COUNT(*) as topics_done
    FROM progress WHERE completed = 1 GROUP BY module
  `).all();
  const recentActivity = db.prepare(`
    SELECT p.emp_id, e.name, p.module, p.topic, p.completed_at
    FROM progress p JOIN employees e ON p.emp_id = e.emp_id
    WHERE p.completed = 1 ORDER BY p.completed_at DESC LIMIT 10
  `).all();

  res.json({ total, started, certs, quizzes_passed: quizzes, avg_score: Math.round(avgScore || 0), mod_stats: modStats, recent_activity: recentActivity });
});

// Change admin password
app.post('/api/admin/change-password', adminMiddleware, (req, res) => {
  const { old_password, new_password } = req.body;
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(req.user.username);
  if (!bcrypt.compareSync(old_password, admin.password)) {
    return res.status(400).json({ error: 'Current password incorrect' });
  }
  db.prepare('UPDATE admins SET password = ? WHERE username = ?')
    .run(bcrypt.hashSync(new_password, 10), req.user.username);
  res.json({ ok: true });
});

// ── SSE ENDPOINT (admin live updates) ───────────────────────
app.get('/api/admin/live', (req, res) => {
  // EventSource can't send headers, so accept token as query param
  const token = req.query.token || (req.headers['authorization']||'').replace('Bearer ','');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ error: 'Admin only' });
  } catch(e) { return res.status(401).json({ error: 'Invalid token' }); }
  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  res.write('event: connected\ndata: {"status":"connected"}\n\n');
  adminClients.add(res);

  const heartbeat = setInterval(() => {
    try { res.write(':heartbeat\n\n'); } catch(e) { clearInterval(heartbeat); }
  }, 25000);

  req.on('close', () => {
    adminClients.delete(res);
    clearInterval(heartbeat);
  });
});

// ── HTML PAGE ROUTES ────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../admin/index.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/app.html'));
});

// ── START ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Metro Group LMS Backend`);
  console.log(`    Running at  →  http://localhost:${PORT}`);
  console.log(`    Admin panel →  http://localhost:${PORT}/admin`);
  console.log(`    Trainee app →  http://localhost:${PORT}\n`);
});