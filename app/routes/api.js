var User = require('../models/user');
var Organization = require('../models/organization');
var Event = require('../models/event');

// TODO: Data validation and data integrity checks on data updates.

module.exports = function(app, express){

	var apiRouter = express.Router();

	// Middleware that logs the timestamp of the last API access.
	apiRouter.use('/', function(req, res, next){

		// Log the last access of the API.
		console.log('API accessed on ' + Date.now());
		next();
	});

	apiRouter.get('/next-week', function(req, res, next){

		var date = new Date();
		date.setDate(date.getDate() + 7);

		res.json(date);
	});

	// =============
	// USER API
	// =============

	// Whenever the user ID is included in the request, add it to the body.
	apiRouter.param('user', function(req, res, next, id){

		// Use mongoose to find the correct post by ID every time a post is requested.
		var query = User.findById(id).populate({	path: 'organization',
    												populate: { path: 'events' } });

		// Execute the query
		query.exec(function(err, user){

			if(err){ return next(err); }

			if(!user){ return next(new Error('Couldn\'t find user.')); }

			// Assign the user object to the request object.
			req.user = user;

			// Continue executing the next piece of middleware.
			return next();
		});
	});

	// This manages all users.
	apiRouter.route('/users')

		// Route that returns all users.
		.get(function(req, res, next){

			// Find ALL users (no query parameter).
			User.find(function(err, users){

				if(err){ return next(err); }

				res.json(users);
			});
		})

		// Route that adds a new user.
		.post(function(req, res, next){

			User.create(req.body, function(err, user){

				if(err){ return next(err); }

				res.json(user);
			});
		});

	// This manages single users.
	apiRouter.route('/user/:user')

		// Route that returns a single user by ID.
		.get(function(req, res, next){	

			res.json(req.user);
		})

		// Route that updates a users metadata.
		.put(function(req, res, next){

			// We access the DB thrice here.  Once to put the user data on the req object, again to
			// update the data, and once in the param() call from earlier.
			User.findById(req.user, function(err, user){

				// As you can see, params are in the URL content, whereas most other content is in the 
				// request body (req.body).

				// Only update each field if it has been requested.
				if(req.body.name) { user.name = req.body.name; }
				if(req.body.email) { user.email = req.body.email; }
				if(req.body.password) { user.password = req.body.password; }
				if(req.body.bio) { user.bio = req.body.bio; }
				if(req.body.organization) { user.organization = req.body.organization; }			

				user.save(function(err){

					if(err){ return next(err); }

					res.json(user);
				})
			});
		})

		.delete(function(req, res, next){

			User.remove({

				// Extract the user ID from the object already on the body.
				_id : req.user._id

			}, function(err, user){

				if(err) { return next(err); }

				res.json(user);
			});
		});

	// This pulls down the next event given a particular user.
	apiRouter.route('/user/:user/next')

		// Get the organization that this user is associated with.
		// Get the next event that is associated with that organization.

		.get(function(req, res, next){

			res.json(req.user.organization.events[0]);
		});


	// =============
	// EVENT API
	// =============

	// Anytime the event is passed as a parameter, pull it and attach it to the request body.
	apiRouter.param('event', function(req, res, next, id){

		// Use mongoose to find the correct organization by ID every time a post is requested.
		var query = Event.findById(id);

		// Execute the query
		query.exec(function(err, event){

			if(err){ return next(err); }

			if(!event){ return next(new Error('Couldn\'t find event.')); }

			// Assign the user object to the request object.
			req.event = event;

			// Continue executing the next piece of middleware.
			return next();
		});
	});

	// This manages all events.
	apiRouter.route('/events')

		// List all events.
		.get(function(req, res){

			// Find ALL events (no query parameter).
			Event.find(function(err, events){

				if(err){ return next(err); }

				res.json(events);
			});
		})

		// Create a new event.
		.post(function(req, res){

			Event.create(req.body, function(err, event){

				if(err){ return next(err); }

				res.json(event);
			});
		});

	// This route manages single events.
	apiRouter.route('/event/:event')

		// Get a single events.
		.get(function(req, res){

			res.json(req.event);
		})

		// Update an event.
		.put(function(req, res){

			// We access the DB thrice here.  Once to put the user data on the req object, again to
			// update the data, and once in the param() call from earlier.
			Event.findById(req.event, function(err, event){

				// As you can see, params are in the URL content, whereas most other content is in the 
				// request body (req.body).

				// Only update each field if it has been requested.
				if(req.body.date) { event.date = req.body.date; }

				if(req.body.roles.tmod) { event.roles.tmod = req.body.roles.tmod; }
				if(req.body.roles.grammarian) { event.roles.grammarian = req.body.roles.grammarian; }	
				if(req.body.roles.timer) { event.roles.timer = req.body.roles.timer; }	
				// TODO: How can you manage updates to this unknown nested array effectively?
				if(req.body.roles.speakers) { event.roles.speakers = req.body.roles.speakers; }	
				// TODO: How can you manage updates to this unknown nested array effectively?
				if(req.body.roles.evaluators) { event.roles.evaluators = req.body.roles.evaluators; }	
				if(req.body.roles.general_evaluator) { event.roles.general_evaluator = req.body.roles.general_evaluator; }		

				event.save(function(err){

					if(err){ return next(err); }

					res.json(event);
				})
			});
		})

		// Remove an event.
		.delete(function(req, res){

			Event.remove({

				// Extract the user ID from the object already on the body.
				_id : req.event._id

			}, function(err, event){

				if(err) { return next(err); }

				res.json(event);
			});
		});


	// =============
	// ORGANIZATION API
	// =============

	// Anytime the organization is passed as a parameter, pull it and attach it to the request body.
	apiRouter.param('organization', function(req, res, next, id){

		// Use mongoose to find the correct organization by ID every time a post is requested.
		var query = Organization.findById(id).populate({	path: 'members',
    														path: 'events' });

		// Execute the query
		query.exec(function(err, organization){

			if(err){ return next(err); }

			if(!organization){ return next(new Error('Couldn\'t find organization.')); }

			// Assign the user object to the request object.
			req.organization = organization;

			// Continue executing the next piece of middleware.
			return next();
		});
	});

	// This manages all organizations.
	apiRouter.route('/organizations')

		// List all organizations.
		.get(function(req, res, next){

			// Find ALL users (no query parameter).
			Organization.find(function(err, organizations){

				if(err){ return next(err); }

				res.json(organizations);
			});
		})

		// Create a new organization.
		.post(function(req, res, next){

			Organization.create(req.body, function(err, organization){

				if(err){ return next(err); }

				res.json(organization);
			});
		});

	// This route manages single organizations.
	apiRouter.route('/organization/:organization')

		// List all organizations.
		.get(function(req, res, next){

			res.json(req.organization);
		})

		// Update an organizations.
		.put(function(req, res, next){

			// We access the DB thrice here.  Once to put the user data on the req object, again to
			// update the data, and once in the param() call from earlier.
			Organization.findById(req.organization, function(err, organization){

				// As you can see, params are in the URL content, whereas most other content is in the 
				// request body (req.body).

				// Only update each field if it has been requested.
				if(req.body.name) { organization.name = req.body.name; }
				if(req.body.description) { organization.description = req.body.description; }
				if(req.body.admin) { organization.admin = req.body.admin; }
				if(req.body.events) { organization.events = req.body.events; }			

				organization.save(function(err){

					if(err){ return next(err); }

					res.json(organization);
				})
			});
		})

		.delete(function(req, res){

			Organization.remove({

				// Extract the user ID from the object already on the body.
				_id : req.organization._id

			}, function(err, organization){

				if(err) { return next(err); }

				res.json(organization);
			});
		});;

	// Manages the members of an organization
	apiRouter.route('/organization/:organization/members')

		// List all the members of an organization.
		.get(function(req, res, next){

			res.json(req.organization.members);
		})

		// Add an existing user to this organization.
		.post(function(req, res, next){

			// Find the user with the specified id.
			// User.findById(req.body.id, function(err, user){

			// 	req.organization.members
			// 	Organization.findBy
			// }

			// TODO: Perhaps add this as a function in the database object itself?

			// Add them to the members array for this organization.


			// req.organization.save();
		});

	// Helper function to return the admin for a certain organization.
	apiRouter.route('/organization/:organization/admin')

		.get(function(req, res, next){

			User.findById(req.organization.admin, function(err, user){

				if(err) { return next(err); }

				res.json(user);
			})
		});

	// Returns the router.
	return apiRouter;
}