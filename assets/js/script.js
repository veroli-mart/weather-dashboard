var apiKey = "bf14cfed992dff4bbd7f61707d5e2756";

var date = moment().format("MM/DD/YYYY");

//submit button
var submitButtonEl = document.querySelector("#submit-btn");

var storageLoad = false;

//submit button event listener
submitButtonEl.addEventListener("click", function (event) {
  event.preventDefault();

  var cityInput = document.querySelector("#userCity").value.trim();

  if (cityInput !== "") {
    currentWeatherDisplay(cityInput);
    saveCity(cityInput);
  }
});

//function for current weather
function currentWeatherDisplay(cityInput) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      document.querySelector("#currentWeather").innerHTML = `
        <h3>${data.name} - ${date}</h3>
        <p>Temperature: ${data.main.temp} F </p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
        
       `;

      let lat = data.coord.lat;
      let lon = data.coord.lon;
      weekDisplay(lat, lon);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data2) {
          document.querySelector(
            "#currentWeather"
          ).innerHTML += `<p>UV Index: ${data2.current.uvi}</p>`;
        });
    });
}

//function for 5 day forecast
function weekDisplay(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.querySelector("#weeklyForecast").innerHTML = "";
      for (var i = 1; i < 6; i++) {
        //display 5 day forecast
        document.querySelector("#weeklyForecast").innerHTML += `
            <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
              <div class="card-header">${moment
                .unix(data.daily[i].dt)
                .format("MM/DD/YYYY")} </div>
              <div class="card-body">
              <h5 class="card-title"><img src="http://openweathermap.org/img/wn/${
                data.daily[i].weather[0].icon
              }@2x.png" /> </h5>
              <p class= "card-text"> Temp: ${data.daily[i].temp.day}</p>
              <p class= "card-text"> Humidity: ${data.daily[i].humidity}</p>
                </div>
              `;
      }
    });
}

function loadPreviousCities() {
  document.querySelector("#userCity").value = "";
  var citiesArray = JSON.parse(localStorage.getItem("previousCities"));
  document.querySelector("#cityList").innerHTML = "";
  citiesArray.forEach((city) => {
    document.querySelector(
      "#cityList"
    ).innerHTML += `<li class="list-group-item userItem">${city}</li>`;
  });
  document.querySelectorAll(".userItem").forEach((city) => {
    city.addEventListener("click", function (event) {
      event.preventDefault();

      var cityInput = this.textContent;

      currentWeatherDisplay(cityInput);
    });
  });
}

function saveCity(cityInput) {
  //check if there's anything in local storage
  if (!localStorage.getItem("previousCities")) {
    localStorage.setItem("previousCities", JSON.stringify([]));
  }
  //take value of the city input
  var citiesArray = JSON.parse(localStorage.getItem("previousCities"));
  if (!citiesArray.includes(cityInput)) {
    citiesArray.push(cityInput);
  }

  //save back to local storage
  localStorage.setItem("previousCities", JSON.stringify(citiesArray));
  loadPreviousCities();
}

loadPreviousCities();
