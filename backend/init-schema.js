// init-schema.js
const { run } = require('./db');

async function init() {
  // organizations
  await run(`CREATE TABLE IF NOT EXISTS organizations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT (datetime('now'))
  );`);

  // users
  await run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    name TEXT,
    created_at DATETIME DEFAULT (datetime('now')),
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    UNIQUE (organization_id, email)
  );`);

  // employees
  await run(`CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    title TEXT,
    hire_date DATE,
    meta TEXT DEFAULT '{}',
    created_at DATETIME DEFAULT (datetime('now')),
    updated_at DATETIME,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
  );`);

  // teams
  await run(`CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT (datetime('now')),
    updated_at DATETIME,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
  );`);

  // employee_teams
  await run(`CREATE TABLE IF NOT EXISTS employee_teams (
    employee_id TEXT NOT NULL,
    team_id TEXT NOT NULL,
    assigned_at DATETIME DEFAULT (datetime('now')),
    PRIMARY KEY (employee_id, team_id),
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
  );`);

  // audit_logs
  await run(`CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT (datetime('now')),
    organization_id TEXT,
    user_id TEXT,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
  );`);

  // indexes
  await run(`CREATE INDEX IF NOT EXISTS idx_employees_org ON employees(organization_id);`);
  await run(`CREATE INDEX IF NOT EXISTS idx_teams_org ON teams(organization_id);`);
  await run(`CREATE INDEX IF NOT EXISTS idx_audit_ts ON audit_logs(timestamp);`);
}

module.exports = init;
