const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adityars@1999',
  database: 'crm_dashboard'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');

  // Create leads table after DB connection
  const createLeadsTable = `
    CREATE TABLE IF NOT EXISTS leads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      source VARCHAR(100),
      score INT,
      status VARCHAR(50),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createLeadsTable, err => {
    if (err) {
      console.error('Failed to create leads table:', err);
    } else {
      console.log('Leads table created or already exists.');
    }
  });
});

// GET all leads
app.get('/api/leads', (req, res) => {
  db.query('SELECT * FROM leads ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST a new lead
app.post('/api/leads', (req, res) => {
  const { name, email, source, score, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required' });
  }

  const query = 'INSERT INTO leads (name, email, source, score, status) VALUES (?, ?, ?, ?, ?)';
  const values = [name, email, source, score, status];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
