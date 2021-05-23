

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

    queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

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

//function to display current weather
function getCurrentWeather() {
    fetch(queryUrl)
    //arrow is another way to write function
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.text(`Temp: ${Math.floor(data.main.temp)}°F`);
            wind.text(`Wind Speed: ${Math.floor(data.wind.speed)} MPH`);
            humidity.text(`Humidity: ${Math.floor(data.main.humidity)}`);
        
        })

    $("h3").append(city);
    $("")
    
    };


