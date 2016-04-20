'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
	title : String,
	url : String
});

module.exports = mongoose.model('Feed', FeedSchema);
