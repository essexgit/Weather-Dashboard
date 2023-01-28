let cityInput = $("#search-form");
let cityButtonInput = $("#history");
let cityName = $("#search-input");
var APIKey = "0aac0c39745eba9e97fdc23093a6dd16";

// from search submin
cityInput.on("submit", function (event) {
    event.preventDefault();
    let cityCall = cityName.val();
    let queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityCall + "&appid=" + APIKey;
    $.ajax({
        url: queryForcastURL,
        method: 'GET'
    }).then(function (response) {
        addToSearchHistory(response.city.name);
        createVariables(response);
    });
});

cityButtonInput.on("submit", function (event) {
    event.preventDefault();
    let queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" +
        + "&appid=" + APIKey;
    $.ajax({
        url: queryForcastURL,
        method: 'GET'
    }).then(function (response) {
        createVariables(response);
    });
});

function createVariables(response) {
    //CurrentCityNow
    let city = response.city.name;
    let rl = response.list;
    let nowIcon = rl[0].weather[0].icon;
    let nowDate = rl[0].dt;
    let nowTemp = rl[0].main.temp;
    let nowHumidity = rl[0].main.humidity;
    let nowWindSpeed = rl[0].wind.speed;
    //CurrentCity5Day
    for (let index = 7; index < rl.length; index += 8) {
        let icon = rl[index].weather[0].icon;
        let instant = rl[index].dt;
        let date = moment.unix(instant).format("DDD MMMM yyyy");
        let temp = rl[index].main.temp;
        let humidity = rl[index].main.humidity;
        let windSpeed = rl[index].wind.speed;
        console.log(icon);
        console.log(date);
        console.log(temp);
        console.log(humidity);
        console.log(windSpeed);
    }
}

function addToSearchHistory(city) {
    // check list exists, else create
    if (!localStorage.cityHistory) {
        localStorage.setItem('cityHistory', JSON.stringify([]));
    }
    // check city exists, else add
    let cityArray = JSON.parse(localStorage.getItem('cityHistory'));
    if (!cityArray.includes(city)) {
        cityArray.push(city);
    }
    return;
}

function createCityBtns(city) {
    //  get from local storage
    // loop over local to get city
    // create btn with name, value and event
}
function getFromLocal(city) {
    // get from local storage
    let cityArray = JSON.parse(localStorage.getItem('cityHistory'));
    cityArray.push(city);
}

function updateToLocal(cityArray) {
    localStorage.setItem('cityHistory', JSON.stringify(cityArray));
}

function currentWeatherBanner(city) {

}

function futureWeatherCards(city) {

}

