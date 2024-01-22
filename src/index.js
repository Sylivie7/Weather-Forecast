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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b3bdf7od0eca6e34d1d9b7194t060444";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="forecast-day-data">
        <div class="forecast_day">${formatDay(day.time)}</div>
         <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temperature">
          <span class="max-temperature">
          ${Math.round(day.temperature.maximum)}º
          </span>
          <span class="min-temperature">
          ${Math.round(day.temperature.minimum)}º
          </span>
        </div>
      </div>
    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
searchWeather("Paris");
