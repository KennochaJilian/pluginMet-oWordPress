window.onload = function(){

    let city = document.getElementsByClassName('city');
    
let slide = document.getElementsByClassName("slide"); 
let prev = document.getElementById("prev"); 
let next = document.getElementById("next");

prev.addEventListener("click", function (){
    plusSlides(-1); 
})
next.addEventListener("click", function (){
    plusSlides(1);
})

let slideIndex = 1; 
showSlides(slideIndex); 

function plusSlides(n){
    showSlides(slideIndex+=n); 
}

function currentSlide(n) {
    showSlides(slideIndex = n);
  }

function showSlides(n) {
    let i;
    
    
    if (n > slide.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slide.length}
    for (i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
    }
   
    slide[slideIndex-1].style.display = "block";

    city[slideIndex-1].contentEditable = true; 
    
    city[slideIndex-1].addEventListener("keydown", event =>{
        if(event.keyCode == 13){
            console.log(city[slideIndex-1].textContent);
            getCityWeather(city[slideIndex-1].textContent,"metric"); 
            writeWheather();
    }
    
})
  }


    if((sessionStorage.getItem('data') == null || parseInt(sessionStorage.getItem('date'), 10) < Date.now())){
        sessionStorage.clear(); 
        function success(pos) {
            let crd = pos.coords;
            let latitude = crd.latitude; 
            let longitude = crd.longitude;            
            getWeather(latitude,longitude);            
        }
            
        function error(err) {
            
            //getCityWeather(city.textContent,"metric"); 
        
        }
        
        navigator.geolocation.getCurrentPosition(success, error);

    } else {
        
        //writeWheather();
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
                //writeForecast()
                
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
                sessionStorage.setItem('forecast', data);
                //writeForecast(); 
               
            })


        
        } else{
            console.log("Pas de fetch deso. Repasse plus tard ! ")
        }
    }

//Write wheather from data storage
    function writeWheather(){
        
        let response = JSON.parse(sessionStorage.getItem('data'));
        console.log(response);
        let temperature = document.getElementsByClassName('temperature'); 
        let meteo = document.getElementsByClassName('meteo'); 
        city[slideIndex-1].textContent = response.name; 
        temperature[slideIndex-1].textContent = `${Math.round(response.main.temp)} °C`
        meteo[slideIndex-1].textContent = response.weather[0].main;
        let block = document.getElementById("blockImg");
        //setImg(response, block)
        
        
    }

    function writeForecast(){
        let response = JSON.parse(sessionStorage.getItem('forecast')
        ); 
        //let temperatureJ1 = document.getElementById("d1"); 
        // let forecastJ1 = document.getElementById("f1"); 
        // temperatureJ1.textContent = `${Math.round(response.list[7].main.temp)} °C`; 
        // forecastJ1.textContent = response.list[7].weather[0].description;  
        
        // let temperatureJ2 = document.getElementById("d2");
        // let temperatureJ3 = document.getElementById("d3");
        // let forecastJ2 = document.getElementById("f2"); 
        // let forecastJ3 = document.getElementById("f3");

        // temperatureJ2.textContent = `${Math.round(response.list[15].main.temp)} °C`; 
        // forecastJ2.textContent = response.list[15].weather[0].description; 

       

        // temperatureJ3.textContent = `${Math.round(response.list[21].main.temp)} °C`; 
        // forecastJ3.textContent = response.list[21].weather[0].description; 
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

    let btnCelsius = document.getElementById("celsius"); 
    let btnFahrenheit = document.getElementById("fahrenheit");
    let requestTemp = "temp=C"; 

    btnCelsius.addEventListener('click',function(){

        if(requestTemp !="temp=C"){
            convertTo("C");
        }
        btnCelsius.classList.add("active"); 
        btnFahrenheit.classList.remove("active");

        return requestTemp = "temp=C";


    })

    btnFahrenheit.addEventListener('click', function(){
        if(requestTemp != "temp=F"){
            convertTo("F");
        }
        btnFahrenheit.classList.add("active"); 
        btnCelsius.classList.remove("active");
        return requestTemp = "temp=F"; 
    })

    function convertTo(unit){
        let temperature = document.getElementsByClassName('temperature');
        let temperatureForecast = document.getElementsByClassName("temperatureForecast");

        
        if(unit == "C"){

            for (let i=0; i<temperature.length;i++){
                let intTemp = parseInt(temperature[i].textContent.split(' ')[0])
                tempCelsius = Math.round((intTemp - 32) * 5/9);
                temperature[i].textContent = `${tempCelsius} °C`

            }

            for (let i=0; i<temperatureForecast.length;i++){
                let intTemp = parseInt(temperatureForecast[i].textContent.split(' ')[0])
                tempCelsius = Math.round((intTemp - 32) * 5/9);
                temperatureForecast[i].textContent = `${tempCelsius} °C`

            }
            
            
        }else{
            
            for (let i=0; i<temperature.length;i++){
                let intTemp = parseInt(temperature[i].textContent.split(' ')[0])
                tempFahrenheit = Math.round((intTemp*(9/5)) +32);
                temperature[i].textContent = `${tempFahrenheit} °F`

            }
            for (let i=0; i<temperatureForecast.length;i++){
                let intTemp = parseInt(temperatureForecast[i].textContent.split(' ')[0])
                tempFahrenheit = Math.round((intTemp*(9/5)) +32);
                temperatureForecast[i].textContent = `${tempFahrenheit} °F`

            }          

        }


    }



    // Requête test pour sauvegarder user pref
    document.getElementById("pref").addEventListener('click', function (){
        
        let request = new XMLHttpRequest();
        request.onreadystatechange = alertContents;
        request.open("GET", `wp-content/plugins/meteo/userPref.php?action=test&${requestTemp}&city=${city[slideIndex-1].textContent}`,true);
        request.setRequestHeader('X-Requested-With','xmlhttprequest'); 
        request.send('');
    
    function alertContents() {
       
        if (request.readyState === XMLHttpRequest.DONE) {
           
          if (request.status === 200) {
            let response = request.responseText;
            console.log(response); 
          } else {
            alert('Un problème est survenu avec la requête.');
          }
        }
      } 


})



    
}