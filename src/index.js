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

let searchCountry = document.querySelector("#search-form");
searchCountry.addEventListener("submit", submitCountry);

//Get temperature at search location
function getSearchTemp(response) {
  let searchTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = searchTemperature;
  let cityUpdate = document.querySelector("#title-country");
  cityUpdate.innerHTML = response.data.name;
  //Toggle between celsius and fahrenheit (Search)
  function toggleCelsius(celsius) {
    celsius.preventDefault();
    let tempCelsius = document.querySelector("#temperature");
    tempCelsius.innerHTML = searchTemperature;
  }
  let clickCelsius = document.querySelector("#celsius");
  clickCelsius.addEventListener("click", toggleCelsius);

  function toggleFahrenheit(fahrenheit) {
    fahrenheit.preventDefault();
    let tempFahrenheit = document.querySelector("#temperature");
    tempFahrenheit.innerHTML = searchTemperature * (9 / 5) + 32;
  }
  let clickFahrenheit = document.querySelector("#fahrenheit");
  clickFahrenheit.addEventListener("click", toggleFahrenheit);
}

searchCity("Kiel");

//Current location button
function btnCurrentCords(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let units = "metric";
  let apiKey = "7bf3ba8d3f15df7b82b1c7bfba361d28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  function getCurrentLocationTemperature(temp) {
    let currentTemperature = Math.round(temp.data.main.temp);
    let currentTemperatureElement = document.querySelector("#temperature");
    currentTemperatureElement.innerHTML = currentTemperature;
    let currentLocation = document.querySelector("#title-country");
    currentLocation.innerHTML = temp.data.name;
    //Toggle between celsius and fahrenheit (coords)
    function toggleCelsius(celsius) {
      celsius.preventDefault();
      let tempCelsius = document.querySelector("#temperature");
      tempCelsius.innerHTML = currentTemperature;
    }
    let clickCelsius = document.querySelector("#celsius");
    clickCelsius.addEventListener("click", toggleCelsius);

    function toggleFahrenheit(fahrenheit) {
      fahrenheit.preventDefault();
      let tempFahrenheit = document.querySelector("#temperature");
      tempFahrenheit.innerHTML = currentTemperature * (9 / 5) + 32;
    }
    let clickFahrenheit = document.querySelector("#fahrenheit");
    clickFahrenheit.addEventListener("click", toggleFahrenheit);
  }

  axios.get(apiUrl).then(getCurrentLocationTemperature);
}
function getCurrentCoords(response) {
  response.preventDefault();
  navigator.geolocation.getCurrentPosition(btnCurrentCords);
}
let btnCurrentLocation = document.querySelector("#current-location");
btnCurrentLocation.addEventListener("click", getCurrentCoords);
