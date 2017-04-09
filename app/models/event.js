var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({

	date : { type: Date, required: true },
	roles : {

		tmod : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
		grammarian : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		timer : { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		speakers : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
		evaluators : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
		general_evaluator : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
	}
});


// Export the event model...
// ==========

module.exports = mongoose.model('Event', eventSchema);