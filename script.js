
//waiting for document to load
$(document).ready(function () {

    //gives current date
    let currentDay = moment().format('MMMM Do YYYY');


    //function for all details to display weather
    function displayWeather() {
        $('#todayWeather').empty(); //clears information every time a new city is loaded
        $('.card-body').empty();
        $('#weekWeather').empty();

        //api URLs
        var chosenCity = $(this).attr('data-name')
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=2b648f953cd9f9358d1ca478c103fe4c"
        var fiveDayForcast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + chosenCity + '&appid=2b648f953cd9f9358d1ca478c103fe4c'


        $.ajax({
            url: weatherURL,
            method: "GET",
            dataType: 'json'

        }).then(function (response) {


            //city name
            var cityTitle = $('<div>').addClass('cityTitle pl-3');
            cityTitle.text(response.name);
            var day = $('<h3>').addClass('pl-3');
            day.text(currentDay);
            $('#todayWeather').append(cityTitle);
            $('#todayWeather').append(day);

            //weather icon
            var dayIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
            $('#todayWeather').append(dayIcon);


            //temperature
            var tempKelvin = response.main.temp;
            var tempFahrenheit = (tempKelvin - 273.15) * 1.8 + 32;
            tempFahrenheit = tempFahrenheit.toFixed();
            var temperature = $('<div>').addClass('tempDetails');
            temperature.text('Temperature: ' + tempFahrenheit + ' °F');
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

        //five day forcast
        $.ajax({
            url: fiveDayForcast,
            method: "GET",
        }).then(function (response) {
            // console.log(response);

            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    //creating a whole entire card
                    var row = $('<div>').addClass('row');
                    var column = $('<div>').addClass('col-md m-2');
                    var card = $('<div>').addClass('card text-white bg-info');
                    var info = $('<div>').addClass('card-body p-2');
                    var date = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());

                    //adds the image icon from the data onto the screen 
                    var weatherImage = $('<img>').attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png");

                    var fiveDayTemperature = $('<p>').addClass('temp');
                    var fiveDayTempF = (((response.list[i].main.temp) - 273.15) * 1.8 + 32).toFixed();
                    fiveDayTemperature.text('Temp: ' + fiveDayTempF + ' °F');
                    var fiveDayHumidity = $('<p>').addClass('humid');
                    fiveDayHumidity.text('Humidity: ' + response.list[i].main.humidity + '%');

                    row.append(column.append(card.append(info.append(date, weatherImage, fiveDayTemperature, fiveDayHumidity))));


                    $('#weekWeather').append(row);
                    $('.forecast').css('display', 'block')

                }
            }

        });
        $('main').css('display', 'block');
    }


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
        chosenCity = cityAdd;

        $('.forecast').css('display', 'none')
        displayCityButtons();

    })
    //displays weather on click for both search button and the city buttons
    $('#citySearchButton').on('click', displayWeather);
    $(document).on('click', '.cityButtons', displayWeather);

});

