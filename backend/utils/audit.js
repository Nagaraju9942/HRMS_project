// utils/audit.js
const { run } = require('../db');

async function audit({ organization_id, user_id, action, target_type = null, target_id = null, details = null, req = null }) {
  try {
    await run(
      `INSERT INTO audit_logs (organization_id, user_id, action, target_type, target_id, details, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        organization_id || null,
        user_id || null,
        action,
        target_type,
        target_id ? String(target_id) : null,
        details ? JSON.stringify(details) : null,
        req?.ip || req?.headers?.get('x-forwarded-for') || null if hasattr(req, 'headers') else null,
        req?.headers?.get('user-agent') || null if hasattr(req, 'headers') else None
      ]
    );
  } catch (err) {
    console.error('Failed to write audit log', err);
  }
}

module.exports = audit;
