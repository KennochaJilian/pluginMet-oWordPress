window.onload = function(){
    
    function success(pos) {
        let crd = pos.coords;
        let latitude = crd.latitude; 
        let longitude = crd.longitude; 
        getWeather(latitude,longitude);
        
       
      }
      
      function error(err) {
        let city = document.getElementById('city').textContent;
        getCityWeather(city); 
      }





      function getWeather(latitude,longitude){
        if(window.fetch){
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&units=metric&appid=429fff953abdff0e572a066c8b792ac1`)
            .then(function(response){
            return response.json()
            }).then(function (data){
            
            let temperature = document.getElementById('temperature'); 
            let meteo = document.getElementById('meteo'); 
            city.textContent = data.name; 
            temperature.textContent = `${data.main.temp} °C`
            meteo.textContent = data.weather[0].description; 

             })
        } else{

            console.log("Pas de fetch deso. Repasse plus tard ! ")
        }
        
        }

        function getCityWeather(city){
            if(window.fetch){
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=429fff953abdff0e572a066c8b792ac1`)
                .then(function(response){
                return response.json()
                }).then(function (data){
                    let temperature = document.getElementById('temperature'); 
                    let meteo = document.getElementById('meteo'); 
                    city.textContent = data.name; 
                    temperature.textContent = `${data.main.temp} °C`
                    meteo.textContent = data.weather[0].description; 
                })
            } else{
                console.log("Pas de fetch deso. Repasse plus tard ! ")
            }
        }

    navigator.geolocation.getCurrentPosition(success, error);

}