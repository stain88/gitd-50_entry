var DELAY     = 700,
    clicks    = 0,
    timer     = null,
    muted     = false,
    character = {},
    $s,$o,$m,$d;

$(function() {
  $s = $('#singletext');
  $o = $('#optiontext');
  $d = $('#doubletext');
  $m = $('#maintext');
  newGame();
});

var newGame = function() {
  changeText($o,"Choose an option");
  changeText($s,"Start");
  changeText($d,"Options");
  option(charCreation, musicOption);
}

var musicOption = function() {
  if (muted) changeText($o,"Miss the music?");
  else changeText($o,"Enough music?");
  changeText($s,"Toggle Music");
  changeText($d,"Back to Start");
  option(toggleMute, newGame);
}

var toggleMute = function() {
  muted = !muted;
  newGame();
}

var charCreation = function() {
  changeText($o,"Gender?");
  changeText($s,"Male");
  changeText($d,"Female");
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
  changeText($o,"Class?");
  firstClass();
}

var firstClass = function() {
  changeText($s,"Warrior");
  changeText($d,"Next");
  option(warriorClass, secondClass);
}

var secondClass = function() {
  changeText($s,"Rogue");
  changeText($d,"Next");
  option(rogueClass, thirdClass);
}

var thirdClass = function() {
  changeText($s,"Mage");
  changeText($d,"Next");
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
  changeText($o, "You are a " + character.gender + " " + character.class + ".");
  changeText($s, "Confirm");
  changeText($d, "Pick again");
  option(gotoInn, charCreation)
}

var gotoInn = function() {
  changeText($m,"You are at the inn.");
  changeText($o, "What would you like to do?");
  innFirstChoice();
}

var innFirstChoice = function() {
  changeText($s, "Rest");
  changeText($d, "Next");
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