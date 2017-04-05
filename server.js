var express = require('express');
var app = express();
var path = require('path');


// send our index.html file to the user for the home page
app.get('/', function(req, res) {

	// res.sendFile(path.join(__dirname + '/index.html'));
	res.send('This is ToastMaestro');
});

// Configure the API routes.
var apiRouter = require('./app/routes/api')(app, express);
app.use('/api', apiRouter);

// Start the server
app.listen(1337);

console.log('Listening on port 1337...');