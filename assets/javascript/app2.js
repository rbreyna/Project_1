

// var input = userCity + "," + userState;

var main = document.querySelector('#city');

var temp = document.querySelector('.temp');

var weather = document.querySelector('.weather');

// var button = document.querySelector('#search-awesome');

$(document).on('click', "#search-awesome", function (event) {

  // We had to add these variables here to capture the value in the .on("click") event
  var userCity = $('#user-city').val().trim();
  var userState = $('#user-state').val().trim();

  event.preventDefault();

  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userCity + ',' + userState + '&appid=8a5688a03902b0d6df72f5395e0d9447' + '&units=imperial'
  // console.log(queryURL);
  console.log(userCity);
  console.log(userState)

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + ',' + userState + '&appid=8a5688a03902b0d6df72f5395e0d9447' + '&units=imperial')

    .then(response => response.json())

    .then(data => {

      var tempValue = data['main']['temp'];

      var cityValue = data['name'];

      var weatherValue = data['weather'][0]['description'];

      var weatherConditionIcon = data.weather[0].icon

      // Create a div dynamically for weather information
      var weatherDiv = $("<div>").addClass("dynamic-weather-div");



      // Create weather elements to sit inside new weatherDiv

      // CITY
      var weatherCity = $("<h1>").addClass("id", "city");

      // TEMP
      var weatherTemp = $("<h3>").attr("id", "temp");

      // WEATHER CONDITIONS
      var weatherConditions = $("<h3>").attr("id", "weather-conditions");

      // WEATHER CONDITIONS ICON
      var weatherConditionsImg = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + weatherConditionIcon + "@2x.png");
      weatherConditionsImg.addClass("weather-icon");

      // Dynamically fill elements with values
      weatherCity.text(cityValue);
      weatherTemp.text("The current temperature is " + tempValue + "°F");
      weatherConditions.text("Local weather conditions: " + weatherValue);

      // Append elements to div
      weatherDiv.append(weatherCity, weatherTemp, weatherConditions, weatherConditionsImg);

      // Append new div to existing weather div (#weather-data-output)
      $("#weather-data-output").append(weatherDiv);


    })

})