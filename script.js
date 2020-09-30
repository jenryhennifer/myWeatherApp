
$(document).ready(function () {




    let currentDay = moment().format('MMMM Do YYYY');


    function displayWeather() {
        $('#todayWeather').empty(); //clears information every time a new city is loaded
        $('.card-body').empty();


        // var chosenCity = $('#cityName').val();
        var chosenCity = $(this).attr('data-name')
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=2b648f953cd9f9358d1ca478c103fe4c"
        var fiveDayForcast = 'https://api.openweathermap.org/data/2.5/forecast?q='+ chosenCity +'&appid=2b648f953cd9f9358d1ca478c103fe4c'
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
            var cityTitle = $('<div>');
            cityTitle.addClass('cityTitle');
            cityTitle.text(response.name);
            var day = $('<h3>');
            day.text(currentDay);
            $('#todayWeather').append(cityTitle);
            $('#todayWeather').append(day);

            //temperature
            var tempKelvin = response.main.temp;
            var tempFahrenheit = (tempKelvin - 273.15) * 1.8 + 32;
            tempFahrenheit = tempFahrenheit.toFixed();
            var temperature = $('<div>');
            temperature.addClass('tempDetails');
            temperature.text('Temperature: ' + tempFahrenheit + ' F°');
            $('#todayWeather').append(temperature);

            //humidity
            var humidity = $('<div>');
            humidity.addClass('tempDetails');
            humidity.text('Humidity: ' + response.main.humidity + '%');
            $('#todayWeather').append(humidity);

            //wind speed
            var windSpeed = $('<div>');
            windSpeed.addClass('tempDetails');
            windSpeed.text('Wind Speed: ' + response.wind.speed + ' MPH');
            $('#todayWeather').append(windSpeed);
        });
        $.ajax({
            url: fiveDayForcast,
            method: "GET",
        }).then(function (response){
            console.log(response);

            var dateOne = $('<div>');
            dateOne = moment().add(1, 'days').format('l');
            
            $('#dayOne').append(dateOne);

            var dateTwo = $('<div>');
            dateTwo = moment().add(2, 'days').format('l');
            $('#dayTwo').append(dateTwo);

            var dateThree = $('<div>');
            dateThree = moment().add(3, 'days').format('l');
            $('#dayThree').append(dateThree);

            var dateFour = $('<div>');
            dateFour = moment().add(4, 'days').format('l');
            $('#dayFour').append(dateFour);

            var dateFive = $('<div>');
            dateFive = moment().add(5, 'days').format('l');
            $('#dayFive').append(dateFive);

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

