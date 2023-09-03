const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(`http://localhost:3000/weather/${city}`);

    if (response.ok) {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temperature").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".feels-like").innerHTML =
        "Feels like: " + Math.round(data.main.feels_like) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
    } else {
      if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").textContent = "City not found";
        document.querySelector(".weather").style.display = "none";
      } else {
        console.log("Error: " + response.status);
      }
    }
  } catch (error) {
    console.log("An error occurred: " + error);
  }
}

if (searchBtn && searchBox) {
  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
} else {
  console.log("Search button or search box not found.");
}
