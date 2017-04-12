var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Game = require('./games/RPS')
var PORT = process.env.PORT || 3000;

//server.listen(3000);
server.listen(PORT, function(){
  console.log('listening on *:'+ PORT);
});

app.use(express.static('public'));

var lobby = [];

io.on('connection', function (socket) {
  var game;
  if (lobby.length == 0) {
    lobby.push(socket);
  } else {
    game = new Game(lobby.shift(), socket);
  }

  socket.on('disconnect', function () {
    var index = lobby.indexOf(socket);
    if (index > -1) {
      lobby.splice(index, 1);
    }
    if (game) {
      game.alertDisconnect(socket);
    }
  });
});
