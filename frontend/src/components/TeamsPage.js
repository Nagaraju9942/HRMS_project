import React, { useEffect, useState } from 'react';
import { get, post, del } from '../api';
import EmployeesListSelect from './_EmployeesSelect';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');

  async function load() {
    setTeams(await get('/teams'));
    setEmployees(await get('/employees'));
  }
  useEffect(()=>{ load(); },[]);

  async function createTeam() {
    if (!newName) return;
    await post('/teams', { name: newName });
    setNewName('');
    setCreating(false);
    await load();
  }

  async function removeTeam(id) {
    if (!window.confirm('Delete team?')) return;
    await del(`/teams/${id}`);
    await load();
  }

  return (
    <div>
      <div className="row" style={{marginBottom:12}}>
        <h3>Teams</h3>
        <div style={{marginLeft:'auto'}}>
          <button className="btn" onClick={() => setCreating(true)}>New Team</button>
        </div>
      </div>

      {creating && (
        <div style={{marginBottom:12}}>
          <input className="input" placeholder="Team name" value={newName} onChange={e=>setNewName(e.target.value)} />
          <div style={{marginTop:8}}>
            <button className="btn" onClick={createTeam}>Create</button>
            <button className="btn secondary" onClick={()=>setCreating(false)} style={{marginLeft:8}}>Cancel</button>
          </div>
        </div>
      )}

      <ul>
        {teams.map(t => (
          <li key={t.id} style={{marginBottom:10}}>
            <strong>{t.name}</strong>
            <div className="small">{t.description}</div>
            <div style={{marginTop:6}}>
              <TeamDetail key={t.id} team={t} employees={employees} onChanged={load} onDelete={() => removeTeam(t.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TeamDetail({ team, employees, onChanged, onDelete }) {
  const [members, setMembers] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState('');

  async function loadMembers() {
    const m = await get(`/teams/${team.id}`);
    setMembers(m.members || []);
  }
  useEffect(()=>{ loadMembers(); },[]);

  async function assign() {
    if (!selectedEmp) return;
    await post(`/teams/${team.id}/members`, { employeeId: selectedEmp });
    setSelectedEmp('');
    await loadMembers();
    onChanged();
  }

  async function unassign(empId) {
    if (!window.confirm('Remove from team?')) return;
    await del(`/teams/${team.id}/members/${empId}`);
    await loadMembers();
    onChanged();
  }

  return (
    <div>
      <div className="small">Members: {members.length}</div>
      <ul>
        {members.map(m => <li key={m.id}>{m.first_name} {m.last_name} <button className="btn secondary" onClick={() => unassign(m.id)} style={{marginLeft:8}}>Remove</button></li>)}
      </ul>

      <div style={{marginTop:8}}>
        <EmployeesListSelect employees={employees} value={selectedEmp} onChange={setSelectedEmp} />
        <button className="btn" onClick={assign} style={{marginLeft:8}}>Assign</button>
        <button className="btn secondary" onClick={onDelete} style={{marginLeft:8}}>Delete Team</button>
      </div>
    </div>
  );
}
