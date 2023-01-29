let cityInput = $("#search-form");
let cityButtonInput = $("#history");
let cityName = $("#search-input");
let currentCity = chosenFromLocal();
let cityChoices = getHistoryFromLocal();
createCityBtns();

var APIKey = "0aac0c39745eba9e97fdc23093a6dd16";

// from search submit
cityInput.on("submit", function (event) {
    event.preventDefault();
    let cityCall = cityName.val();
    let queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityCall + "&appid=" + APIKey;
    $.ajax({
        url: queryForcastURL,
        method: 'GET'
    }).then(function (response) {
        let city = response.city.name;
        addToSearchHistory(city);
        chosenToLocal(city);
        createVariables(response);
        let newCityBtn = generateBtn(city);
        cityButtonInput.append(newCityBtn);
    });
});

// from button submit
cityButtonInput.on("submit", function (event) {
    event.preventDefault();
    let queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" +
        + "&appid=" + APIKey;
    $.ajax({
        url: queryForcastURL,
        method: 'GET'
    }).then(function (response) {
        chosenToLocal(response.city.name);
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
    updateHistoryToLocal(cityArray);
    return;
}

function createCityBtns(cityArray) {
    // loop over Array to get city
    cityChoices.forEach(city => {
        let newCityBtn = generateBtn(city);
        cityButtonInput.append(newCityBtn);
    });

}

function generateBtn(city) {
    let btn = $("<button class=\"cityBtn\">");
    btn.attr("id", city);
    btn.append(city);
    return btn;
}

function getHistoryFromLocal() {
    // get from local storage
    return JSON.parse(localStorage.getItem('cityHistory'));
}

function updateHistoryToLocal(cityArray) {
    localStorage.setItem('cityHistory', JSON.stringify(cityArray));
}

function chosenToLocal(city) {
    // check last chosen exists or create it
    if (!localStorage.lastChoice) {
        localStorage.setItem('lastChoice', JSON.stringify(""));
    }
    localStorage.setItem('lastChoice', JSON.stringify(city));
}

function chosenFromLocal() {
    if (localStorage.lastChoice) { return JSON.parse(localStorage.getItem('lastChoice')); }
    return;
}

function currentWeatherBanner(city) {

}

function futureWeatherCards(city) {

}

