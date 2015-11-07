
var socket = io.connect('http://localhost:3000');

console.log('Index.js called');

socket.on('countdown', function(data) {
  for (var i = 1; i <= 4; i++) {
    setTimeout(function(i) {
      document.getElementById('count-box').innerHTML = 4 - i
    }, i * 1000)
  }
  setTimeout(collectData(), 5000);
  // for (var i = data.count; i >= 0; i--) {
  //   setTimeout(function(i) {
  //     document.getElementById('count-box').innerHTML = i;
  //   }, 1000);
  // }
  // // collectData();
  // setTimeout(console.log("Countdown achieved");, 4000);
});

function collectData() {
  socket.emit('submit', {move: 'rock'});
}
