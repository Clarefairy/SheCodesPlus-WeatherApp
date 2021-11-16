// Get current day
let currentDate = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayIndex = currentDate.getDay();
let currentDay = days[dayIndex];
document.querySelector("#day").innerHTML = `${currentDay}`;

//Get current date
function formatDate() {
  let currentDOM = currentDate.getDate(); //day of month
  let currentYear = currentDate.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decemeber",
  ];
  let monthIndex = currentDate.getMonth();
  let currentMonth = months[monthIndex];

  return `${currentDOM}th ${currentMonth} ${currentYear}`;
}

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate();

//Get current time
function formatTime() {
  let currentHour = currentDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = currentDate.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentHour}:${currentMinute}`;
}
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatTime();

//Get forecast using City name
function searchCity(city) {
  let apiKey = "7bf3ba8d3f15df7b82b1c7bfba361d28";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getSearchTemp);
}
//Get search location
function submitCountry(country) {
  country.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}

//Get temperature at search location
function getSearchTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let cityUpdate = document.querySelector("#title-country");
  cityUpdate.innerHTML = response.data.name;
}

//Toggle between celsius and fahrenheit link
function displayCelsiusTemp(celsius) {
  celsius.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", displayCelsiusTemp);

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp * (9 / 5) + 32);
}
let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", displayFahrenheitTemp);
//

let celsiusTemp = null;

let searchCountry = document.querySelector("#search-form");
searchCountry.addEventListener("submit", submitCountry);

searchCity("Kiel");
