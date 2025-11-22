const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory data
let employees = [];
let teams = [];

// --- Employees ---
// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Add new employee
app.post('/employees', (req, res) => {
  const { name, email, teamId } = req.body;
  const newEmployee = { id: uuidv4(), name, email, teamId: teamId || null };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// --- Teams ---
// Get all teams
app.get('/teams', (req, res) => {
  res.json(teams);
});

// Add new team
app.post('/teams', (req, res) => {
  const { name } = req.body;
  const newTeam = { id: uuidv4(), name };
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// Assign employee to team
app.put('/employees/:id/assign', (req, res) => {
  const { id } = req.params;
  const { teamId } = req.body;

  const employee = employees.find(emp => emp.id === id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });

  employee.teamId = teamId;
  res.json(employee);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
