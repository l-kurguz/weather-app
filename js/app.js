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
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°<br /><h2>${response.data.weather[0].main}</h2>`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function searchSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-city").value;

  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

search("Kharkiv");

//Part 3, Current Position button

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
