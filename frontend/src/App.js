
import React, { useEffect, useState } from 'react';
import { getEmployees, addEmployee, getTeams, addTeam, assignTeam } from './api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [empName, setEmpName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [teamName, setTeamName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchTeams();
  }, []);

  const fetchEmployees = async () => setEmployees((await getEmployees()).data);
  const fetchTeams = async () => setTeams((await getTeams()).data);

  const handleAddEmployee = async () => {
    if (!empName || !empEmail) return alert('Enter all fields');
    await addEmployee({ name: empName, email: empEmail });
    setEmpName(''); setEmpEmail('');
    fetchEmployees();
  };

  const handleAddTeam = async () => {
    if (!teamName) return alert('Enter team name');
    await addTeam({ name: teamName });
    setTeamName('');
    fetchTeams();
  };

  const handleAssignTeam = async (empId) => {
    if (!selectedTeam) return alert('Select a team');
    await assignTeam(empId, selectedTeam);
    fetchEmployees();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>HRMS</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Add Employee</h2>
        <input placeholder="Name" value={empName} onChange={e => setEmpName(e.target.value)} />
        <input placeholder="Email" value={empEmail} onChange={e => setEmpEmail(e.target.value)} />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Add Team</h2>
        <input placeholder="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} />
        <button onClick={handleAddTeam}>Add Team</button>
      </div>

      <div>
        <h2>Employees</h2>
        <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
          <option value="">Select Team to Assign</option>
          {teams.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
        </select>
        <ul>
          {employees.map(emp => (
            <li key={emp.id}>
              {emp.name} ({emp.email}) - Team: {emp.teamId ? teams.find(t => t.id === emp.teamId)?.name : 'None'}
              <button onClick={() => handleAssignTeam(emp.id)} style={{ marginLeft: '10px' }}>Assign Team</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


