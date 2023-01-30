let cityInput = $("#search-form");
let cityButtonInput = $("#history");
let cityName = $("#search-input");
var APIKey = "0aac0c39745eba9e97fdc23093a6dd16";
createCityBtns();
cityOnLoad();


// form search submit
cityInput.on("submit", function (event) {
    event.preventDefault();
    let cityCall = cityName.val();
    let queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityCall + "&appid=" + APIKey;
    $.ajax({
        url: queryForecastURL,
        method: 'GET'
    }).then(function (response) {
        let cityForm = response.city.name;
        addToSearchHistory(cityForm);
        chosenToLocal(cityForm);
        cityName.val('');
        let newCityBtn = generateBtn(cityForm);
        cityButtonInput.append(newCityBtn);
        createVariables(response);
    });
}
);

// from button submit
cityButtonInput.on("click", function (event) {
    event.preventDefault();
    let cityGrab = $(event.target).attr("id");

    let queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityGrab + "&appid=" + APIKey;
    $.ajax({
        url: queryForecastURL,
        method: 'GET'
    }).then(function (response) {

        chosenToLocal(response.city.name);
        createVariables(response);
    });
});

// initial pull from local storage to create buttons
function cityOnLoad() {
    let cityInit = chosenFromLocal();
    let queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInit + "&appid=" + APIKey;
    $.ajax({
        url: queryForecastURL,
        method: 'GET'
    }).then(function (response) {
        createVariables(response);
    });
}

function createVariables(response) {
    //CurrentCityNow
    let cityJumbo = response.city.name;
    let rl = response.list;
    let nowIconCode = rl[0].weather[0].icon;
    let nowIconImage = "https://openweathermap.org/img/wn/" + nowIconCode + "@2x.png";
    let weatherIcon = $(`<img src="${nowIconImage}"/>`);
    let nowInstant = rl[0].dt;
    let nowDate = moment.unix(nowInstant).format("DD/MM/yy");
    let nowTemp = Math.round((rl[0].main.temp - 273.15) * 100) / 100;
    let nowWindSpeed = rl[0].wind.speed;
    let nowHumidity = rl[0].main.humidity;
    // print to jumbotron
    $("#today").text(`${cityJumbo} (${nowDate})`).append(weatherIcon);
    $("#today-temp").text(`Temp: ${nowTemp} °C`);
    $("#today-wind").text(`Wind: ${nowWindSpeed} KPH`);
    $("#today-humidity").text(`Humidity: ${nowHumidity}%`);
    //CurrentCity5Day
    for (let index = 7; index < rl.length; index += 8) {
        let iconCode = rl[index].weather[0].icon;
        let iconImage = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        let weatherIcon = $(`<img src="${iconImage}"/>`);
        let instant = rl[index].dt;
        let date = moment.unix(instant).format("DD/MM/yy");
        let temp = Math.round((rl[index].main.temp - 273.15) * 100) / 100;
        let humidity = rl[index].main.humidity;
        let windSpeed = rl[index].wind.speed;
        let posMarker = (index + 1) / 8;

        $(`#Date${posMarker}`).text(date);
        $(`#Icon${posMarker}`).html("");
        $(`#Icon${posMarker}`).append(weatherIcon);
        $(`#Temp${posMarker}`).text(`Temp: ${temp} °C`);
        $(`#Wind${posMarker}`).text(`Wind: ${windSpeed} KPH`);
        $(`#Humidity${posMarker}`).text(`Humidity: ${humidity} %`);
    }
}

function addToSearchHistory(cityAdd) {
    // check list exists, else create
    if (!localStorage.cityHistory) {
        localStorage.setItem('cityHistory', JSON.stringify([]));
    }
    // check city exists, else add
    let cityArray = JSON.parse(localStorage.getItem('cityHistory'));
    if (!cityArray.includes(cityAdd)) {
        cityArray.push(cityAdd);
    }
    updateHistoryToLocal(cityArray);
    return;
}

function createCityBtns() {
    // get history
    let cityChoices = getHistoryFromLocal();
    // loop over Array to get city
    cityChoices.forEach(city => {
        let newCityBtn = generateBtn(city);
        cityButtonInput.append(newCityBtn);
    });

}

function generateBtn(cityBtnNew) {
    let btn = $("<button class=\"cityBtn\">");
    btn.attr("id", cityBtnNew);
    btn.append(cityBtnNew);
    return btn;
}

function getHistoryFromLocal() {
    // get from local storage create if empty
    if (!localStorage.cityHistory) {
        localStorage.setItem('cityHistory', JSON.stringify([]));
    }
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
    // check last chosen exists or create it
    if (!localStorage.lastChoice) {
        localStorage.setItem('lastChoice', JSON.stringify("London"));
    }
    return JSON.parse(localStorage.getItem('lastChoice'));
}