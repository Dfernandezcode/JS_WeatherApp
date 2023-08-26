const express = require('express');
const cors = require('cors');

let fetch;
import('node-fetch').then(module => {
  fetch = module.default;
});

const app = express();

require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

app.use(cors());

app.get('/weather/:city', async (req, res) => {
  try {
    if (!fetch) {
      return res.status(500).json({ error: 'Server is initializing. Please try again later.' });
    }
    const city = req.params.city;
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
