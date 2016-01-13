var DELAY     = 700,
    clicks    = 0,
    timer     = null,
    muted     = false,
    character = {};

$(function() {
  newGame();
});

var newGame = function() {
  $('#optiontext').text("Choose an option");
  $('#singletext').text("Start");
  $('#doubletext').text("Options");
  option(startGame, musicOption);
}

var musicOption = function() {
  if (muted) $('#optiontext').text("Miss the music?");
  else $('#optiontext').text("Enough music?");
  $('#singletext').text("Toggle Music");
  $('#doubletext').text("Back to Start");
  option(toggleMute, newGame);
}

var toggleMute = function() {
  muted = !muted;
  console.log(muted);
  newGame();
}

var startGame = function() {
  $('#optiontext').text("Gender?");
  $('#singletext').text("Male");
  $('#doubletext').text("Female");
  option(genderM, genderF);
}

var genderM = function() {
  character.gender = "male";
  firstClass();
}

var genderF = function() {
  character.gender = "female";
  firstClass();
}

var firstClass = function() {
  $('#optiontext').text("Class?");
  $('#singletext').text("Warrior");
  $('#doubletext').text("Next");
  option(warriorClass, secondClass);
}

var secondClass = function() {
  $('#singletext').text("Rogue");
  $('#doubletext').text("Next");
  option(rogueClass, thirdClass);
}

var thirdClass = function() {
  $('#singletext').text("Mage");
  $('#doubletext').text("Next");
  option(mageClass, firstClass);
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