import React, { useState } from 'react';
import { post } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');

  const submit = async () => {
    try {
      const res = await post('/auth/login', { orgName: orgName || undefined, email, password });
      onLogin(res);
    } catch (err) {
      alert(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <div className="form-row"><input className="input" placeholder="Organization name (optional)" value={orgName} onChange={e=>setOrgName(e.target.value)} /></div>
      <div className="form-row"><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div className="form-row"><input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
      <div><button className="btn" onClick={submit}>Login</button></div>
    </div>
  );
}
