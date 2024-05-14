const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Allow requests from all origins
app.use(cors());

const connection = mysql.createConnection({
  host: 'faithvpn.site',
  port: 3444,
  user: 'root',
  password: 'capstone',
  database: 'waterlevel'
});

connection.connect();

app.get('/batangan', (req, res) => {
  const query = 'SELECT DATE_FORMAT(timestamp, "%Y-%m-%d") AS date, distance, DATE_FORMAT(timestamp, "%h:%i %p") AS time FROM node_one';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const formattedResults = results.map(row => {
      const formattedDate = new Date(row.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
      return [formattedDate, `${row.distance} meters`, row.time];
    });

    res.json(formattedResults);
  });
});

app.get('/lumbayao', (req, res) => {
  const query = 'SELECT DATE_FORMAT(timestamp, "%Y-%m-%d") AS date, distance, DATE_FORMAT(timestamp, "%h:%i %p") AS time FROM node_two';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const formattedResults = results.map(row => {
      const formattedDate = new Date(row.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
      return [formattedDate, `${row.distance} meters`, row.time];
    });

    res.json(formattedResults);
  });
});

app.get('/batangan_level', (req, res) => {
  const query = 'SELECT distance FROM node_one ORDER BY timestamp DESC LIMIT 1';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      const latestDistance = results[0].distance;
      res.json([latestDistance]);
    } else {
      res.json([]);
    }
  });
});

app.get('/lumbayao_level', (req, res) => {
  const query = 'SELECT distance FROM node_two ORDER BY timestamp DESC LIMIT 1';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      const latestDistance = results[0].distance;
      res.json([latestDistance]);
    } else {
      res.json([]);
    }
  });
});

app.get('/test', (req, res) => {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();

  const query = `
    SELECT *
    FROM node_two
    WHERE timestamp >= '${twoMinutesAgo}'
    AND MOD(MINUTE(timestamp), 2) = 0
    ORDER BY timestamp DESC
    LIMIT 7`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const theGap = results.map(row => {
      return row.distance;
    });

    res.json(theGap);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
