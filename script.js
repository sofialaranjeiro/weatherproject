let date = document.querySelector("#date");
let time = document.querySelector("#time");
let currentTime = new Date();

function formatDate(date) {
  let dayList = [
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let today = dayList[currentTime.getDay()];

  let monthDay = currentTime.getDate();

  let monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December"
  ];
  let currentMonth = monthList[currentTime.getMonth()];

  return `${today} ${monthDay}, ${currentMonth}`;
}

date.innerHTML = formatDate(currentTime);
time.innerHTML = formatTime(currentTime);

function formatTime(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/hr`;
}

function searchCity(city) {
  let apiKey = "80e7ba6798488f106421a77495d3b6c4";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;

  axios.get(apiURL).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
searchCity("Porto");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(evemt) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = 12;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function searchLocation(position) {
  let apiKey = "80e7ba6798488f106421a77495d3b6c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", displayCurrentLocation);
