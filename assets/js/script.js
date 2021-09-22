//GLOBAL VARIABLES//

//query selectors
var dataContainerEl = document.querySelector("main"); //replace main with proper location

//start and end time
var startTime = 6;
var endTime = 24;

var defaultList = function() {
    var list = [];
    var timeSlot = {meals: "", calories: "", workout: "", burn: "", note: ""};
    if (startTime > endTime) {
        return;
    }
    for (i = startTime; i < (endTime * 2) - startTime + 1; i++) {
        list.push(timeSlot);
    };
    return list;
};

//sets a default data for use later (DO NOT MODIFY)
var defaultData = {sunday: defaultList(), monday: defaultList(), tuesday: defaultList(), wednesday: defaultList(), thursday: defaultList(), friday: defaultList(), saturday: defaultList()};

//current dataset (MODIFY THIS)
var data = defaultData;

var currentDate= moment();
var forwardBtn = document.getElementById('forwardDate');
var backBtn = document.getElementById('backDate');
var todayBtn = document.getElementById('resetDate');
var saveBtns = document.querySelectorAll('button[class^=saveBtn]');
var number = 0;
var dateContainer = document.getElementById('date');
dateContainer.textContent = currentDate.format("MMM Do YYYY");
var date = moment().format("dddd").toLowerCase();

//FUNCTIONS//
var denullify = function(data) {
    if (data === null) {
        return "";
    } else {
        return data;
    }
};

var saveData = function() {
    if (data === null) {
        data = defaultData;
    }
    localStorage.setItem("data",JSON.stringify(data));
    loadTimesChart();
}

var loadData = function() {
    data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
        data = defaultData;
    }
    return data;
}

var loadTimesChart = function() {
    //set the current dataset
    data = loadData();
    var dataToday = data[date];
    //set the starting time
    var currentTime = moment().day(date).hour(6).minute(0).second(0);
    //.format("h:mm a")
    for (i = 0; i < dataToday.length; i++) {
        //acquire data to display
        var time = currentTime.format("h:mm a");
        var meals = denullify(dataToday[i].meals);
        var calories = denullify(dataToday[i].calories);
        var workout = denullify(dataToday[i].workout);
        var burn = denullify(dataToday[i].burn);
        var note = denullify(dataToday[i].note);

        //create elements
        var timeSlot = document.createElement("div");
        var timeBox = document.createElement("div");
        var mealsBox = document.createElement("div");
        var caloriesBox = document.createElement("div");
        var workoutBox = document.createElement("div");
        var burnBox = document.createElement("div");
        var noteBox = document.createElement("div");

        //class elements (ADD CLASSES)
        timeSlot.classList = "";
        timeBox.classList = "";
        mealsBox.classList = "";
        caloriesBox.classList = "";
        workoutBox.classList = "";
        burnBox.classList = "";
        noteBox.classList = "";

        //add text to elements
        timeBox.textContent = time;
        mealsBox.textContent = meals;
        caloriesBox.textContent = calories;
        workoutBox.textContent = workout;
        burnBox.textContent = burn;
        noteBox.textContent = note;

        //append elements
        timeSlot.appendChild(timeBox);
        timeSlot.appendChild(mealsBox);
        timeSlot.appendChild(caloriesBox);
        timeSlot.appendChild(workoutBox);
        timeSlot.appendChild(burnBox);
        timeSlot.appendChild(noteBox);
        dataContainerEl.appendChild(timeSlot);
        //add 30 minutes to the time
        currentTime.add(30,'m');
    }
};
//EVENT HANDLERS//

function addToDate(){
    number++
    dateContainer.textContent= '';
    
    var add = moment(currentDate).add(number,'days');
	dateContainer.textContent =  add.format("MMM Do YYYY");
}

function subFromDate(){
    number--;
    dateContainer.textContent= '';
    
    var subtract = moment(currentDate).add(number,'days');
	dateContainer.textContent =  subtract.format("MMM Do YYYY");

}

function todayDate(){
    number = 0;

    dateContainer.textContent= '';
    
    var subtract = moment(currentDate).add(number,'days');
	dateContainer.textContent =  subtract.format("MMM Do YYYY");
}

function save(){
console.log('saved!')

}
//INITIAL FUNCTION CALLS//

//loadTimesChart();

//EVENT LISTNERS//
forwardBtn.onclick = addToDate;
backBtn.onclick = subFromDate;
todayBtn.onclick= todayDate;

for (let i = 0; i < saveBtns.length; i++) {
    
    saveBtns[i].addEventListener('click', save)
    
}
//TIMED FUNCTION CALLS//







