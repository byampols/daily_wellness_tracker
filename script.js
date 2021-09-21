var currentDate= moment();
var forwardBtn = document.getElementById('forwardDate');
var backBtn = document.getElementById('backDate');
var todayBtn = document.getElementById('resetDate');
var saveBtns = document.querySelectorAll('button[class^=saveBtn]');
var number = 0;
var dateContainer = document.getElementById('date');
dateContainer.textContent = currentDate.format("MMM Do YYYY");
console.log(saveBtns.length)
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



forwardBtn.onclick = addToDate;
backBtn.onclick = subFromDate;
todayBtn.onclick= todayDate;

for (let i = 0; i < saveBtns.length; i++) {
	
	saveBtns[i].addEventListener('click', save)
	
}