

//setting city 
var city = $("#searchCity").val();
var currentCity = "";
var temp = $("#tempEl");
var wind = $("#windEl");
var humidity = $("#humidEl");
var uvIn = $("#uvEl");
var apiKey = "27e890ac1ac349b8058e8451ef106db3";
var queryUrl = "";
var forecastTitle = $("#forecast");
var forecastContainerEl = $("#fiveday-container");


$("#searchBtn").on("click", function () {

    //get the value from the input
    city = $("#searchCity").val();

    queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    //clear value from the input
    $("#searchCity").val("");

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
            //create variables for latitude and longitude of city for UV Index
            lat = data.coord.lat;
            lon = data.coord.lon;
            console.log(lon, lat);

            getForecast(lat, lon);

        })

};

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.current.weather[0].icon);

            var dailyData = data.daily;
            console.log(dailyData)

            for (i = 0; i < 6; i++) {
                storeSet = localStorage.setItem("key" + [i], JSON.stringify(dailyData[i]))
                if (i == 0) {
                    var currentDate = data.current.dt;
                    
                    var date = new Date(currentDate * 1000);
                    console.log(date);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();

                    var weatherIcon = data.current.weather[0].icon;
                    var iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

                    $("#current-city").text("");
                    $("#current-city").append(`${city} ${month}/${day}/${year}`);
                    $("#icon").attr("src", iconUrl);
                    temp.text(`Temp: ${Math.floor(data.current.temp)}°F`);
                    wind.text(`Wind Speed: ${(data.current.wind_speed)} MPH`);
                    humidity.text(`Humidity: ${Math.floor(data.current.humidity)}%`);
                    uvIn.text(`UV Index: ${data.current.uvi}`)
                    uvIndex(data);
                } else {
                    // storeSet = localStorage.setItem("key" + i, JSON.stringify(dailyData[i]))

                    $('#forecast-div').append($('<div>',
                        {
                            id: "forecast-" + i,
                            "class": 'forecast-item col-2 card'
                        }).clone());
                }
            }
            $('.forecast-item').each(function () {
                var forecastItem = parseInt($(this).attr("id").split("-")[1])
                getStore = JSON.parse(localStorage.getItem("key" + forecastItem))

                var newDate = getStore.dt;
                var date = new Date(newDate * 1000);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                var weatherIcon = getStore.weather[0].icon;
                var iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

                $(this).append($('<span>', { id: "date", "class": "five-day-item" }).text(`Date ${month}/${day}/${year}`))
                $(this).append($('<img>', { id: "icon", src: `${iconUrl}`, "class": "five-day-item" }))
                $(this).append($('<span>', { id: "temp", "class": "five-day-item" }).text(`Temp: ${Math.floor(getStore.temp.day)}°F`))
                $(this).append($('<span>', { id: "wind", "class": "five-day-item" }).text(`Wind: ${Math.floor(getStore.wind_speed)} MPH`))
                $(this).append($('<span>', { id: "humidity", "class": "five-day-item" }).text(`Humidiy: ${getStore.humidity}%`))

            })

        })
};

function uvIndex(data) {
    uvIn.addClass("badge");

    if (data.current.uvi < 3) {
        uvIn.removeClass("bg-warning bg-danger");
        uvIn.addClass("bg-success");
    } else if (data.current.uvi >= 3 && data.current.uvi < 6) {
        uvIn.removeClass("bg-success bg-danger");
        uvIn.addClass("bg-warning");
    } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
        uvIn.removeClass("bg-warning bg-success");
        uvIn.addClass("bg-danger");
    } else {
        uvIn.removeClass("bg-warning bg-success");
        uvIn.addClass("bg-danger");
    }
};
