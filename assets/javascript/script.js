

//setting city 
var city = $("#searchCity").val();
var temp = $("#tempEl");
var wind = $("#windEl");
var humidity = $("#humidEl");
var uvIn = $("#uvEl");
var apiKey = "27e890ac1ac349b8058e8451ef106db3";
var queryUrl = "";

$("#searchBtn").on("click", function () {

    //get the value from the input
    city = $("#searchCity").val();

    queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    //clear value from the input
    $("#searchCity").val("");

    console.log(city);
    //additional function area
    addList();

    getCurrentWeather();
});

//function to add list items search a city card
function addList() {
    if (city) {
        var listItem = $("<li>").addClass("list-group-item").text(city);
        $(".list").append(listItem);
    }
};

function getCurrentWeather() {
    fetch(queryUrl)
        .then(response => response.json())
        .then(data => console.log(data))

    };


