var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Game = require('./games/RPS')

server.listen(3000);

app.use(express.static('public'));

var lobby = [];

io.on('connection', function (socket) {
  console.log("socket connected" + socket);
  if (lobby.length == 0) {
    lobby.push(socket);
  } else {
    new Game(lobby.shift(), socket);
  }

  socket.on('disconnect', function () {
    var index = lobby.indexOf(socket);
    if (index > -1) {
      lobby.splice(index, 1);
    }
  });
});
