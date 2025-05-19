import React from 'react';

function Filters() {
  return (
    <div className="filters">
      <label>Date Range: <input type="date" /></label>
      <label>Campaign: <input type="text" /></label>
      <label>Lead Score: <input type="number" /></label>
    </div>
  );
}

export default Filters;