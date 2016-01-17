var DELAY         = 500,
    clicks        = 0,
    timer         = null,
    muted         = false,
    character     = {},
    questsDone    = 0,
    currentQuest  = {},
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
  option(rogueClass, thirdClass);
}

var thirdClass = function() {
  changeText($s,"Mage");
  option(mageClass, firstClass);
}

var warriorClass = function() {
  character.class = "warrior";
  character.health = 50;
  character.maxHealth = 50;
  character.str = 10;
  character.dex = 2;
  character.int = 4;
  confirmClass();
}

var rogueClass = function() {
  character.class = "rogue";
  character.health = 40;
  character.maxHealth = 40;
  character.str = 5;
  character.dex = 10;
  character.int = 6;
  confirmClass();
}

var mageClass = function() {
  character.class = "mage";
  character.health = 30;
  character.maxHealth = 30;
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
  option(rest, innSecondChoice);
}

var innSecondChoice = function() {
  changeText($s, "Talk to Innkeeper");
  option(talkInn, innThirdChoice);
}

var innThirdChoice = function() {
  changeText($s, "Leave");
  option(gotoMap, innFirstChoice);
}

var rest = function() {
  character.health = character.maxHealth;
  changeText($o, "You are fully healed.");
  innSecondChoice();
}

var talkInn = function() {
  console.log(currentQuest);
  if (currentQuest.status === "doing") {
    changeText($o, "You already have a quest.");
    changeText($s, "Check quest");
    changeText($d, "Leave");
    option(checkQuest, gotoMap);
  }
  else if (currentQuest.status === "done") {
    changeText($o, "Complete quest?")
    changeText($s, "Turn in");
    changeText($d, "Leave");
    option(completeQuest, gotoMap);
  }
  else {
    changeText($o, "Would you like a quest?");
    changeText($s, "Yes");
    changeText($d, "No");
    option(getQuest, gotoInn);
  }
}

var getQuest = function() {
  if (questsDone === 5) {
    changeText($o, "Looks like you're ready for the final quest.")
    changeText($s, "Accept");
    changeText($d, "Refuse");
    option(finalQuest,gotoInn);
  } else {
    var randa = Math.floor(Math.random()*4);
    var randb = Math.floor(Math.random()*2);
    var randc = Math.floor(Math.random()*4)+6;
    currentQuest.enemy = ["goblin", "rat", "wolf", "ogre"][randa];
    currentQuest.type = ["Kill", "Collect"][randb];
    console.log(currentQuest);
    if (currentQuest.type === "Kill") {
      changeText($o, "Kill " + randc + " " + (currentQuest.enemy === "wolf" ? "wolves." : currentQuest.enemy + "s."));
    } else {
      switch (currentQuest.enemy) {
        case "goblin":
          currentQuest.item = "heads";
          break;
        case "rat":
          currentQuest.item = "tails";
          break;
        case "wolf":
          currentQuest.item = "pelts";
          break;
        case "ogre":
          currentQuest.item = "clubs";
          break;
      }
      changeText($o, "Collect " + randc + " " + currentQuest.item + ".");
    }
    changeText($s, "Accept");
    changeText($d, "Another");
    option(acceptQuest, getQuest)
  }
}

var quitQuest = function() {
  console.log("quitting quest");
}

var gotoMap = function() {
  changeText($m, "You are looking at the world map.");
  changeText($o, "Where would you like to go?");
  mapFirstChoice();
}

var mapFirstChoice = function() {
  changeText($s, "Forest");
  changeText($d, "Next");
  option(gotoForest, mapSecondChoice);
}

var mapSecondChoice = function() {
  changeText($s, "Cave");
  option(gotoCave, mapThirdChoice);
}

var mapThirdChoice = function() {
  changeText($s, "Castle");
  option(gotoCastle, mapFourthChoice);
}

var mapFourthChoice = function() {
  changeText($s, "Inn");
  option(gotoInn, mapFirstChoice);
}

var gotoForest = function() {

}

var gotoCave = function() {

}

var gotoCastle = function() {

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