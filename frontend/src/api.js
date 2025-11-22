import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('hrms_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function post(path, body) {
  return axios.post(`${API_BASE}${path}`, body, { headers: getAuthHeaders() }).then(r => r.data);
}
export async function get(path, params) {
  return axios.get(`${API_BASE}${path}`, { params, headers: getAuthHeaders() }).then(r => r.data);
}
export async function del(path) {
  return axios.delete(`${API_BASE}${path}`, { headers: getAuthHeaders() }).then(r => r.data);
}
export async function patch(path, body) {
  return axios.patch(`${API_BASE}${path}`, body, { headers: getAuthHeaders() }).then(r => r.data);
}
