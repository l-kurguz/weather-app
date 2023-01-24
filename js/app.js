//Part 1, date
let dateElement = document.querySelector("#current-date");

function showDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
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
    "December",
  ];
  let currentMonth = months[date.getMonth()];

  let today = date.getDate();
  let currentDate = `${weekDay}, ${currentHour}:${currentMinutes} <br />${currentMonth} ${today}`;
  return currentDate;
}
dateElement.innerHTML = showDate(new Date());

//Part 2, search button
function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  if (searchCity.value) {
    h1.innerHTML = searchCity.value;
  } else {
    alert("Type a city");
  }
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let city = searchCity.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}°<br /><h2>${response.data.weather[0].main}</h2>`;

  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = currentHumidity;

  let windSpeed = document.querySelector("#windSpeed");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = wind;
}

//Part 3, Current Position button

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}°<br /><h2>${response.data.weather[0].main}</h2>`;

  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = currentHumidity;

  let windSpeed = document.querySelector("#windSpeed");
  let wind = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = wind;

  console.log(response.data.name);
  let city = response.data.name;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = city;
}
