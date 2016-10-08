var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	imageURL: {type: String, require: true},
	Name: {type: String, require: true},
	description: {type: String, require: true},
	price: {type: Number, require: true},
});

module.exports = mongoose.model('Cupcake', schema);