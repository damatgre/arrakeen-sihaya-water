var apiKey = "&27e890ac1ac349b8058e8451ef106db3"

//setting city 
var city = $("#searchCity").val();
var temp = $("#tempEl");
var wind = $("#windEl");
var humidity = $("humidEl");
var uvIn = $("uvEl");

$("#searchBtn").on("click", function () {

    //get the value from the input
    city = $("#searchCity").val();
    //clear value from the input
    $("#searchCity").val("");

    console.log(city);
    //additional function area
    addList();
});

//function to add list items search a city card
function addList() {
    if (city){
        var listItem = $("<li>").addClass("list-group-item").text(city);
        $(".list").append(listItem);
    }
};

