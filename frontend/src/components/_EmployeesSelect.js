import React from 'react';

export default function EmployeesListSelect({ employees = [], value, onChange }) {
  return (
    <select className="input" value={value} onChange={e => onChange(e.target.value)}>
      <option value="">-- select employee --</option>
      {employees.map(e => <option key={e.id} value={e.id}>{e.first_name} {e.last_name} ({e.email || 'no email'})</option>)}
    </select>
  );
}
