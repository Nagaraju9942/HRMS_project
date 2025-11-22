import axios from 'axios';

export const API_BASE = 'http://localhost:5000';

// Employees
export const getEmployees = () => axios.get(`${API_BASE}/employees`);
export const addEmployee = (data) => axios.post(`${API_BASE}/employees`, data);
export const assignTeam = (id, teamId) => axios.put(`${API_BASE}/employees/${id}/assign`, { teamId });

// Teams
export const getTeams = () => axios.get(`${API_BASE}/teams`);
export const addTeam = (data) => axios.post(`${API_BASE}/teams`, data);
