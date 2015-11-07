
var socket = io.connect('http://localhost:3000');

console.log('Index.js called');

io.on('countdown', function(data) {
  for (var i = data.count; i >= 0; i--) {
    setTimeout(function() {
      document.getElementById('count-box').innerHTML = i;
    }, 1000);
  }
  // collectData();
  console.log("Countdown achieved");
});

function collectData() {

}
