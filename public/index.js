var socket = io.connect(location.host);

var choice = "questionmark";

var controller = new Leap.Controller({enableGestures: true});
controller.on('deviceFrame', function(frame) {
  for (var i = 0; i < frame.hands.length; i++) {
    var hand = frame.hands[i];

    if (hand.grabStrength > 0.6) {
      choice = "rock";
    } else if (hand.grabStrength < 0.3 && !hand.ringFinger.extended && !hand.pinky.extended) {
      choice = "scissors";
    } else if (hand.grabStrength < 0.4 && hand.thumb.extended && hand.indexFinger.extended
            && hand.middleFinger.extended && hand.ringFinger.extended && hand.pinky.extended) {
      choice = "paper";
    }
  }
  setChoicePic();
});
controller.connect();

socket.on('countdown', function(data) {
  document.getElementById('output').innerHTML = "Another player has connected. READY YOURSELF"
  setTimeout(function() { document.getElementById('output').innerHTML = "Rock..." }, 1500);
  setTimeout(function() { document.getElementById('output').innerHTML = "Paper..." }, 2250);
  setTimeout(function() { document.getElementById('output').innerHTML = "Scissors..." }, 3000);
  setTimeout(function() { document.getElementById('output').innerHTML = 'Shoot!' }, 3750);
  setTimeout(collectData, 4000);
});

function collectData() {
  console.log("Collected data");
  socket.emit('submit', {move: choice || 'rock'});
  controller.disconnect();
};

function setChoicePic() {
  document.getElementById('player-pic').src = "assets/" + choice + '.png';
}

function setOpponentPic(pic) {
  document.getElementById('opponent-pic').src = "assets/" + pic + '.png';
}

socket.on('result', function(data){
  console.log(data);
  console.log(data.result);
  document.getElementById('output').innerHTML = data.result;
  setOpponentPic(data.opponent);
  socket.disconnect();
});

function reconnect(){
  socket.connect();
  controller.connect();
  choice = "questionmark";
  setChoicePic();
  setOpponentPic("questionmark");
  document.getElementById('output').innerHTML = "Waiting for another user..."
};
