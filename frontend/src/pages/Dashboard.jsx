import React, { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import StatCards from '../components/StatCards';
import LeadsChart from '../components/LeadsChart';
import ConversionBar from '../components/ConversionBar';
import LeadsTable from '../components/LeadsTable';
import axios from 'axios';

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/leads')
      .then(res => {
        setLeads(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leads:', err);
        setError('Failed to fetch leads');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading leads...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Marketing Leads Dashboard</h1>
      <Filters />
      <StatCards leads={leads} />
      <div className="charts">
        <LeadsChart leads={leads} />
        <ConversionBar leads={leads} />
      </div>
      <LeadsTable leads={leads} />
    </div>
  );
}

export default Dashboard;
