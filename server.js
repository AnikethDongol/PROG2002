const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./crowdfunding_db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 1. GET all active fundraisers
app.get('/api/fundraisers', (req, res) => {
  const query = `
    SELECT f.*, c.NAME as CATEGORY_NAME 
    FROM FUNDRAISER f 
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
    WHERE f.ACTIVE = TRUE
  `;
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// 2. GET all categories
app.get('/api/categories', (req, res) => {
  const query = 'SELECT * FROM CATEGORY';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// 3. GET active fundraisers based on criteria
app.get('/api/search', (req, res) => {
  const { organizer, city, category } = req.query;
  let query = `
    SELECT f.*, c.NAME as CATEGORY_NAME 
    FROM FUNDRAISER f 
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
    WHERE f.ACTIVE = TRUE
  `;
  const params = [];

  if (organizer) {
    query += ' AND f.ORGANIZER LIKE ?';
    params.push(`%${organizer}%`);
  }
  if (city) {
    query += ' AND f.CITY LIKE ?';
    params.push(`%${city}%`);
  }
  if (category) {
    query += ' AND c.NAME LIKE ?';
    params.push(`%${category}%`);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// 4. GET fundraiser details by ID
app.get('/api/fundraiser/:id', (req, res) => {
  const query = `
    SELECT f.*, c.NAME as CATEGORY_NAME 
    FROM FUNDRAISER f 
    JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
    WHERE f.FUNDRAISER_ID = ?
  `;
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Fundraiser not found' });
      return;
    }
    res.json(results[0]);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});