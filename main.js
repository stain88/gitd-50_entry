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
  option(charCreation, musicOption);
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

var charCreation = function() {
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

var warriorClass = function() {
  character.class = "warrior";
  character.health = 50;
  character.str = 10;
  character.dex = 2;
  character.int = 4;
  confirmClass();
}

var rogueClass = function() {
  character.class = "rogue";
  character.health = 50;
  character.str = 5;
  character.dex = 10;
  character.int = 6;
  confirmClass();
}

var mageClass = function() {
  character.class = "mage";
  character.health = 50;
  character.str = 2;
  character.dex = 5;
  character.int = 10;
  confirmClass();
}

var confirmClass = function() {
  $('#optiontext').text("You are a " + character.gender + " " + character.class + ".");
  $('#singletext').text("Confirm");
  $('#doubletext').text("Pick again");
  console.log(character);
  option(startAdventure, charCreation)
}

var startAdventure = function() {
  console.log("on an adventure");
}

var option = function(a, b) {
  $('#choicebtn').off();
  $('#choicebtn').on("click", function(e) {
    clicks++;
    if (clicks === 1) {
      timer = setTimeout(function() {
        clicks = 0;
        return a();
      }, DELAY);
    } else {
      clearTimeout(timer);
      clicks = 0;
      return b();
    }
  })
  .on("dblclick", function(e) {
    e.preventDefault();
  });
}