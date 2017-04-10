var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser'); 

var mongoose = require('mongoose');

// Enable parsing of the body object.
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json()); 

mongoose.connect('mongodb://admin:test@ds153730.mlab.com:53730/toast-maestro');

require('./app/models/organization'); 
require('./app/models/event'); 
require('./app/models/user'); 

// Set the location of static files to the public directory (starts with index.html).
app.use(express.static(__dirname + '/public'));

// Configure the API routes.
var apiRouter = require('./app/routes/api')(app, express);
app.use('/api', apiRouter);

// Handle all other GET requests.
app.get('*', function(req, res) {

	// Angular routing will take it from here.
    res.sendfile('./public/views/index.html'); 
});

// Error handling middleware.
app.use(function(err, req, res, next){

	res.status(422).send({'message' : err});
});

var port = process.env.PORT || 1337;

// Start the server, and notify the client.
app.listen(port);
console.log('Listening on port ' + port + '...');