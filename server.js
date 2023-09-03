const express = require('express');
const cors = require('cors');
const path = require('path');

let fetch;
import('node-fetch').then(module => {
  fetch = module.default;
});

const app = express();

require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, 'frontend')));

app.use(cors());

// API route for weather
app.get('/weather/:city', async (req, res) => {
  try {
    if (!fetch) {
      return res.status(500).json({ error: 'Server is initializing. Please try again later.' });
    }
    const city = req.params.city;
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    res.json(data);
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
