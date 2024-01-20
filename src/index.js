function updateWeatherInfo(response) {
  let cityElement = document.querySelector("h1");
  let city = response.data.city;
  let temperatureElement = document.querySelector("#temperature-degree");
  let cityTemperature = response.data.temperature.current;
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#wind");
  let icon = document.querySelector("#weather-icon");
  let time = document.querySelector("#city-time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = Math.round(cityTemperature);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windspeed.innerHTML = `${response.data.wind.speed}km/h`;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  time.innerHTML = formatDate(date);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchWeather(city) {
  let apiKey = "b3bdf7od0eca6e34d1d9b7194t060444";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-box");
  searchWeather(searchInput.value);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

function displayForecast() {
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="forecast-day-data">
        <div class="forecast_day">${day}</div>
        <div class="forecast-icon">🌦</div>
        <div class="forecast-temperature">
          <span class="max-temperature">16°</span>
          <span class="min-temperature">10°</span>
        </div>
      </div>
    `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
searchWeather("Paris");
displayForecast();
