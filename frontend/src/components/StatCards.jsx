import React from 'react';

function StatCards({ leads }) {
  const total = leads.length;
  const conversionRate = ((leads.filter(l => l.status === 'Won').length / total) * 100).toFixed(1);
  const costPerLead = (28.5).toFixed(2); // Static for now
  const leadQuality = (leads.reduce((a, c) => a + c.score, 0) / total || 0).toFixed(0);

  return (
    <div className="stat-cards">
      <div className="card">Total Leads: {total}</div>
      <div className="card">Conversion Rate: {conversionRate}%</div>
      <div className="card">Cost/Lead: ${costPerLead}</div>
      <div className="card">Lead Quality Score: {leadQuality}</div>
    </div>
  );
}

export default StatCards;