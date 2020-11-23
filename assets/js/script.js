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
var todaysDate = moment();
var apiKey = "";
var history = [];

function findCity() {
  $(searchTerm);
}
//weather api
function currentDay() {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=e2c6cdeb7507c8fc17c433e8885d8d56"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector("#currentWeather").innerHTML = `
      <h2>Philadelphia</h2>
      <h4>11/22/202</h4>
      <p>Current Weather: 50F</p>
      <p>Wind: 10MPH</p>
      <p>Humidity: 10%</p>
      <p>UV Index: 2.5</p>`; // firgure out how to get uv index....
      console.log(data);
      // weeklyForecast(data.coord.lon, data.coord.lat);
      // city api?
      // if (!cityInputEl) {
      //   return fetch(
      //     "https://api.openweathermap.org/data/2.5/onecall?lat=&lon=&exclude={part}&appid=e2c6cdeb7507c8fc17c433e8885d8d56"
      //     // //lattitude +
      //     //  +
      //     // //longitude +
      //     // "" +
      //     // apiKey
      //   );
      // }
    });
}
currentDay();

//
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

history = JSON.parse("");
localStorage.getItem("history");
localStorage.setItem("history", JSON.stringify(history));
//so lost...
