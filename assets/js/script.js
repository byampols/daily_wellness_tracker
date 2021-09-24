//GLOBAL VARIABLES//

//query selectors
var dataContainerEl = document.querySelector("#time-blocks");
var dateContainer = document.getElementById('date');
var dailyScheduleEl = document.getElementById('daily-schedule');
var upperDateEl = dailyScheduleEl.querySelector('p');
var mealsEl = document.querySelector("input[name='Time-001']");
var workoutEl = document.querySelector("input[name='Time-002']");
var restEl = document.querySelector("input[name='Time-003']");

//buttons for changing date
var forwardBtn = document.getElementById('forwardDate');
var backBtn = document.getElementById('backDate');
var todayBtn = document.getElementById('resetDate');

//buttons for saving and resetting
var submitTop = document.getElementById("submit-top");
var submitBottom = document.getElementById("submit-bottom");
var resetTop = document.getElementById("reset-top");
var resetBottom = document.getElementById("reset-bottom");

//locations for getting weather
var searchedLocationEl = document.querySelector("#searched-location");
var locationContainerEl = document.querySelector("#location-container");
var noWeather = document.getElementById("no-weather");

//start and end time
var startTime = 6;
var endTime = 24;

var defaultList = function() {
    var list = [];
    var timeSlot = "";
    if (startTime > endTime) {
        return;
    }
    for (i = startTime; i < (endTime * 2) - startTime + 1; i++) {
        list.push(timeSlot);
    };
    return list;
};

//initializes current date to today
var currentDate = moment();
dateContainer.textContent = currentDate.format("MMM Do, YYYY");
upperDateEl.textContent = currentDate.format("MMM Do, YYYY");

//format for creating the data object
var storageFormat = "D/M/YYYY";

//sets a default data for use later (DO NOT MODIFY)
var defaultDate = currentDate.format(storageFormat);
var defaultData = {}; 
defaultData[defaultDate] = {timeSlots: defaultList(), meals: "", workout: "", rest: ""};

//current dataset (MODIFY THIS)
var data = defaultData;

//FUNCTIONS//

//removes nulls from data in any edgecases
var denullify = function(data) {
    if (data === null) {
        return "";
    } else {
        return data;
    }
};

// get location's current weather
function getWeather() {

    noWeather.innerHTML = "";
    locationContainerEl.innerHTML = "";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } 
};

// pass lat/long from getWeather function to fetch request
function showPosition(position) {

    var dateToday = currentDate.diff(moment().startOf("date"), "days")

    

    // if difference is negative, don't make API call
    if (dateToday < 0) {
        noWeather.innerHTML = "";
        locationContainerEl.innerHTML = "";
        noWeather.innerHTML = "Previous days' weather is not available"
        return;

    // if difference is beyond forecast limit, don't make API call    
    } 
    else if (dateToday > 5) {
        noWeather.innerHTML = "";
        locationContainerEl.innerHTML = "";
        noWeather.innerHTML = "Weather is not available beyond 5 days"
        return;
    }
    else if (dateToday >= 0) {   
  
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
  
      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alert&appid=0899cac729532b722cf5a83da4e0e7f9")
  
      .then(function(response) {
          return response.json();
    })
      .then(function(response) {
          // pass response into dom function
          console.log(dateToday)
        
          
          // current day weather
          var todayCondition = document.createElement("h4");
          todayCondition.textContent = "Condition: " + response.daily[dateToday].weather[0].description
          locationContainerEl.appendChild(todayCondition);
  
          var todayTemp = document.createElement("h4"); 
          todayTemp.textContent = "Temperature: " + response.daily[dateToday].temp.day
          locationContainerEl.appendChild(todayTemp);
  
          var todayWind = document.createElement("h4");
          todayWind.textContent = "Wind: " + response.daily[dateToday].wind_speed + " MPH";
          locationContainerEl.appendChild(todayWind);
  
          var todayHumidity = document.createElement("h4");
          todayHumidity.textContent = "Humidity: " + response.daily[dateToday].humidity + "%";
          locationContainerEl.appendChild(todayHumidity);
  
          var todayUVIndex = document.createElement("h4");
          todayUVIndex.textContent = "UV Index: " + response.daily[dateToday].uvi;
          locationContainerEl.appendChild(todayUVIndex);
      
      });
    }
};

// show error if denial of geolocation request, or other errors
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            noWeather.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            noWeather.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            noWeather.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            noWeather.innerHTML = "An unknown error occurred."
            break;
    }
};


//saves current dataset to localstorage
var saveData = function() {
    if (data === null) {
        data = defaultData;
    }
    localStorage.setItem("data",JSON.stringify(data));
    loadTimesChart();
};

//loads data from local storage and returns the most recent saved dataset
var loadData = function() {
    data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
        data = defaultData;
    }
    return data;
};

