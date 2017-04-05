module.exports = function(app, express){

	var apiRouter = express.Router();

	// Middleware that logs the timestamp of the last API access.
	apiRouter.use('/', function(req, res, next){

		// Log the last access of the API.
		console.log('API accessed on ' + Date.now());
		next();
	});

	// =============
	// USER API
	// =============

	// This manages all users.
	apiRouter.route('/users')

		// Route that returns all users.
		.get(function(req, res){

			res.json({message : 'This is all the users.'});
		})

		// Route that adds a new user.
		.post(function(req, res){

			res.json({message : 'This adds a new user.'});
		});


	// This manages single users.
	apiRouter.route('/user/:id')

		// Route that returns a single user by ID.
		.get(function(req, res){

			// res.send('This is user ' + req.params.id + '.');
			res.json({message : 'This is user ' + req.params.id + '.'});
		})

		// Route that updates a users metadata.
		.put(function(req, res){

			res.json({message : 'This is updating user ' + req.params.id + '.'});
		});


	// =============
	// EVENT API
	// =============

	// This manages all events.
	apiRouter.route('/events')

		// List all events.
		.get(function(req, res){

			res.json({message : 'This is all the events.'});
		})

		// Create a new event.
		.post(function(req, res){

			res.json({message : 'This adds a new event.'});
		});

	// This route manages single events.
	apiRouter.route('/event/:id')

		// List all events.
		.get(function(req, res){

			res.json({message : 'This is event ' + req.params.id + '.'});
		})

		// Update an event.
		.put(function(req, res){

			res.json({message : 'This is updating event ' + req.params.id + '.'});
		});

	// =============
	// ORGANIZATION API
	// =============

	// This manages all organizations.
	apiRouter.route('/organizations')

		// List all organizations.
		.get(function(req, res){

			res.json({message : 'This is all the organizations.'});
		})

		// Create a new event.
		.post(function(req, res){

			res.json({message : 'This adds a new organizations.'});
		});

	// This route manages single organizations.
	apiRouter.route('/organization/:id')

		// List all organizations.
		.get(function(req, res){

			res.json({message : 'This is organization ' + req.params.id + '.'});
		})

		// Update an organizations.
		.put(function(req, res){

			res.json({message : 'This is updating organization ' + req.params.id + '.'});
		});

	// Returns the router.
	return apiRouter;
}