let searching = document.querySelector("#searchbtn");
let weatherdiv = document.querySelector("#weather")
let history = JSON.parse( localStorage.getItem('pastsearch')) || [];
let historylist = document.querySelector('#btnlist')
let btn = "";
let historybtn = document.querySelectorAll('#btnlist')
console.log(history)


// Call API and Display current weather
function runsearch(locate) {
    weatherdiv.innerHTML=("");
    
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+locate+'&units=imperial&appid=51f2426891c5e97bef5388ad41d2ad6f')
    .then(response => {
      return response.json();  
      
    })
    .then (data =>{
        console.log(data);
        let name = data.name;
        let temp = data.main.temp;
        let humi = data.main.humidity;
        let wind = data.wind.speed;

        let longitude = data.coord.lon;
        let latitude = data.coord.lat;
        
        
        
        let loc = document.createElement("div")
        var nametxt = document.createTextNode(name)
        loc.appendChild(nametxt);
        weatherdiv.appendChild(loc)
        
        let temps = document.createElement("div")
        var temptxt = document.createTextNode("temp: " +temp)
        temps.appendChild(temptxt);
        weatherdiv.appendChild(temps);

        let windspeed = document.createElement("div")
        var windtxt = document.createTextNode("wind: " + wind +"MPH")
        windspeed.appendChild(windtxt);
        weatherdiv.appendChild(windspeed);

        let humidity = document.createElement("div")
        var humidtxt = document.createTextNode("Humidity: " + humi +"%")
        humidity.appendChild(humidtxt);
        weatherdiv.appendChild(humidity);

        storename(name)
        get5day(latitude,longitude)

    });   
    



};


// stores cities to local storage history of search
function storename(names){
    let loc = names.toLowerCase();
    if(!history.includes(loc)){
        history.unshift(loc)
        history.splice(3);
        console.log(history)
        localStorage.setItem("pastsearch",JSON.stringify(history))
        displayhistory();
    }

}

// creates buttons from info stored in local storage
function displayhistory(){

    if(history.length>0){

    historylist.innerHTML=("");
    history.forEach(function(element,index){
        btn = document.createElement('button')
        btn.type ='button';
        btn.name = element
        btn.value = element;
        btn.className= 'list-group-item';
        btn.id = index;
        btn.innerHTML=(element)
        historylist.appendChild(btn)
        
    })};
    
}

// calls search from search text
searching.addEventListener('click',function(event){
    place = document.querySelector("#citySearch").value
    console.log(place)
    runsearch(place)
});

displayhistory();


// start of function to display 5 day and display uv calls all in one api
function get5day(lat,long){
    console.log(lat)
    console.log(long)

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=minute,alerts,hourly&appid=51f2426891c5e97bef5388ad41d2ad6f')
    .then(response => {
      return response.json();  
      
    })
    .then (data =>{
        console.log(data);
        let uv = data.current.uvi


        let ultravilot = document.createElement("div")
        var uvtxt = document.createTextNode("UV: " + uv)
        if(uv <= 2){
            ultravilot.style.background='green';
        }
        else if(uv =>6){
            ultravilot.style.background='red';
        }
        else {ultravilot.style.background='yellow';}
        ultravilot.appendChild(uvtxt);
        weatherdiv.appendChild(ultravilot);

    })
}


// calls up locaion for past searches
historylist.addEventListener('click', function (event) {
    let select = event.target.value
    runsearch(select)
})


