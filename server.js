var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', function(){
  console.log("AYY LMAO");
});



server.listen(80);
