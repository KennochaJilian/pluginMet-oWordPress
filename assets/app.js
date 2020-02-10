window.onload = function(){
    let city = document.getElementById('city');

    if((sessionStorage.getItem('data') == null || parseInt(sessionStorage.getItem('date'), 10) < Date.now())){
        sessionStorage.clear(); 
        function success(pos) {
            let crd = pos.coords;
            let latitude = crd.latitude; 
            let longitude = crd.longitude;            
            getWeather(latitude,longitude);
            
            
        }
            
        function error(err) {
            
            getCityWeather(city.textContent,"metric"); 
        
        }
        
        navigator.geolocation.getCurrentPosition(success, error);

    } else {
        
        writeWheather();
    }

 
// Get wheather when user authorize position GPS
    function getWeather(latitude,longitude){

        if(window.fetch){
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=en&units=metric&appid=429fff953abdff0e572a066c8b792ac1`)
            .then(function(response){
            return response.text()
            }).then(function (data){
                sessionStorage.setItem('data', data);
                let time = Date.now()+3600*3; 
                sessionStorage.setItem('date', time);  
                writeWheather();
            })

            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=en&units=metric&appid=429fff953abdff0e572a066c8b792ac1`)
            .then(function(response){
            return response.text()
            }).then(function (data){
                sessionStorage.setItem('forecast', data);
                let time = Date.now()+3600*3; 
                sessionStorage.setItem('date', time); 
                writeForecast()
                
            })



        } else{

            console.log("Pas de fetch deso. Repasse plus tard ! ")
        }
        
        }
//Get wheather when user don't allow position GPS

    function getCityWeather(city,unit){

        if(window.fetch){
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=${unit}&appid=429fff953abdff0e572a066c8b792ac1`)
            .then(function(response){
            return response.text()
            }).then(function (data){
                sessionStorage.setItem('data', data); 
                writeWheather();
                
            })

            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&units=${unit}&appid=429fff953abdff0e572a066c8b792ac1`)
            .then(function(response){
            return response.text()
            }).then(function (data){
                sessionStorage.setItem('data', data);
                writeForecast(); 
               
            })


        
        } else{
            console.log("Pas de fetch deso. Repasse plus tard ! ")
        }
    }

//Write wheather from data storage
    function writeWheather(){
        let response = JSON.parse(sessionStorage.getItem('data'));
        let temperature = document.getElementById('temperature'); 
        let meteo = document.getElementById('meteo'); 
        city.textContent = response.name; 
        temperature.textContent = `${Math.round(response.main.temp)} °C`
        meteo.textContent = response.weather[0].description;
        let block = document.getElementById("blockImg");
        setImg(response, block)
        
        
    }

    function writeForecast(){
        let response = JSON.parse(sessionStorage.getItem('forecast')
        ); 
        let temperatureJ1 = document.getElementById("d1"); 
        let forecastJ1 = document.getElementById("f1"); 
        temperatureJ1.textContent = `${Math.round(response.list[7].main.temp)} °C`; 
        forecastJ1.textContent = response.list[7].weather[0].description;  
        
        let temperatureJ2 = document.getElementById("d2");
        let temperatureJ3 = document.getElementById("d3");
        let forecastJ2 = document.getElementById("f2"); 
        let forecastJ3 = document.getElementById("f3");

        temperatureJ2.textContent = `${Math.round(response.list[15].main.temp)} °C`; 
        forecastJ2.textContent = response.list[15].weather[0].description; 

       

        temperatureJ3.textContent = `${Math.round(response.list[21].main.temp)} °C`; 
        forecastJ3.textContent = response.list[21].weather[0].description; 
        // setImg(response.list[7], forecastJ1); 
        // setImg(response.list[15], forecastJ2);
        // setImg(response.list[21], forecastJ3); 

    }

    function setImg(response, block){

        let img = document.createElement("img");

        if(response.weather[0].description == "fog" || response.weather[0].description == "mist"){
            img.src = "wp-content/plugins/meteo/assets/visuels/brouillard.jpg";
           
        } else if(response.weather[0].description == "clear sky"){
            img.src = "wp-content/plugins/meteo/assets/visuels/soleil.jpg";

        }else if(response.weather[0].description == "broken clouds" || response.weather[0].description == "overcast clouds"){
            img.src = "wp-content/plugins/meteo/assets/visuels/nuagesfrag.jpg";
        }else if(response.weather[0].description == "light rain"){
            img.src = "wp-content/plugins/meteo/assets/visuels/rain.jpg";
        }else if(response.weather[0].description == "light snow"){
            img.src = "wp-content/plugins/meteo/assets/visuels/snow.jpg";
        }

        
        block.appendChild(img); 

    }
    
}