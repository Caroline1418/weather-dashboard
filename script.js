function initPage(){
    var inputEL = document.getElementById("city-input")
    var nameEL = document.getElementById("city-name")
    var searchEL = document.getElementById("search-button")
    var clearEL = document.getElementById("clear-history")
    var currentPicEL = document.getElementById("current-pic")
    var currentTempEL = document.getElementById("temperature")
    var currentHumidityEL= document.getElementById("humidity")
    var currentWindEL = document.getElementById("wind-speed")
    var currentUvEL = document.getElementById("UV-index")
    var historyEL = document.getElementById("history")
    ver searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);

    var APIKey = "c9a9ed03a355403f4cb9a36e931c0b4a"

    function getWeather(cityName){
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response)

            var currentDate = new Date (response.data.dt*1000)
            console.log(currentDate)
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameEL.innerHTML = response.data.name + "(" + month + "/" + day + "/" + year + ")";
            var weatherPic = response.data.weather[0].icon;
            currentPicEL.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png" )
            currentPicEL.setAttribute("alt", response.data.weather[0].description);
            currentTempEL.innerHTML = "temperature:" + k2f (response.data.main.temp) + "&#176F";
            currentHumidityEL.innerHTML = "Humidity:" + response.data.main.humidity + "%";
            currentWindEL.innerHTML = "Wind Speed:" + response.data.wind.speed + "MPH";

            var lat = response.data.coord.lat;
            var lon = response.data.coord.lon;
            var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            axios.get(UVQueryURL)
            .them(function(response){
                var UvIndex = document.createElement("span")
                UvIndex.setAttribute("class", "badge badge-danger")
                UvIndex.innerHTML = response.data[0].value
                currentUvEL.innerHTML = "UV Index: "
                currentUvEL.append(UvIndex)
            });
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            axios.get(forecastQueryURL)
            .then(function(response){
                console.log(response);
                var forecastEls = document.querySelectorAll(".forecast");
                for (i=0; i<forecastEls.length; i++){
                    forecastEls[i].innerHTML = "";
                    var forecastIndex = i*8 + 4;
                    
                }
            })
        })
    }
}