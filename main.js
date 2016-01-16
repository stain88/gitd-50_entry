var DELAY     = 700,
    clicks    = 0,
    timer     = null,
    muted     = false,
    character = {};

$(function() {
  newGame();
});

var newGame = function() {
  changeText($('#optiontext'),"Choose an option");
  changeText($('#singletext'),"Start");
  changeText($('#doubletext'),"Options");
  option(charCreation, musicOption);
}

var musicOption = function() {
  if (muted) changeText($('#optiontext'),"Miss the music?");
  else changeText($('#optiontext'),"Enough music?");
  changeText($('#singletext'),"Toggle Music");
  changeText($('#doubletext'),"Back to Start");
  option(toggleMute, newGame);
}

var toggleMute = function() {
  muted = !muted;
  newGame();
}

var charCreation = function() {
  changeText($('#optiontext'),"Gender?");
  changeText($('#singletext'),"Male");
  changeText($('#doubletext'),"Female");
  option(genderM, genderF);
}

var genderM = function() {
  character.gender = "male";
  chooseClass();
}

var genderF = function() {
  character.gender = "female";
  chooseClass();
}

var chooseClass = function() {
  changeText($('#optiontext'),"Class?");
  firstClass();
}

var firstClass = function() {
  changeText($('#singletext'),"Warrior");
  changeText($('#doubletext'),"Next");
  option(warriorClass, secondClass);
}

var secondClass = function() {
  changeText($('#singletext'),"Rogue");
  changeText($('#doubletext'),"Next");
  option(rogueClass, thirdClass);
}

var thirdClass = function() {
  changeText($('#singletext'),"Mage");
  changeText($('#doubletext'),"Next");
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
  changeText($('#optiontext'), "You are a " + character.gender + " " + character.class + ".");
  changeText($('#singletext'), "Confirm");
  changeText($('#doubletext'), "Pick again");
  option(startAdventure, charCreation)
}

var startAdventure = function() {
  changeText($('#maintext'),"You are at the inn.");
  changeText($('#optiontext'), "What would you like to do?");
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

var changeText = function(sign, string) {
  sign.fadeOut(function() {
    $(this).text(string).fadeIn();
  });
};