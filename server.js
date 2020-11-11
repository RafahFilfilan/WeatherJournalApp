// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening(){
	console.log(`running of localhost: ${port}`);
};


// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/', getData);

function getData(req, res){
	res.send(projectData);
	//console.log(projectData);
};

// Post Route
app.post('/addWeather', addWeather);

function addWeather(req, res){
	//console.log(req.body)
	let newEntry = {
		date: req.body.date,
		zip: req.body.zip,
		temp: req.body.temp,
		content: req.body.content
	}
	
	projectData.push(newEntry);
	res.send(projectData);
}
