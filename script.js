
$(document).ready(function () {

    // var chosenCity = ""

    // var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=2b648f953cd9f9358d1ca478c103fe4c"
    // var fiveDayForcast = 'https://api.openweathermap.org/data/2.5/forecast?q=oakland&appid=2b648f953cd9f9358d1ca478c103fe4c'

    function displayWeather() {
        $('#todayWeather').empty();
        var chosenCity = $('#cityName').val();
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=2b648f953cd9f9358d1ca478c103fe4c"

        $.ajax({
            url: weatherURL,
            method: "GET",

        }).then(function (response) {

            console.log(response)
            var tempKelvin = response.main.temp;
            var tempFahrenheit = (tempKelvin - 273.15) * 1.8 + 32;
            var humidity = response.main.humidity;

            var temperature = $('<p>');
            temperature.text(tempFahrenheit);
            $('#todayWeather').append(temperature)


        });

    }

    // $.ajax({
    //     url: fiveDayForcast,
    //     method: "GET",

    // }).then(function(response){

    // console.log(response)

    // })





    //added city names go here
    var cityList = [];
    function displayCityButtons() {
        $('#citiesListed').empty();
        for (var i = 0; i < cityList.length; i++) {
            var cityButtons = $('<button>');
            cityButtons.addClass('cityButtons btn btn-primary mb-2');
            // cityButtons.css('width','200px')
            cityButtons.attr('data-name', cityList[i]);
            cityButtons.text(cityList[i]);
            $('#citiesListed').append(cityButtons);
        }
    }

    //add city names
    $('#citySearchButton').on('click', function (event) {
        event.preventDefault(); //prevents the page from refreshing

        var cityAdd = $('#cityName').val().trim();
        cityList.push(cityAdd);

        chosenCity = cityAdd

        displayCityButtons();

    })
    $('#citySearchButton').on('click', displayWeather);

});

