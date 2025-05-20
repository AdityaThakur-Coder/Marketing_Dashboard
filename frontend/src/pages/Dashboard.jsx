import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import StatCards from "../components/StatCards";
import LeadsChart from "../components/LeadsChart";
import ConversionBar from "../components/ConversionBar";
import LeadsTable from "../components/LeadsTable";
import axios from "axios";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    score: "",
    status: "",
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    axios
      .get("http://localhost:3000/api/leads")
      .then((res) => {
        setLeads(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leads:", err);
        setError("Failed to fetch leads");
        setLoading(false);
      });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/leads", form);
      alert("Lead added!");
      setForm({ name: "", email: "", source: "", score: "", status: "" });
      fetchLeads(); // Refresh leads
    } catch (err) {
      alert("Error adding lead: " + err.message);
    }
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="dashboard" style={{ padding: "1rem" }}>
      <h1>Marketing Leads Dashboard</h1>

      {/* Add Lead Form */}
      <div className="add-lead-form">
        <h3>Add New Lead</h3>
        <form onSubmit={handleFormSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleFormChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleFormChange}
            required
          />
          <input
            name="source"
            placeholder="Source"
            value={form.source}
            onChange={handleFormChange}
          />
          <input
            name="score"
            placeholder="Score"
            type="number"
            value={form.score}
            onChange={handleFormChange}
          />
          <input
            name="status"
            placeholder="Status"
            value={form.status}
            onChange={handleFormChange}
          />
          <button type="submit">Add Lead</button>
        </form>
      </div>

      {/* Existing Components */}
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
