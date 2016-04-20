'use strict';

var Feed = require('./feed.model');

exports.find = function(req, res) {
	Feed.find(function(err, feeds) {
		if(err)
			res.send(err)

		res.json(feeds);
	});
};

exports.post = function(req, res) {
	Feed.create({
		title : req.body.title,
		url : req.body.url
	}, function(err, feed) {
		if (err)
			res.send(err);
		console.log('New feed: '+feed);

		Feed.find(function(err, feeds) {
			if (err)
				res.send(err)
			res.json(feeds);
		});
	});
};

exports.delete = function(req, res) {
	Feed.remove({
		_id : req.params.feed_id
	}, function(err, feed) {
		if (err)
			res.send(err);
		console.log('Del feed: '+feed);

		Feed.find(function(err, feeds) {
			if (err)
				res.send(err)
			res.json(feeds);
		});
	});
};

