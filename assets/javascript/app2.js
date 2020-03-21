
var main = document.querySelector('#city');

var temp = document.querySelector('.temp');

var weather = document.querySelector('.weather');

var state_name = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AS": "American Samoa",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FM": "Federated States Of Micronesia",
  "FL": "Florida",
  "GA": "Georgia",
  "GU": "Guam",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MH": "Marshall Islands",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "MP": "Northern Mariana Islands",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PW": "Palau",
  "PA": "Pennsylvania",
  "PR": "Puerto Rico",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VI": "Virgin Islands",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
};

$(document).on('click', "#search-awesome", function (event) {

  // We had to add these variables here to capture the value in the .on("click") event
  var userCity = $('#user-city').val().trim();
  var userState = $('#user-state').val().trim().toUpperCase();
  userState = state_name[userState];
  
  event.preventDefault();

  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userCity + ',' + userState + '&appid=8a5688a03902b0d6df72f5395e0d9447' + '&units=imperial'


  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userCity + ',' + userState + '&appid=8a5688a03902b0d6df72f5395e0d9447' + '&units=imperial')

    .then(response => response.json())

    .then(data => {

      var tempValue = Math.round(data['main']['temp']);

      var feelsLike = Math.round(data['main']['feels_like']);

      var cityValue = data['name'];

      var weatherValue = data['weather'][0]['description'];

      var weatherConditionIcon = data.weather[0].icon

      // Create a div dynamically for weather information
      var weatherDiv = $("<div>").addClass("dynamic-weather-div");


      // Create weather elements to sit inside new weatherDiv

      // CITY
      var weatherCity = $("<h1>").attr("id", "city");

      // TEMP
      var weatherTemp = $("<h3>").attr("id", "temp");

       // FEELS TEMP
       var feelsTemp = $("<h3>").attr("id", "feelstemp");

      // WEATHER CONDITIONS
      var weatherConditions = $("<h3>").attr("id", "weather-conditions");

      // WEATHER CONDITIONS ICON
      var weatherConditionsImg = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + weatherConditionIcon + "@2x.png");
      weatherConditionsImg.addClass("weather-icon");

      // Dynamically fill elements with values
      weatherCity.text(cityValue);
      weatherTemp.text("The current temperature is " + tempValue + "°F");
      feelsTemp.text("It feels like " + feelsLike + "°F");
      weatherConditions.text("Local weather conditions: " + weatherValue);

      // Append elements to div
      weatherDiv.append(weatherCity, weatherTemp, feelsTemp, weatherConditions, weatherConditionsImg);

      // Append new div to existing weather div (#weather-data-output)
      $("#weather-data-output").append(weatherDiv);


    })

})