//loads the timeslots for currentDate
var loadTimesChart = function() {
    //set the current dataset
    data = loadData();
    var date = currentDate.format(storageFormat);

    //if there is no data for the current date, create a new date in the data
    if(!data[date]) {
        data[date] = {timeSlots: defaultList(), meals: "", workout: "", rest: ""};
    }

    var dataToday = data[date].timeSlots;

    //reset html
    dataContainerEl.innerHTML = "";
    //set the starting time
    var currentTime = moment().day(date).hour(6).minute(0).second(0);
    //loop through length and create timeslots
    for (i = 0; i < dataToday.length; i++) {
        //acquire data to display
        var time = currentTime.format("h:mma");
        var text = denullify(dataToday[i]);

        //create elements
        var timeSlot = document.createElement("div");
        var timeBox = document.createElement("div");
        var textBox = document.createElement("textarea");

        //id timeSlot
        timeSlot.id = `time-${i}`;

        //class elements
        timeSlot.classList = "row";
        timeBox.classList = "col-sm-1 hour";
        textBox.classList = "col-sm-11";

        //add text to elements
        timeBox.textContent = time;
        textBox.textContent = text;

        //append elements
        timeSlot.appendChild(timeBox);
        timeSlot.appendChild(textBox);
        dataContainerEl.appendChild(timeSlot);
        //add 30 minutes to the time
        currentTime.add(30,'m');
    }
};

//loads today's plan
var loadTodaysPlan = function() {
    //set the current dataset
    data = loadData();
    var date = currentDate.format(storageFormat);

    //if there is no data for the current date, create a new date in the data
    if(!data[date]) {
        data[date] = {timeSlots: defaultList(), meals: "", workout: "", rest: ""};
    }

    //set the value for the meals, workout, and rest
    mealsEl.value = data[date].meals;
    workoutEl.value = data[date].workout;
    restEl.value = data[date].rest;
};
//EVENT HANDLERS//

//adds 1 day to currentDate
function addToDate(){
    dateContainer.textContent= '';
    
    currentDate = moment(currentDate).startOf("date").add(1,'days');
	dateContainer.textContent =  currentDate.format("MMM Do, YYYY");
    upperDateEl.textContent = currentDate.format("MMM Do, YYYY");

    var dateToday = currentDate.diff(moment(), "days")
    // console.log(dateToday)

    loadTimesChart();
    loadTodaysPlan();
    getWeather();
}

//subtracts 1 day from currentDate
function subFromDate(){
    dateContainer.textContent= '';
    
    currentDate = moment(currentDate).startOf("date").add(-1,'days');
	dateContainer.textContent =  currentDate.format("MMM Do, YYYY");
    upperDateEl.textContent = currentDate.format("MMM Do, YYYY");

    var dateToday = currentDate.diff(moment(), "days")
    // console.log(dateToday)

    loadTimesChart();
    loadTodaysPlan();
    getWeather();

}

//sets currentDate to today
function todayDate(){
    dateContainer.textContent= '';
    
    currentDate = moment().startOf("date");
	dateContainer.textContent =  currentDate.format("MMM Do, YYYY");
    upperDateEl.textContent = currentDate.format("MMM Do, YYYY");

    var dateToday = currentDate.diff(moment(), "days")
    // console.log(dateToday)

    loadTimesChart();
    loadTodaysPlan();
    getWeather();
}

//saves all current data to data object, then saves to local storage
var save = function() {
    var date = currentDate.format(storageFormat);
    data = loadData();
    
    //if there is no data for the current date, create a new date in the data
    if(!data[date]) {
        data[date] = {timeSlots: defaultList(), meals: "", workout: "", rest: ""};
    }

    data[date].meals = mealsEl.value;
    data[date].workout = workoutEl.value;
    data[date].rest = restEl.value;

    for (i = 0; i < data[date].timeSlots.length; i++) {
        var timeBlockEl = document.getElementById(`time-${i}`);
        var textAreaEl = timeBlockEl.querySelector("textarea");
        var text = textAreaEl.value.trim();
        data[date].timeSlots[i] = text;
    }
    saveData();
};

//resets currentDate's data set
var reset = function() {
    var date = currentDate.format(storageFormat);
    data = loadData();
    
    //if there is no data for the current date, create a new date in the data
    if(!data[date]) {
        data[date] = {timeSlots: defaultList(), meals: "", workout: "", rest: ""};
    }

    data[date] = {timeSlots: defaultList(), meals: "", workout: "", rest: ""};
    saveData();
    loadTimesChart();
    loadTodaysPlan();
};

//INITIAL FUNCTION CALLS//
loadTimesChart();
loadTodaysPlan();

//EVENT LISTNERS//
forwardBtn.onclick = addToDate;
backBtn.onclick = subFromDate;
todayBtn.onclick= todayDate;

submitTop.addEventListener('click', save);
submitBottom.addEventListener('click', save);
resetTop.addEventListener('click', reset);
resetBottom.addEventListener('click', reset);
//TIMED FUNCTION CALLS//


