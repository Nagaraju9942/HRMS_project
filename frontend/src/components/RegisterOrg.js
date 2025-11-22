import React, { useState } from 'react';
import { post } from '../api';

export default function RegisterOrg({ onRegistered }) {
  const [orgName, setOrgName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const submit = async () => {
    if (!orgName || !adminEmail || !adminPassword) return alert('Fill required');
    try {
      const res = await post('/auth/register', { orgName, adminName, adminEmail, adminPassword });
      onRegistered(res);
    } catch (err) {
      alert(err?.response?.data?.error || 'Register failed');
    }
  };

  return (
    <div>
      <h3>Register Organization</h3>
      <div className="form-row"><input className="input" placeholder="Organization name" value={orgName} onChange={e=>setOrgName(e.target.value)} /></div>
      <div className="form-row"><input className="input" placeholder="Admin name" value={adminName} onChange={e=>setAdminName(e.target.value)} /></div>
      <div className="form-row"><input className="input" placeholder="Admin email" value={adminEmail} onChange={e=>setAdminEmail(e.target.value)} /></div>
      <div className="form-row"><input className="input" placeholder="Admin password" type="password" value={adminPassword} onChange={e=>setAdminPassword(e.target.value)} /></div>
      <div><button className="btn" onClick={submit}>Register</button></div>
    </div>
  );
}
