$(document).ready(function () {
    $('#city-form').submit(function (e) {
        e.preventDefault();

        var city = $('#city-name').val();
        $.ajax(Config.apiUrl + '/data/2.5/weather?q='+ city + '&appId=' + Config.apiKey,{
            method:'GET',
            success: function (Json) {
                weatherTown(Json);
            },
            error: function (err) {
                console.error('ERROR', err);
            }
        });

        $.ajax(Config.apiUrl + '/data/2.5/forecast/daily?q='+ city + '&mode=json&cnt=7&appId=' + Config.apiKey,{
            method:'GET',
            success: function (Json) {
                forecastTown(Json);
            },
            error: function (err) {
                console.error('ERROR', err);
            }
        });
    });
});

function weatherTown(response){
    var town = document.getElementById('city-name').value;
    document.getElementById('town').innerText = town;

    var dateJ = new Date(response.dt*1000);
    var hourJ = dateJ.getHours();
    var minJ = dateJ.getMinutes();

    var dateSunrise = new Date(response.sys.sunrise*1000);
    var hourSunrise = dateSunrise.getHours();
    var minSunrise = dateSunrise.getMinutes();

    var dateSunset = new Date(response.sys.sunset*1000);
    var hourSunset = dateSunset.getHours();
    var minSunset = dateSunset.getMinutes();

    var temp = response.main.temp-273.15;
    temp = Math.round(temp * 100) / 100;
    var humidity = response.main.humidity;
    var pressure = response.main.pressure;
    var wind = response.wind.speed;

    var city = $('#city-name').val();

    var div = document.getElementById('weather');
    // création du <p> :
    var p = document.createElement('p');
    // Ajouter le <p> à la <div>
    div.appendChild(p);
    p.innerHTML = 'Heure de mesure : '+ hourJ + 'h' + minJ + '<br/>';
    p.innerHTML += 'Levé du soleil : '+ hourSunrise + 'h' + minSunrise + '<br/>';
    p.innerHTML += 'Couché du soleil : '+ hourSunset + 'h' + minSunset + '<br/>';
    p.innerHTML += 'Temps : <img src=" http://openweathermap.org/img/w/'+ response.weather[0].icon + '.png"> <br/>';
    p.innerHTML += 'Température : '+ temp + '°C<br/>';
    p.innerHTML += 'Humidité : ' + humidity + '% <br/>';
    p.innerHTML += 'Pression : '+ pressure + ' hpa <br/>';
    p.innerHTML += 'Vitesse du vent : '+ wind + ' km/h <br/>';
    p.innerHTML += '<img src="https://maps.googleapis.com/maps/api/staticmap?center='+ city + '&zoom=10&size=200x200&key=AIzaSyDXj5V60g7SwMyQazkVj4yCX7ppkA1n9Rg">';

}

function forecastTown(response){
    var div = document.getElementById('forecast');
    // création du <p> :
    var p = document.createElement('p');
    // Ajouter le <p> à la <div>
    div.appendChild(p);

    var today = new Date();
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    for (var i=1; i<response.list.length; i++) {

    var date = days[(today.getDay()+i) % days.length];

        p.innerHTML += date + ' : <img src=" http://openweathermap.org/img/w/' + response.list[i].weather[0].icon + '.png">';
    }
}



