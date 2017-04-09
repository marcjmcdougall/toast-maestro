var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationSchema = new Schema({

	name : { type : String, required : true},
	description : String,
	admin : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	events : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});


// Export the user model...
// ==========

module.exports = mongoose.model('Organization', organizationSchema);