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
        console.log("✅ Leads fetched from backend:", res.data); // Debug log
        setLeads(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching leads:", err);
        setError("Failed to fetch leads");
        setLoading(false);
      });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const allowedStatuses = ["New", "Qualified", "Opportunity", "Won", "Lost"];
    if (!allowedStatuses.includes(form.status)) {
      alert("Please select a valid status.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/leads", form);
      alert("✅ Lead added!");
      setForm({ name: "", email: "", source: "", score: "", status: "" });
      fetchLeads();
    } catch (err) {
      alert("❌ Error adding lead: " + err.message);
    }
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="dashboard" style={{ padding: "1rem" }}>
      <h1>Marketing Leads Dashboard</h1>

      {/* Add Lead Form */}
      <div className="add-lead-form" style={{ marginBottom: "2rem" }}>
        <h3>Add New Lead</h3>
        <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
          <select
            name="status"
            value={form.status}
            onChange={handleFormChange}
            required
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
          <button type="submit">Add Lead</button>
        </form>
      </div>

      {/* Debug View (Temporary) */}
      {/* <div style={{ background: "#f7f7f7", padding: "1rem", marginBottom: "1rem" }}>
        <h4>🔍 Debug: Raw Leads</h4>
        <pre>{JSON.stringify(leads, null, 2)}</pre>
      </div> */}

      {/* Fallback if no leads */}
      {leads.length === 0 ? (
        <div style={{ color: "gray" }}>No leads found.</div>
      ) : (
        <>
          <Filters />
          <StatCards leads={leads} />
          <div className="charts" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <LeadsChart leads={leads} />
            <ConversionBar leads={leads} />
          </div>
          <LeadsTable leads={leads} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
