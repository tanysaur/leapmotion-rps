var Game = function(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.onSubmit(this.player1, this.player2);
  this.onSubmit(this.player2, this.player1);
  this.sendCountdown(player1, 3);
  this.sendCountdown(player2, 3);
};

Game.prototype.sendCountdown = function(player, count) {
  player.emit('countdown', {count: count});
};

Game.prototype.onSubmit = function(player, opponent){
  var self = this;
  player.on('submit', function(data){
    player.move = data.move;
    self.getResults(player, opponent);
  });
};

Game.prototype.getResults = function(player, opponent){
  if(opponent.move){
    
  }
};

module.exports = Game;
