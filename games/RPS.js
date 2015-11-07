var Game = function(player1, player2){
  this.player1 = player1;
  this.player2 = player2;
};

Game.prototype.log = function(){
  console.log('New Game created with' + this.player1 + 'and' + this.player2);
};

module.exports = Game;
