var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser'); 

var mongoose = require('mongoose');

// Enable parsing of the body object.
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://admin:test@ds153730.mlab.com:53730/toast-maestro');

// require('./models/organizations'); 
// require('./models/events'); 
require('./app/models/user'); 


// send our index.html file to the user for the home page
app.get('/', function(req, res) {

	// res.sendFile(path.join(__dirname + '/index.html'));
	res.send('This is ToastMaestro');
});

// Configure the API routes.
var apiRouter = require('./app/routes/api')(app, express);
app.use('/api', apiRouter);

// Start the server, and notify the client.
app.listen(1337);
console.log('Listening on port 1337...');