var currentDate= moment().format("MMM Do YY");
var forwardBtn = document.getElementById('forwardDate');
var backBtn = document.getElementById('backDate');
var todayBtn = document.getElementById('resetDate');
var saveBtns = document.querySelectorAll('button[class^=saveBtn]');
var number = 0;
var dateContainer = document.getElementById('date');
dateContainer.textContent = currentDate
console.log(saveBtns.length)
function addToDate(){
	number++
	dateContainer.textContent= '';
	
	var add = moment(currentDate, "MMM Do YY").add(number,'days');
	dateContainer.textContent =  add
}

function subFromDate(){
	number--;
	dateContainer.textContent= '';
	
	var subtract = moment(currentDate, "MMM Do YY").add(number,'days');
	dateContainer.textContent =  subtract;

}

function todayDate(){
	number = 0;

	dateContainer.textContent= '';
	
	var subtract = moment(currentDate, "MMM Do YY").add(number,'days');
	dateContainer.textContent =  subtract;
}

function save(){
console.log('saved!')
}



forwardBtn.onclick = addToDate;
backBtn.onclick = subFromDate;
todayBtn.onclick= todayDate;

for (let i = 0; i < saveBtns.length; i++) {
	
	saveBtns[i].addEventListener('click', save)
	
}