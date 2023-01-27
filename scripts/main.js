let cityInput = $("#search-form");
let cityName = $("#search-input");
var APIKey = "0aac0c39745eba9e97fdc23093a6dd16";


cityInput.on("submit", function (event) {
    event.preventDefault();
    let cityCall = cityName.val();
    let queryForcastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityCall + "&appid=" + APIKey;
    console.log(queryForcastURL);
    $.ajax({
        url: queryForcastURL,
        method: 'GET'
    }).then(function (response) {
        createVariables(response);
    });
});
function createVariables(response) {
    let city = response.city.name;
    let rl = response.list;
    let nowIcon = rl[0].weather[0].icon;
    let nowDate = rl[0].dt;
    let nowTemp = rl[0].main.temp;
    let nowHumidity = rl[0].main.humidity;
    let nowWindSpeed = rl[0].wind.speed;

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