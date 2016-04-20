'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./src/routes')


var mongodbUrl = 'mongodb://user:A8E69cS3No@ds013250.mlab.com:13250/rssapp';

var dbOptions = {
	server: {
		socketOptions: {
			keepAlive: 1
		}
	},
	auto_reconnect: true
};

mongoose.connection.on('error', function(err) {
	console.log('MongoDB connection error.')
	console.log(err);
});

mongoose.connection.on('disconnected', function() {
	mongoose.connect(mongodbUrl, dbOptions);
});

mongoose.connect(mongodbUrl, dbOptions);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cors());

app.use(routes);

app.use('/', express.static(__dirname + '/../public'));

mongoose.connection.once('open', function callback() {
	console.log('Successful connection to MongoDB.')
	app.listen(3002, function() {
		console.log('rssApp listening on port %d', this.address().port);
		console.log('------------------------------');
		console.log("Sorry, i didn't manage to do backend");
	});
});

module.exports = app;
