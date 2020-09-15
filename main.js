const api = {
    key: "55ae826b528fd9eafc5af7770ad9dbdb", //api key of the weather site
    // baseurl: "api.openweathermap.org/data/2.5/weather?id=524901&appid=Y55ae826b528fd9eafc5af7770ad9dbdb",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {               //13 = enter key
        getResult(searchbox.value);
        // *made for test* console.log(searchbox.value);
    }
}

function getResult (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) //get the data by the weather site api
      .then(weather => {
          return weather.json ();
      }).then(displayResults); //display the result on screen
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date ();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp.toFixed(0))} <span>°c<span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min.toFixed(0))}°c / ${Math.round(weather.main.temp_max.toFixed(0))}°c`; //reduce the number after the comma
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; //Possible months
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //Possible days

    let day = days[d.getDay()];       //call for the days in the array
    let date = d.getDate();           //call for the number of the day
    let month = months[d.getMonth()]; //call for the name of the months
    let year = d.getFullYear();       //call for the current Year
    // update the date
    return `${day} ${date} ${month} ${year}`; //Date data displayed on the screen

}
