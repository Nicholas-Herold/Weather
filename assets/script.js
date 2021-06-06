let searching = document.querySelector("#searching");


function runsearch() {
    
let weather = "";

weather = api.openweathermap.org/data/2.5/forecast?q={searching.text}&appid={51f2426891c5e97bef5388ad41d2ad6f };
console.log(weather)
// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={51f2426891c5e97bef5388ad41d2ad6f}
};
searching.addEventListener('click',runsearch);