
$(document).ready(function () {




    let currentDay = moment().format('MMMM Do YYYY');


    function displayWeather() {
        $('#todayWeather').empty(); //clears information every time a new city is loaded
        $('.card-body').empty();
        $('#weekWeather').empty();


        // var chosenCity = $('#cityName').val();
        var chosenCity = $(this).attr('data-name')
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=2b648f953cd9f9358d1ca478c103fe4c"
        var fiveDayForcast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + chosenCity + '&appid=2b648f953cd9f9358d1ca478c103fe4c'
        // var UVindex = 'http://api.openweathermap.org/data/2.5/uvi?lat='+latitude+'&lon='+longitude+'&appid=&appid=2b648f953cd9f9358d1ca478c103fe4c'


        var latitude;
        var longitude;

        $.ajax({
            url: weatherURL,
            method: "GET",
            dataType: 'json'

        }).then(function (response) {

            console.log(response);

            //city name
            var cityTitle = $('<div>').addClass('cityTitle');
            cityTitle.text(response.name);
            var day = $('<h3>');
            day.text(currentDay);
            $('#todayWeather').append(cityTitle);
            $('#todayWeather').append(day);

            //temperature
            var tempKelvin = response.main.temp;
            var tempFahrenheit = (tempKelvin - 273.15) * 1.8 + 32;
            tempFahrenheit = tempFahrenheit.toFixed();
            var temperature = $('<div>').addClass('tempDetails');
            temperature.text('Temperature: ' + tempFahrenheit + ' F°');
            $('#todayWeather').append(temperature);

            //humidity
            var humidity = $('<div>');
            humidity.addClass('tempDetails');
            humidity.text('Humidity: ' + response.main.humidity + '%');
            $('#todayWeather').append(humidity);

            //wind speed
            var windSpeed = $('<div>').addClass('tempDetails');
            windSpeed.text('Wind Speed: ' + response.wind.speed + ' MPH');
            $('#todayWeather').append(windSpeed);
        });
        $.ajax({
            url: fiveDayForcast,
            method: "GET",
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                    //creating a whole entire card
                    var column = $('<div>').addClass('col-sm-2');
                    var card = $('<div>').addClass('card text-white bg-primary');
                    var info = $('<div>').addClass('card-body p-2');
                    var date = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());

                    //adds the image icon from the data onto the screen 
                    var weatherImage = $('<img>').attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");

                    var fiveDayTemperature = $('<p>').addClass('temp');
                    var fiveDayTempF = (((response.list[i].main.temp) - 273.15) * 1.8 + 32).toFixed();
                    fiveDayTemperature.text(fiveDayTempF);
                    var fiveDayHumidity = $('<p>').addClass('humid');
                    fiveDayHumidity.text(response.list[i].main.humidity);

                    column.append(card.append(info.append(date, weatherImage, fiveDayTemperature, fiveDayHumidity)));


                    $('#weekWeather').append(column);
                }
            }

        });
        $('main').css('display', 'block');
    }

    // $.ajax({
    //     url: fiveDayForcast,
    //     method: "GET",

    // }).then(function(response){

    // console.log(response)

    // })





    //added city names go here and make buttons
    var cityList = [];
    function displayCityButtons() {
        $('#citiesListed').empty();
        for (var i = 0; i < cityList.length; i++) {
            var div = $('<div>');
            var cityButtons = $('<button>');
            cityButtons.addClass('cityButtons');
            cityButtons.attr('data-name', cityList[i]);
            cityButtons.text(cityList[i]);
            $('#citiesListed').append(div);
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
    $(document).on('click', '.cityButtons', displayWeather);

});

