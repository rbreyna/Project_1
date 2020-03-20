var input = document.querySelector('#user-location');

var main = document.querySelector('#city');

var temp = document.querySelector('.temp');

var weather = document.querySelector('.weather');

var button = document.querySelector('#search-awesome');

button.addEventListener('click', function (city) {

  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=8a5688a03902b0d6df72f5395e0d9447' + '&units=imperial'
  console.log(queryURL);

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=8a5688a03902b0d6df72f5395e0d9447' + '&units=imperial')

    .then(response => response.json())

    .then(data => {

      var tempValue = data['main']['temp'];

      var cityValue = data['name'];

      var weatherValue = data['weather'][0]['description'];

      var weatherConditionIcon = data.weather[0].icon

      console.log(weatherConditionIcon);

      main.innerHTML = cityValue;

      weather.innerHTML = "Weather: " + weatherValue + " <img class='open-weather-map-img' src='http://openweathermap.org/img/wn/" + weatherConditionIcon + ".png'>" 

      temp.innerHTML = "Temperature: " + tempValue + "F°";

      input.value = "";

    })

})