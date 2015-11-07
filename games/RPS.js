var Game = function(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.sendCountdown(player1, 3);
  this.sendCountdown(player2, 3);
};

Game.prototype.sendCountdown = function(player, count) {
  player.emit('countdown', {count: count});
};

module.exports = Game;
