import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function LeadsChart({ leads }) {
  const data = leads.map(l => ({
    date: new Date(l.created_at).toLocaleDateString(),
    score: l.score
  })).reverse();

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="score" stroke="#8884d8" />
    </LineChart>
  );
}

export default LeadsChart;