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

function showWeather(response) {
  document.querySelector("#special-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function citySearch(event) {
  event.preventDefault();
  let apiKey = "09d7afa84324d1c293fca9f98e4fc054";
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
  celciusTemperature = response.data.main.temp;
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
