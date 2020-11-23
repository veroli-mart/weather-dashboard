/* define variables: 
    - 5 day forecast
    - temperature
    - humidty
    - wind speed
    - uv index
    - current weather
    - dates for the week 
    - weather icons 
    - saved search history */

var searchFormEl = document.querySelector("#form-input");
var cityInputEl = document.querySelector("#searchTerm");
var cityDisplayName = document.querySelector("#city");
var currentDay = moment();
var apiKey = "5845809d7889f7a45fda45775e2e9a45";
var history = [];

//weather api
function currentDay() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector("#currentWeather").innerHTML = `
      <h2>${data.name}</h2>
      <h4>${new Date()}</h4>
      <p>Current Weather: ${data.main.temp}F</p>
      <p>Wind: ${data.wind.speed}MPH</p>
      <p>Humidity: ${data.main.humidity}</p>
      <p>UV Index: 2.5</p>`; // firgure out how to get uv index....
      console.log(data);
      weeklyForecast(data.coord.lon, data.coord.lat);
      // city api?
      if (!cityInputEl) {
        return fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lattitude +
            "&lon=" +
            longitude +
            "&exclude={part}&appid=" +
            apiKey
        );
      }
    });
}

function uv() {
  if (current.uvi < 3) {
    tempHTML += "low-uv text-light";
  } else if (current.uvi < 6) {
    tempHTML += "moderate-uv text-dark";
  } else if (current.uvi < 8) {
    tempHTML += "high-uv text-dark";
  } else if (current.uvi < 11) {
    tempHTML += "very-high-uv text-light";
  }
}
//so lost...
