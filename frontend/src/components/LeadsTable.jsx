import React from 'react';

function LeadsTable({ leads }) {
  return (
    <table className="leads-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Score</th>
          <th>Source</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.email}</td>
            <td>{lead.score}</td>
            <td>{lead.source}</td>
            <td>{lead.status}</td>
            <td>{new Date(lead.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeadsTable;