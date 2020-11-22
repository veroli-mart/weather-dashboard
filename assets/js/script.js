/* When we search for a city, what is displayed is: 
    - 5 day forecast
    - temperature
    - humidty
    - wind speed
    - uv index
    - current weather
    - dates for the week 
    - weather icons 
    -save searched cities */

function currentDay() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Denver&units=imperial&appid=49a151cb225928a5da31670d3c434d1e"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector("#currentWeather").innerHTML = `
      <h2>${data.name}</h2>
      <h2>${new Date()}</h2>
      <h4>Current Weather: ${data.main.temp}F</h4>
      <h4>Wind: ${data.wind.speed}MPH</h4>
      <h4>Humidity: ${data.main.humidity}</h4>
      <h4>UV Index: 2.5</h4>`;
      console.log(data.coord.lon);
      weeklyForecast(data.coord.lon, data.coord.lat);
    });
}
currentDay();
function weeklyForecast(lon, lat) {
  console.log(lon, lat);
}
