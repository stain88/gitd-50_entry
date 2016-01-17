var DELAY         = 500,
    clicks        = 0,
    timer         = null,
    muted         = false,
    character     = {},
    questsDone    = 0,
    currentQuest  = {},
    currentMusic  = null,
    intro_music   = new Audio("Impossible_Spheres.mp3", {"loop": true}),
    $s,$o,$m,$d;

$(function() {
  $s = $('#singletext');
  $o = $('#optiontext');
  $d = $('#doubletext');
  $m = $('#maintext');
  newGame();
});

var newGame = function() {
  addTrack(intro_music);
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
  if (muted) currentMusic.pause();
  else {
    currentMusic.currentTime=0;
    currentMusic.play();
  }
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
  character.inv = {};
  confirmClass();
}

var rogueClass = function() {
  character.class = "rogue";
  character.health = 40;
  character.maxHealth = 40;
  character.str = 5;
  character.dex = 10;
  character.int = 6;
  character.inv = {};
  confirmClass();
}

var mageClass = function() {
  character.class = "mage";
  character.health = 30;
  character.maxHealth = 30;
  character.str = 2;
  character.dex = 5;
  character.int = 10;
  character.inv = {};
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
  changeText($s, "Toggle Music");
  option(toggleMusic, innFourthChoice);
}

var innFourthChoice = function() {
  changeText($s, "Leave");
  option(gotoMap, innFirstChoice);
}

var rest = function() {
  character.health = character.maxHealth;
  changeText($o, "You are fully healed.");
  innSecondChoice();
}

var toggleMusic = function() {
  if (muted) {
    changeText($o, "Miss the music?");
    changeText($s, "Turn on");
  } else {
    changeText($o, "Enough music?");
    changeText($s, "Turn off");
  }
  changeText($d, "Back");
  option(toggleMuteInn, innFirstChoice);
}

var toggleMuteInn = function() {
  changeText($o, "What would you like to do?");
  muted = !muted;
  if (muted) currentMusic.pause();
  else {
    currentMusic.currentTime=0;
    currentMusic.play();
  }
  innFirstChoice();
}

var talkInn = function() {
  console.log(currentQuest);
  if (currentQuest.status === "doing") {
    changeText($o, "You already have a quest.");
    changeText($s, "Check quest");
    changeText($d, "Leave");
    option(checkQuest, gotoMap);
  } else if (currentQuest.status === "done") {
    changeText($o, "Complete quest?")
    changeText($s, "Turn in");
    changeText($d, "Leave");
    option(completeQuest, gotoMap);
  } else {
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
    currentQuest.number = Math.floor(Math.random()*4)+6;
    currentQuest.enemy = ["goblin", "rat", "wolf", "ogre"][randa];
    currentQuest.type = ["Kill", "Collect"][randb];
    console.log(currentQuest);
    if (currentQuest.type === "Kill") {
      currentQuest.info = "Kill " + currentQuest.number + " " + (currentQuest.enemy === "wolf" ? "wolves." : currentQuest.enemy + "s.");
      changeText($o, currentQuest.info);
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
      currentQuest.info = "Collect " + currentQuest.number + " " + currentQuest.enemy + " " + currentQuest.item + ".";
      changeText($o, currentQuest.info);
    }
    changeText($s, "Accept");
    changeText($d, "Another");
    option(acceptQuest, getQuest)
  }
}

var acceptQuest = function() {
  switch (currentQuest.enemy) {
    case "goblin":
      changeText($o, "Goblins can be found in forests.");
      break;
    case "rat":
      changeText($o, "Rats can be found in caves.");
      break;
    case "wolf":
      changeText($o, "Wolves can be found in forests.");
      break;
    case "ogre":
      changeText($o, "Ogres can be found in caves.");
      break;
  }
  currentQuest.status = "doing";
  changeText($s, "Thanks");
  changeText($d, "Leave");
  option(gotoMap, gotoMap);
}

var checkQuest = function() {
  changeText($o, currentQuest.info);
  changeText($s, "Abandon");
  changeText($d, "Leave");
  option(quitQuest, gotoMap);
}

var completeQuest = function() {
  questsDone++;
  currentQuest = {};
  talkInn();
}

var finalQuest = function() {

}

var quitQuest = function() {
  currentQuest = {};
  talkInn();
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
  changeText($m, "You are in a forest.");
  changeText($o, "What would you like to do?");
  forestFirstChoice();
}

var forestFirstChoice = function() {
  changeText($s, "Explore");
  changeText($d, "Leave")
  option(exploreForest, gotoMap);
}

var exploreForest = function() {
  var rand = Math.random();
  if (rand < 0.2) changeText($o, "What a peaceful forest.");
  else if (rand < 0.6) encounterGoblin();
  else encounterWolf();
}

var encounterGoblin = function() {
  changeText($o, "You encounter a goblin!");
  changeText($s, "Fight");
  changeText($d, "Run");
  option(battleGoblin, gotoForest);
}

var battleGoblin = function() {
  var drop = Math.random();
  if (drop < 0.75) {
    changeText($o, "You defeated the goblin, and kept its head.")
    if (character.inv.goblinhead) character.inv.goblinhead++;
    else character.inv.goblinhead = 1;
  } else {
    changeText($o, "You defeated the goblin.");
  }
  forestFirstChoice();
}

var encounterWolf = function() {
  changeText($o, "You encounter a wolf!");
  changeText($s, "Fight");
  changeText($d, "Run");
  option(battleWolf, gotoForest);
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

var addTrack = function(track) {
  if (currentMusic) currentMusic.pause();
  if (typeof track.loop == 'boolean') {
    track.loop = true;
  } else {
    track.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
  }
  currentMusic = track;
  if (!muted) {
    track.play();
  }
};