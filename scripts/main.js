let cityInput = $("#search-form");
let cityName = $("#search-input");

cityInput.on("click", function (event) {
    event.preventDefault();
    let city = cityName.val();
    console.log(city);
});

var APIKey = "0aac0c39745eba9e97fdc23093a6dd16";
var city = 'london';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

// console.log(queryURL);
// console.log(queryForcastURL);

// $.ajax({
//     url: queryURL,
//     method: 'GET'
// }).then(function (response) {
//     var city = response.name;
//     var icon = response.weather[0].icon;
//     var date = response.dt;
//     var temp = response.main.temp;
//     var humidity = response.main.humidity;
//     var windSpeed = response.wind.speed;
//     console.log(`City ${city}`);
//     console.log(`icon ${icon}`);
//     console.log(`date ${date}`);
//     console.log(`temp ${temp}`);
//     console.log(`humidity ${humidity}`);
//     console.log(`Wind Speed ${windSpeed}`);
// });
// $.ajax({
//     url: queryForcastURL,
//     method: 'GET'
// }).then(function (responseF) {
//     var icon5 = responseF.list[0].weather[0].icon;
//     var date5 = responseF.list[0].dt;
//     var temp5 = responseF.list[0].main.temp;
//     var humidity5 = responseF.list[0].main.humidity;
//     console.log(`icon ${icon5}`);
//     console.log(`date ${date5}`);
//     console.log(`temp ${temp5}`);
//     console.log(`humidity ${humidity5}`);
// });