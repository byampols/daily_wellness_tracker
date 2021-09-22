//GLOBAL VARIABLES//

// weather search global variables
var searchedLocationEl = document.querySelector("#searched-location");
var locationContainerEl = document.querySelector("#location-container");
var weather = document.getElementById("weather");

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
     alert("Weather feature not supported!"); // stuck here on the alert as this isn't showing
  }
}

function showPosition(position) {

  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

//   console.log(lat);
//   console.log(lon);

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alert&appid=0899cac729532b722cf5a83da4e0e7f9")

    .then(function(response) {
        return response.json();
})
    .then(function(response) {
        // pass response into dom function

        // current day weather
        var todayCondition = document.createElement("h4");
        todayCondition.textContent = "Condition: " + response.daily[0].weather[0].description
        locationContainerEl.appendChild(todayCondition);

        var todayTemp = document.createElement("h4"); 
        todayTemp.textContent = "Temperature: " + response.daily[0].temp.day
        locationContainerEl.appendChild(todayTemp);

        var todayWind = document.createElement("h4");
        todayWind.textContent = "Wind: " + response.daily[0].wind_speed + " MPH";
        locationContainerEl.appendChild(todayWind);

        var todayHumidity = document.createElement("h4");
        todayHumidity.textContent = "Humidity: " + response.daily[0].humidity + "%";
        locationContainerEl.appendChild(todayHumidity);

        var todayUVIndex = document.createElement("h4");
        todayUVIndex.textContent = "UV Index: " + response.daily[0].uvi;
        locationContainerEl.appendChild(todayUVIndex);
    
    });
};



// //query selectors
// var dataContainerEl = document.querySelector("main"); //replace main with proper location

// //start and end time
// var startTime = 6;
// var endTime = 24;

// var defaultList = function() {
//     var list = [];
//     var timeSlot = {meals: "", calories: "", workout: "", burn: "", note: ""};
//     if (startTime > endTime) {
//         return;
//     }
//     for (i = startTime; i < (endTime * 2) - startTime + 1; i++) {
//         list.push(timeSlot);
//     };
//     return list;
// };

// //sets a default data for use later (DO NOT MODIFY)
// var defaultData = {sunday: defaultList(), monday: defaultList(), tuesday: defaultList(), wednesday: defaultList(), thursday: defaultList(), friday: defaultList(), saturday: defaultList()};

// //current dataset (MODIFY THIS)
// var data = defaultData;


// var date = moment().format("dddd").toLowerCase();

// //FUNCTIONS//
// var denullify = function(data) {
//     if (data === null) {
//         return "";
//     } else {
//         return data;
//     }
// };

// var saveData = function() {
//     if (data === null) {
//         data = defaultData;
//     }
//     localStorage.setItem("data",JSON.stringify(data));
//     loadTimesChart();
// }

// var loadData = function() {
//     data = JSON.parse(localStorage.getItem("data"));
//     if (data === null) {
//         data = defaultData;
//     }
//     return data;
// }

// var loadTimesChart = function() {
//     //set the current dataset
//     data = loadData();
//     var dataToday = data[date];
//     //set the starting time
//     var currentTime = moment().day(date).hour(6).minute(0).second(0);
//     //.format("h:mm a")
//     for (i = 0; i < dataToday.length; i++) {
//         //acquire data to display
//         var time = currentTime.format("h:mm a");
//         var meals = denullify(dataToday[i].meals);
//         var calories = denullify(dataToday[i].calories);
//         var workout = denullify(dataToday[i].workout);
//         var burn = denullify(dataToday[i].burn);
//         var note = denullify(dataToday[i].note);

//         //create elements
//         var timeSlot = document.createElement("div");
//         var timeBox = document.createElement("div");
//         var mealsBox = document.createElement("div");
//         var caloriesBox = document.createElement("div");
//         var workoutBox = document.createElement("div");
//         var burnBox = document.createElement("div");
//         var noteBox = document.createElement("div");

//         //class elements (ADD CLASSES)
//         timeSlot.classList = "";
//         timeBox.classList = "";
//         mealsBox.classList = "";
//         caloriesBox.classList = "";
//         workoutBox.classList = "";
//         burnBox.classList = "";
//         noteBox.classList = "";

//         //add text to elements
//         timeBox.textContent = time;
//         mealsBox.textContent = meals;
//         caloriesBox.textContent = calories;
//         workoutBox.textContent = workout;
//         burnBox.textContent = burn;
//         noteBox.textContent = note;

//         //append elements
//         timeSlot.appendChild(timeBox);
//         timeSlot.appendChild(mealsBox);
//         timeSlot.appendChild(caloriesBox);
//         timeSlot.appendChild(workoutBox);
//         timeSlot.appendChild(burnBox);
//         timeSlot.appendChild(noteBox);
//         dataContainerEl.appendChild(timeSlot);
//         //add 30 minutes to the time
//         currentTime.add(30,'m');
//     }
// };
// //EVENT HANDLERS//

// //INITIAL FUNCTION CALLS//
// loadTimesChart();
// //EVENT LISTNERS//

// //TIMED FUNCTION CALLS//