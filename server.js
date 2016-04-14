var express = require('express');
var app = express();
var port = process.env.PORT || 9000;


app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Сервер слушает порт: " + port);