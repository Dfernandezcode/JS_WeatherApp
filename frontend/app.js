
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`http://localhost:3000/weather/${city}`);

        if (response.ok) {
            var data = await response.json(); // parse JSON string 

            document.querySelector(".city").innerHTML = data.name;
            var roundedTemp = Math.round(data.main.temp);
            document.querySelector(".temperature").innerHTML = roundedTemp + '°C';
            var feelsLikeTemp = Math.round(data.main.feels_like);
            document.querySelector(".feels-like").innerHTML = 'feels like its: ' + feelsLikeTemp + '°C';
            document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
            document.querySelector(".wind").innerHTML = data.wind.speed + ' km/h';

            // Handling different weather types
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

            document.querySelector(".weather").style.display = "block"; // switch from display none to block display
        } else {
            if (response.status == 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").innerHTML = "none";
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
