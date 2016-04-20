'use strict';

var express = require('express');
var router = express.Router();

var feed = require('./feed/feed.controller');

router.get('/api/feeds', feed.find);
router.post('/api/feeds', feed.post);
router.delete('/api/feeds/:feed_id', feed.delete);

module.exports = router;
