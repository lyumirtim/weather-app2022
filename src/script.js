let now = new Date();
let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h3.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayweatherForecast(response) {
  let weatherForecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#weather-forecast");

  let weatherForecastHTML = `<div class="row">`;
  weatherForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      weatherForecastHTML =
        weatherForecastHTML +
        `
      <div class="col-6">
                  <div class="p-3 border">${formatDay(forecastDay.dt)} 
                    <span class="grades" id ="weather-temperature">${Math.round(
                      forecastDay.temp.day
                    )}°C</span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-3 border">
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="" width="30"/>
                  </div>
                </div>`;
    }
  });

  weatherForecastHTML = weatherForecastHTML + `</div>`;
  weatherForecastElement.innerHTML = weatherForecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayweatherForecast);
}

function showWeather(response) {
  document.querySelector("#special-city").innerHTML = response.data.name;
  celciusTemperature = document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
function citySearch(event) {
  event.preventDefault();
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let units = "metric";
  let city = document.querySelector("#input-form").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearch);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celciusTemp.classList.remove("active");
  fahreneitTemp.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahreneitTemp = document.querySelector("#fahrenheit-temp");
fahreneitTemp.addEventListener("click", displayFahrenheitTemperature);

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusTemp.classList.remove("active");
  fahreneitTemp.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let celciusTemp = document.querySelector("#celcius-temp");
celciusTemp.addEventListener("click", displayCelciusTemperature);
