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
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&units=metric&appid=429fff953abdff0e572a066c8b792ac1`)
            .then(function(response){
            return response.text()
            }).then(function (data){
                sessionStorage.setItem('data', data);
                let time = Date.now()+3600*3; 
                sessionStorage.setItem('date', time);  
                writeWheather();
            })
        } else{

            console.log("Pas de fetch deso. Repasse plus tard ! ")
        }
        
        }
//Get wheather when user don't allow position GPS

    function getCityWeather(city,unit){

        if(window.fetch){
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=${unit}&appid=429fff953abdff0e572a066c8b792ac1`)
            .then(function(response){
            return response.text()
            }).then(function (data){
                sessionStorage.setItem('data', data); 
                writeWheather();
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
        temperature.textContent = `${response.main.temp} °C`
        meteo.textContent = response.weather[0].description; 
    }

     



    // let btnCelsius = document.getElementById("celsius");
    // let btnFahrenheit = document.getElementById("fahrenheit");

    // btnCelsius.addEventListener("click", function(){
    //      getCityWeather(city,"metric");
    // })
    // btnFahrenheit.addEventListener("click", function(){
    //     getCityWeather(city,"imperial");
    // })
   
    // document.getElementById('selectCity').addEventListener('submit', function(e){
    //     e.preventDefault();
    //     city = document.getElementById('toto').value;
    //     getCityWeather(city,"metric"); 

    
    // })


    
}