require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./db');
const { authMiddleware, adminMiddleware, JWT_SECRET } = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3001;
const adminClients = new Set();

function pushToAdmin(event, data) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  adminClients.forEach((client) => {
    try {
      client.write(msg);
    } catch (e) {
      adminClients.delete(client);
    }
  });
}

function normalizeModules(modules) {
  if (Array.isArray(modules)) return modules.join(',');
  return String(modules || '').split(',').map((m) => m.trim()).filter(Boolean).join(',');
}

function toArray(modules) {
  if (!modules) return [];
  if (Array.isArray(modules)) return modules;
  return String(modules).split(',').map((m) => m.trim()).filter(Boolean);
}

function mapEmployeeRow(row) {
  if (!row) return null;
  return {
    ...row,
    is_active: row.is_active,
    topics_done: Number(row.topics_done || 0),
    quizzes_passed: Number(row.quizzes_passed || 0),
    has_cert: !!row.has_cert,
  };
}

async function touchEmployee(empId) {
  await db.run('UPDATE employees SET last_active = NOW() WHERE emp_id = $1', [empId]);
}

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.post('/api/auth/login', async (req, res) => {
  try {
    const { emp_id, password } = req.body;
    if (!emp_id || !password) {
      return res.status(400).json({ error: 'Employee ID and password are required' });
    }

    const emp = await db.get(
      'SELECT * FROM employees WHERE emp_id = $1 AND is_active = TRUE',
      [emp_id.trim().toUpperCase()]
    );

    if (!emp) {
      return res.status(401).json({ error: 'Employee ID not found or access has been deactivated. Please contact HR.' });
    }

    if (!bcrypt.compareSync(password, emp.password)) {
      return res.status(401).json({ error: 'Incorrect password. Please contact HR if you have not set a password.' });
    }

    await touchEmployee(emp.emp_id);

    const token = jwt.sign(
      { emp_id: emp.emp_id, name: emp.name, role: emp.role, modules: emp.modules, isAdmin: false },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        emp_id: emp.emp_id,
        name: emp.name,
        email: emp.email,
        role: emp.role,
        department: emp.department,
        modules: toArray(emp.modules),
      },
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const admin = await db.get('SELECT * FROM admins WHERE username = $1', [username]);
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { username: admin.username, name: admin.name, isAdmin: true },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ token, admin: { username: admin.username, name: admin.name } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

app.get('/api/me/progress', authMiddleware, async (req, res) => {
  try {
    const [progress, quizResults, certificate] = await Promise.all([
      db.all('SELECT * FROM progress WHERE emp_id = $1 ORDER BY completed_at DESC', [req.user.emp_id]),
      db.all('SELECT * FROM quiz_results WHERE emp_id = $1 ORDER BY taken_at DESC', [req.user.emp_id]),
      db.get('SELECT * FROM certificates WHERE emp_id = $1', [req.user.emp_id]),
    ]);
    res.json({ progress, quiz_results: quizResults, certificate: certificate || null });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/me/progress/topic', authMiddleware, async (req, res) => {
  try {
    const { module, topic, score, time_spent } = req.body;
    if (!module || !topic) return res.status(400).json({ error: 'module and topic required' });

    await db.run(
      `
      INSERT INTO progress (emp_id, module, topic, completed, score, time_spent, completed_at)
      VALUES ($1, $2, $3, TRUE, $4, $5, NOW())
      ON CONFLICT (emp_id, module, topic) DO UPDATE SET
        completed = TRUE,
        score = EXCLUDED.score,
        time_spent = EXCLUDED.time_spent,
        completed_at = EXCLUDED.completed_at
      `,
      [req.user.emp_id, module, topic, score ?? null, time_spent ?? 0]
    );

    await touchEmployee(req.user.emp_id);
    const emp = await db.get('SELECT name FROM employees WHERE emp_id = $1', [req.user.emp_id]);
    pushToAdmin('progress', {
      emp_id: req.user.emp_id,
      name: emp ? emp.name : req.user.emp_id,
      module,
      topic,
      type: 'topic',
      time: new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/me/quiz', authMiddleware, async (req, res) => {
  try {
    const { module, quiz_type, score, passed } = req.body;
    if (!module || score === undefined) return res.status(400).json({ error: 'module and score required' });

    await db.run(
      `
      INSERT INTO quiz_results (emp_id, module, quiz_type, score, passed, taken_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      `,
      [req.user.emp_id, module, quiz_type || 'module', score, !!passed]
    );

    await touchEmployee(req.user.emp_id);
    const emp = await db.get('SELECT name FROM employees WHERE emp_id = $1', [req.user.emp_id]);
    pushToAdmin('quiz', {
      emp_id: req.user.emp_id,
      name: emp ? emp.name : req.user.emp_id,
      module,
      score,
      passed: passed ? 1 : 0,
      time: new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/me/certificate', authMiddleware, async (req, res) => {
  try {
    const { modules, scores } = req.body;
    if (!modules || !scores) return res.status(400).json({ error: 'modules and scores required' });

    const existing = await db.get('SELECT * FROM certificates WHERE emp_id = $1', [req.user.emp_id]);
    if (existing) return res.json({ certificate: existing });

    const cert_id = `MG-FV-${req.user.emp_id}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    await db.run(
      `
      INSERT INTO certificates (emp_id, cert_id, modules, scores, issued_at)
      VALUES ($1, $2, $3::jsonb, $4::jsonb, NOW())
      `,
      [req.user.emp_id, cert_id, JSON.stringify(modules), JSON.stringify(scores)]
    );

    await touchEmployee(req.user.emp_id);
    const cert = await db.get('SELECT * FROM certificates WHERE cert_id = $1', [cert_id]);
    pushToAdmin('certificate', {
      emp_id: req.user.emp_id,
      name: req.user.name,
      cert_id,
      modules,
      time: new Date().toISOString(),
    });

    res.json({ certificate: cert });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/certificate/verify/:cert_id', async (req, res) => {
  try {
    const cert = await db.get(
      `
      SELECT c.*, e.name, e.role, e.department
      FROM certificates c
      JOIN employees e ON c.emp_id = e.emp_id
      WHERE c.cert_id = $1
      `,
      [req.params.cert_id]
    );

    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json({ valid: true, certificate: cert });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/admin/employees', adminMiddleware, async (req, res) => {
  try {
    const employees = await db.all(
      `
      SELECT
        e.*,
        COALESCE(tp.topics_done, 0)::int AS topics_done,
        COALESCE(qp.quizzes_passed, 0)::int AS quizzes_passed,
        c.cert_id,
        c.issued_at AS cert_issued_at,
        (c.emp_id IS NOT NULL) AS has_cert
      FROM employees e
      LEFT JOIN (
        SELECT emp_id, COUNT(*)::int AS topics_done
        FROM progress
        WHERE completed = TRUE
        GROUP BY emp_id
      ) tp ON tp.emp_id = e.emp_id
      LEFT JOIN (
        SELECT emp_id, COUNT(*) FILTER (WHERE passed = TRUE)::int AS quizzes_passed
        FROM quiz_results
        GROUP BY emp_id
      ) qp ON qp.emp_id = e.emp_id
      LEFT JOIN certificates c ON c.emp_id = e.emp_id
      ORDER BY e.created_at DESC
      `
    );
    res.json({ employees: employees.map(mapEmployeeRow) });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/admin/employees/:emp_id', adminMiddleware, async (req, res) => {
  try {
    const emp = await db.get('SELECT * FROM employees WHERE emp_id = $1', [req.params.emp_id]);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });

    const [progress, quizzes, cert] = await Promise.all([
      db.all('SELECT * FROM progress WHERE emp_id = $1 ORDER BY completed_at DESC', [req.params.emp_id]),
      db.all('SELECT * FROM quiz_results WHERE emp_id = $1 ORDER BY taken_at DESC', [req.params.emp_id]),
      db.get('SELECT * FROM certificates WHERE emp_id = $1', [req.params.emp_id]),
    ]);

    res.json({ ...emp, password: undefined, modules: emp.modules, progress, quizzes, certificate: cert || null });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/admin/employees', adminMiddleware, async (req, res) => {
  try {
    const { emp_id, name, email, department, role, modules, password } = req.body;
    if (!emp_id || !name || !modules) {
      return res.status(400).json({ error: 'emp_id, name and modules are required' });
    }

    const normalizedId = emp_id.toUpperCase();
    const existing = await db.get('SELECT id FROM employees WHERE emp_id = $1', [normalizedId]);
    if (existing) return res.status(409).json({ error: `Employee ID ${emp_id} already exists` });

    const rawPwd = password || `${normalizedId}@Metro`;
    const hash = bcrypt.hashSync(rawPwd, 10);

    await db.run(
      `
      INSERT INTO employees (emp_id, name, email, department, role, modules, password, created_by, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      `,
      [normalizedId, name, email || '', department || '', role || '', normalizeModules(modules), hash, req.user.username]
    );

    res.json({ ok: true, emp_id: normalizedId, default_password: rawPwd });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/admin/employees/:emp_id', adminMiddleware, async (req, res) => {
  try {
    const { name, email, department, role, modules, is_active } = req.body;
    const emp = await db.get('SELECT id FROM employees WHERE emp_id = $1', [req.params.emp_id]);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });

    await db.run(
      `
      UPDATE employees SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        department = COALESCE($3, department),
        role = COALESCE($4, role),
        modules = COALESCE($5, modules),
        is_active = COALESCE($6, is_active)
      WHERE emp_id = $7
      `,
      [
        name ?? null,
        email ?? null,
        department ?? null,
        role ?? null,
        modules ? normalizeModules(modules) : null,
        is_active === undefined ? null : !!is_active,
        req.params.emp_id,
      ]
    );

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/admin/employees/:emp_id/reset-password', adminMiddleware, async (req, res) => {
  try {
    const newPwd = req.body.password || `${req.params.emp_id}@Metro`;
    await db.run(
      'UPDATE employees SET password = $1 WHERE emp_id = $2',
      [bcrypt.hashSync(newPwd, 10), req.params.emp_id]
    );
    res.json({ ok: true, new_password: newPwd });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/admin/employees/:emp_id', adminMiddleware, async (req, res) => {
  try {
    await db.run('UPDATE employees SET is_active = FALSE WHERE emp_id = $1', [req.params.emp_id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/admin/employees/bulk', adminMiddleware, async (req, res) => {
  try {
    const { employees } = req.body;
    if (!Array.isArray(employees)) return res.status(400).json({ error: 'employees array required' });

    const results = [];
    for (const e of employees) {
      const normalizedId = String(e.emp_id || '').toUpperCase();
      if (!normalizedId || !e.name) {
        results.push({ emp_id: normalizedId || '', created: false, default_password: null });
        continue;
      }
      const rawPwd = e.password || `${normalizedId}@Metro`;
      const hash = bcrypt.hashSync(rawPwd, 10);
      const insert = await db.run(
        `
        INSERT INTO employees (emp_id, name, email, department, role, modules, password, created_by, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
        ON CONFLICT (emp_id) DO NOTHING
        `,
        [
          normalizedId,
          e.name,
          e.email || '',
          e.department || '',
          e.role || '',
          normalizeModules(e.modules || 'CRM'),
          hash,
          req.user.username,
        ]
      );
      results.push({ emp_id: normalizedId, created: insert.changes > 0, default_password: rawPwd });
    }

    res.json({ ok: true, results });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/admin/stats', adminMiddleware, async (req, res) => {
  try {
    const totalRow = await db.get('SELECT COUNT(*)::int AS c FROM employees WHERE is_active = TRUE');
    const startedRow = await db.get('SELECT COUNT(DISTINCT emp_id)::int AS c FROM progress WHERE completed = TRUE');
    const certRow = await db.get('SELECT COUNT(*)::int AS c FROM certificates');
    const quizRow = await db.get('SELECT COUNT(*)::int AS c FROM quiz_results WHERE passed = TRUE');
    const avgRow = await db.get('SELECT AVG(score) AS a FROM quiz_results WHERE passed = TRUE');
    const modStats = await db.all(`
      SELECT module, COUNT(DISTINCT emp_id)::int AS learners, COUNT(*)::int AS topics_done
      FROM progress
      WHERE completed = TRUE
      GROUP BY module
      ORDER BY module
    `);
    const recentActivity = await db.all(`
      SELECT p.emp_id, e.name, p.module, p.topic, p.completed_at
      FROM progress p
      JOIN employees e ON p.emp_id = e.emp_id
      WHERE p.completed = TRUE
      ORDER BY p.completed_at DESC
      LIMIT 10
    `);

    res.json({
      total: totalRow?.c || 0,
      started: startedRow?.c || 0,
      certs: certRow?.c || 0,
      quizzes_passed: quizRow?.c || 0,
      avg_score: Math.round(Number(avgRow?.a || 0)),
      mod_stats: modStats,
      recent_activity: recentActivity,
    });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/admin/change-password', adminMiddleware, async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const admin = await db.get('SELECT * FROM admins WHERE username = $1', [req.user.username]);
    if (!admin || !bcrypt.compareSync(old_password, admin.password)) {
      return res.status(400).json({ error: 'Current password incorrect' });
    }
    await db.run(
      'UPDATE admins SET password = $1 WHERE username = $2',
      [bcrypt.hashSync(new_password, 10), req.user.username]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/admin/live', (req, res) => {
  const token = req.query.token || (req.headers['authorization'] || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ error: 'Admin only' });
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  res.write('event: connected\ndata: {"status":"connected"}\n\n');
  adminClients.add(res);

  const heartbeat = setInterval(() => {
    try {
      res.write(':heartbeat\n\n');
    } catch (e) {
      clearInterval(heartbeat);
    }
  }, 25000);

  req.on('close', () => {
    adminClients.delete(res);
    clearInterval(heartbeat);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../admin/index.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/app.html'));
});

async function start() {
  await db.ensureSchema();
  app.listen(PORT, () => {
    console.log('\nMetro Group LMS Backend');
    console.log(`Running at  ->  http://localhost:${PORT}`);
    console.log(`Admin panel ->  http://localhost:${PORT}/admin`);
    console.log(`Trainee app ->  http://localhost:${PORT}\n`);
  });
}

start().catch((err) => {
  console.error('Failed to start backend:', err);
  process.exit(1);
});
