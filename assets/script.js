let searching = document.querySelector("#searchbtn");
let weatherdiv = document.querySelector("#weather")
let history = JSON.parse( localStorage.getItem('pastsearch')) || [];
let historylist = document.querySelector('#btnlist')
let btn = "";
console.log(history)


function runsearch() {
    weatherdiv.innerHTML=("");
    let location = document.querySelector("#citySearch")
    console.log(location.value)
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+location.value+'&units=imperial&appid=51f2426891c5e97bef5388ad41d2ad6f')
    .then(response => {
      return response.json();  
      
    })
    .then (data =>{
        console.log(data);
        let name = data.name;
        let temp = data.main.temp;
        let humi = data.main.humidity;
        let wind = data.wind.speed;

        
        
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


    });   
    

};

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
searching.addEventListener('click',runsearch);
displayhistory();