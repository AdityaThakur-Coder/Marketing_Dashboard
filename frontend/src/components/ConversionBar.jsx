import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function ConversionBar({ leads }) {
  const grouped = ['New', 'Qualified', 'Opportunity', 'Won', 'Lost'].map(status => ({
    status,
    count: leads.filter(l => l.status === status).length
  }));

  return (
    <BarChart width={500} height={300} data={grouped}>
      <XAxis dataKey="status" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#82ca9d" />
    </BarChart>
  );
}

export default ConversionBar;