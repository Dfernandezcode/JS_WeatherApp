const fetch = require('node-fetch');
require('dotenv').config();

const apiKey = process.env.WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

exports.handler = async function(event, context) {
  try {
    const city = event.queryStringParameters.city;

    if (!city) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'City is required' })
      };
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' })
    };
  }
};
