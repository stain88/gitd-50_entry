var DELAY   = 700,
    clicks  = 0,
    timer   = null,
    muted   = false;

$(function() {
  newGame();
});

var newGame = function() {
  $('#singletext').text("Start");
  $('#doubletext').text("Options");
  option(startGame, musicOption);
}

var startGame = function() {
  console.log("starting");
}

var musicOption = function() {
  $('#singletext').text("Toggle Music");
  $('#doubletext').text("Back to Start");
  option(toggleMute, newGame);
}

var toggleMute = function() {
  muted = !muted;
  console.log(muted);
  newGame();
}

var option = function(a, b) {
  $('#choicebtn').off();
  console.log("enter", clicks);
  $('#choicebtn').on("click", function(e) {
    clicks++;
    if (clicks === 1) {
      timer = setTimeout(function() {
        console.log("single", a, clicks);
        clicks = 0;
        return a();
      }, DELAY);
    } else {
      clearTimeout(timer);
      console.log("double", b, clicks);
      clicks = 0;
      console.log(clicks);
      return b();
    }
  })
  .on("dblclick", function(e) {
    e.preventDefault();
  });
}