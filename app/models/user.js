var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

	name : { type : String, required : true},
	email: { type : String, required : true, index : {unique : true}},
	password: { type : String, required : true, select : false},
	bio : String,
	organization : { type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
});


// Export the user model...
// ==========

module.exports = mongoose.model('User', userSchema);