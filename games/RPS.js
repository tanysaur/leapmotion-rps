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
  player.on('submit', function(data) {
    player.move = data.move;
    self.getResults(player, opponent);
  });
};

Game.prototype.getResults = function(player, opponent){
  if(opponent.move){
    if (player.move == 'rock') {
      if (opponent.move == 'scissors') {
        // player wins
      } else if (opponent.move == 'paper') {
        // opponent wins
      } else {
        // tie
      }
    } else if (player.move == 'scissors') {
      if (opponent.move == 'rock') {
        // opponent wins
      } else if (opponent.move == 'paper') {
        // player wins
      } else {
        // tie
      }
    }
    else {  // player threw paper
      if (opponent.move == 'scissors') {
        // opponent wins
      } else if (opponent.move == 'rock') {
        // player wins
      } else {
        // tie
      }
    }
  }
};

Game.prototype.sendResults = function(player, opponent, result) {
  if (result == 0) {
    player.emit('result', {result: 'winner'} );
    opponent.emit('result', {result: 'loser'} );
  } else if (result == 1) {
    player.emit('result', { result: 'loser' } );
    opponent.emit('result', { result: 'winner' } );
  } else {
    player.emit('result', { result: 'tie' } );
    opponent.emit('result', { result: 'tie' } );
  }
}

module.exports = Game;
