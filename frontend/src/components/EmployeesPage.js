import React, { useEffect, useState } from 'react';
import { get, post, patch, del } from '../api';
import { v4 as uuidv4 } from 'uuid';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);

  async function load() {
    const rows = await get('/employees');
    setEmployees(rows);
  }

  useEffect(() => { load(); }, []);

  async function createFake() {
    const id = uuidv4();
    const payload = { first_name: 'New', last_name: 'Employee', email: `n${Math.random().toString(36).slice(2,8)}@example.com` };
    try {
      await post('/employees', payload);
      await load();
    } catch (err) { alert('Create failed'); }
  }

  async function remove(id) {
    if (!window.confirm('Delete employee?')) return;
    await del(`/employees/${id}`);
    await load();
  }

  async function saveEdits() {
    if (!editing) return;
    await patch(`/employees/${editing.id}`, editing);
    setEditing(null);
    await load();
  }

  return (
    <div>
      <div className="row" style={{marginBottom:12}}>
        <div><h3>Employees</h3></div>
        <div style={{marginLeft:'auto'}}>
          <button className="btn" onClick={createFake}>Create Quick</button>
        </div>
      </div>

      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Title</th><th>Actions</th></tr></thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.id}>
              <td>{e.first_name} {e.last_name}</td>
              <td>{e.email}</td>
              <td>{e.title}</td>
              <td>
                <button className="btn secondary" onClick={() => setEditing(e)}>Edit</button>
                <button className="btn" onClick={() => remove(e.id)} style={{marginLeft:8}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div style={{marginTop:12}}>
          <h4>Edit</h4>
          <div className="row">
            <div className="col"><input className="input" value={editing.first_name} onChange={e=>setEditing({...editing, first_name: e.target.value})} /></div>
            <div className="col"><input className="input" value={editing.last_name} onChange={e=>setEditing({...editing, last_name: e.target.value})} /></div>
          </div>
          <div className="form-row"><input className="input" value={editing.email} onChange={e=>setEditing({...editing, email: e.target.value})} /></div>
          <div className="form-row">
            <button className="btn" onClick={saveEdits}>Save</button>
            <button className="btn secondary" onClick={()=>setEditing(null)} style={{marginLeft:8}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
