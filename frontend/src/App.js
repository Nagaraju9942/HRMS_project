import React, { useEffect, useState } from 'react';
import { get } from './api';
import Login from './components/Login';
import RegisterOrg from './components/RegisterOrg';
import EmployeesPage from './components/EmployeesPage';
import TeamsPage from './components/TeamsPage';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');

  useEffect(() => {
    const token = localStorage.getItem('hrms_token');
    if (token) {
      get('/me').then(u => { setUser(u); setView('employees'); }).catch(() => { localStorage.removeItem('hrms_token'); setView('login'); });
    }
  }, []);

  function onLogin({ token, user }) {
    localStorage.setItem('hrms_token', token);
    setUser(user);
    setView('employees');
  }

  function onLogout() {
    localStorage.removeItem('hrms_token');
    setUser(null);
    setView('login');
  }

  return (
    <div className="container">
      <div className="header">
        <div>
          <h2>HRMS</h2>
          <div className="small">Manage employees & teams</div>
        </div>
        <div>
          {user ? (
            <>
              <span style={{marginRight:12}}>Hi, {user.name || user.email}</span>
              <button className="btn secondary" onClick={() => setView('employees')}>Employees</button>
              <button className="btn secondary" onClick={() => setView('teams')} style={{ marginLeft:8 }}>Teams</button>
              <button className="btn" onClick={onLogout} style={{ marginLeft:12 }}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn" onClick={() => setView('login')}>Login</button>
              <button className="btn secondary" onClick={() => setView('register')}>Register Org</button>
            </>
          )}
        </div>
      </div>

      {view === 'login' && <Login onLogin={onLogin} />}
      {view === 'register' && <RegisterOrg onRegistered={onLogin} />}
      {view === 'employees' && user && <EmployeesPage />}
      {view === 'teams' && user && <TeamsPage />}
    </div>
  );
}

export default App;
