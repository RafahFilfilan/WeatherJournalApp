/* Global Variables */
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

  
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=34c02ec7676e43263f3071d768b2e62d&units=imperial"';

let zipValue = document.querySelector('#zip');
let feelingsValue = document.querySelector('#feelings');

const generateBtn = document.getElementById('generate');

const dateField = document.getElementById('dateField');
const zipcodeField = document.getElementById('zipcodeField');
const tempField = document.getElementById('tempField');
const contentField = document.getElementById('contentField');

let projectDataAll = {};

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e){
	e.preventDefault();

	getWeather(baseURL, zipValue, apiKey)
	
	.then(function (data){
		postData('/addWeather', {date: newDate, zip:zipValue.value, temp:data.main.temp, content: feelingsValue.value});
	}).then(function(){
		updateUI()
	})
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipValue, key) => {
	const res = await fetch(baseURL+zipValue.value+key)
	try {
		const data = await res.json();
		
		//projectDataAll = {
		//	date: newDate,
		//	zip: zipValue.value,
		//	temp: data.main.temp,
		//	content: feelingsValue.value
		//}
		//console.log(data)
		return data;
		
	}catch(error) {
		console.log("error", error);
		// appropriately handle the error
	}
}

/* Function to POST data */
const postData = async (url='', data = {})=>{
	//console.log(data)
	const request = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {'Content-Type': 'application/json',},
		body: JSON.stringify(data),
	});
	try {
		const newData = await request.json();
		//console.log(newData);
		return newData
	} catch(error){
		console.log("error", error);
	}
} 

/* Function to GET Project Data */
const updateUI = async () => {
	const req = await fetch('http://localhost:8000/all');
	try{
		const allData = await req.json()
		console.log(allData)
		
		document.getElementById('dateField').innerHTML = allData.date;
		document.getElementById('zipcodeField').innerHTML = allData.zip;
		document.getElementById('tempField').innerHTML = allData.temp;
		document.getElementById('contentField').innerHTML = allData.content;
		
			//allData.forEach(sdata => {})
	}catch(error){
		console.log("error", error);
	}
};
