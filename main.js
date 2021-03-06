var DELAY         = 400,
    clicks        = 0,
    timer         = null,
    muted         = false,
    character     = {},
    questsDone    = 0,
    currentQuest  = {},
    tripCounter   = 0,
    currentMusic  = null,
    intro_music   = new Audio("Impossible_Spheres.mp3"),
    travel_music  = new Audio("Illegal_Echoes.mp3"),
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
  changeText($m, "So you want to go on an Adventure?")
  changeText($o, "Choose an option");
  changeText($s, "Start");
  changeText($d, "Options");
  $('#choicebtn h3').text("Choose wisely...");
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
  character.str = 20;
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
  addTrack(intro_music);
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
  if (questsDone >= 5) {
    changeText($o, "Looks like you're ready for the final quest.")
    changeText($s, "Accept");
    changeText($d, "Refuse");
    option(finalQuest,gotoInn);
  } else {
    var randa = Math.floor(Math.random()*4);
    var randb = Math.floor(Math.random()*2);
    currentQuest.number = Math.floor(Math.random()*4)+2;
    currentQuest.enemy = ["goblin", "rat", "wolf", "ogre"][randa];
    currentQuest.type = ["Kill", "Collect"][randb];
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
  changeText($o, "Please defeat the evil warlock in the castle.");
  option(acceptFinal, gotoMap);
}

var acceptFinal = function() {
  currentQuest.type = "Kill";
  currentQuest.enemy = "warlock";
  currentQuest.number = 1;
  currentQuest.info = "Kill 1 warlock";
  changeText($o, "Here is the key to open the castle gate.");
  changeText($s, "Thanks");
  changeText($d, "Leave");
  option(gotoMap, gotoMap);
}

var quitQuest = function() {
  currentQuest = {};
  talkInn();
}

var gotoMap = function() {
  addTrack(travel_music);
  $('#choicebtn').removeClass('btn-danger btn-warning').addClass('btn-primary');
  changeText($m, "You are looking at the world map.");
  changeText($o, "Where would you like to go?");
  mapFirstChoice();
}

var mapFirstChoice = function() {
  changeText($s, "Inn");
  changeText($d, "Next");
  option(gotoInn, mapSecondChoice);
}

var mapSecondChoice = function() {
  changeText($s, "Forest");
  option(gotoForest, mapThirdChoice);
}

var mapThirdChoice = function() {
  changeText($s, "Cave");
  option(gotoCave, mapFourthChoice);
}

var mapFourthChoice = function() {
  changeText($s, "Castle");
  option(gotoCastle, mapFirstChoice);
}

var gotoForest = function() {
  changeText($m, "You are in a forest.");
  changeText($o, "What would you like to do?");
  forestFirstChoice();
}

var forestFirstChoice = function() {
  $('#choicebtn').removeClass('btn-primary btn-danger').addClass('btn-warning');
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
  $('#choicebtn').removeClass('btn-primary btn-warning').addClass('btn-danger');
  changeText($o, "You encounter a goblin!");
  changeText($s, "Fight");
  changeText($d, "Run");
  option(battleGoblin, gotoForest);
}

var battleGoblin = function() {
  if (currentQuest.type === "Collect" && currentQuest.enemy === "goblin") {
    var drop = Math.random();
    if (drop < 0.75) {
      changeText($o, "You defeated the goblin, and kept its head.")
      updateQuestInfo();
    }
    else changeText($o, "You defeated the goblin.");
  }
  else changeText($o, "You defeated the goblin.");

  if (currentQuest.type === "Kill" && currentQuest.enemy === "goblin") updateQuestInfo();

  forestFirstChoice();
}

var encounterWolf = function() {
  $('#choicebtn').removeClass('btn-primary btn-warning').addClass('btn-danger');
  changeText($o, "You encounter a wolf!");
  changeText($s, "Fight");
  changeText($d, "Run");
  option(battleWolf, gotoForest);
}

var battleWolf = function() {
  if (currentQuest.type === "Collect" && currentQuest.enemy === "wolf") {
    var drop = Math.random();
    if (drop < 0.75) {
      changeText($o, "You defeated the wolf, and kept its pelt.")
      updateQuestInfo();
    }
    else changeText($o, "You defeated the wolf.");
  } 
  else changeText($o, "You defeated the wolf.");

  if (currentQuest.type === "Kill" && currentQuest.enemy === "wolf") updateQuestInfo();

  forestFirstChoice();
}

var gotoCave = function() {
  changeText($m, "You are in a cave.");
  changeText($o, "What would you like to do?");
  caveFirstChoice();
}

var caveFirstChoice = function() {
  $('#choicebtn').removeClass('btn-primary btn-danger').addClass('btn-warning');
  changeText($s, "Explore");
  changeText($d, "Leave")
  option(exploreCave, gotoMap);
}

var exploreCave = function() {
  var rand = Math.random();
  if (rand < 0.2) changeText($o, "What a dark cave.");
  else if (rand < 0.6) encounterRat();
  else encounterOgre();
}

var encounterRat = function() {
  $('#choicebtn').removeClass('btn-primary btn-warning').addClass('btn-danger');
  changeText($o, "You encounter a rat!");
  changeText($s, "Fight");
  changeText($d, "Run");
  option(battleRat, gotoCave);  
}

var battleRat = function() {
  if (currentQuest.type === "Collect" && currentQuest.enemy === "rat") {
    var drop = Math.random();
    if (drop < 0.75) {
      changeText($o, "You defeated the rat, and kept its tail.")
      updateQuestInfo();
    }
    else changeText($o, "You defeated the rat.");
  }
  else changeText($o, "You defeated the rat.");

  if (currentQuest.type === "Kill" && currentQuest.enemy === "rat") updateQuestInfo();

  caveFirstChoice();
}

var encounterOgre = function() {
  $('#choicebtn').removeClass('btn-primary btn-warning').addClass('btn-danger');
  changeText($o, "You encounter a ogre!");
  changeText($s, "Fight");
  changeText($d, "Run");
  option(battleOgre, gotoCave);
}

var battleOgre = function() {
  if (currentQuest.type === "Collect" && currentQuest.enemy === "ogre") {
    var drop = Math.random();
    if (drop < 0.75) {
      changeText($o, "You defeated the ogre, and kept its club.")
      updateQuestInfo();
    } 
    else changeText($o, "You defeated the ogre.");
  }
  else changeText($o, "You defeated the ogre.");

  if (currentQuest.type === "Kill" && currentQuest.enemy === "ogre") updateQuestInfo();

  caveFirstChoice();
}

var gotoCastle = function() {
  $('#choicebtn').removeClass('btn-primary btn-danger').addClass('btn-warning');
  if (currentQuest.enemy !== "warlock") {
    changeText($o, "The gate is locked, and there is no other way in.");
    changeText($s, "Ok");
    changeText($d, "Leave");
    option(gotoMap, gotoMap);
  } else {
    changeText($o, "You unlock the gate.");
    changeText($s, "Explore");
    changeText($d, "Leave");
    option(exploreCastle, gotoMap);
  }
}

var exploreCastle = function() {
  var rand = Math.random();
  if (rand < 0.33) changeText($o, "Where could that warlock be?");
  else if (rand < 0.66) changeText($o, "You try this corridor.");
  else changeText($o, "Maybe down this path?");

  option(exploreCastle, gotoMap);

  ++tripCounter;
  if (tripCounter >= 10) findWarlock();
}

var findWarlock = function() {
  tripCounter = 0;
  changeText($o, "You found the warlock!");
  changeText($s, "Fight");
  changeText($d, "Run");
  option(battleWarlock, gotoMap);
}

var battleWarlock = function() {
  $('#choicebtn').removeClass('btn-primary btn-warning').addClass('btn-danger');
  changeText($o, "You hit the warlock for " + Math.floor(Math.random()*(character.str + character.dex + character.int)) + " damage.");
  option(firstStrike, gotoMap);
}

var firstStrike = function() {
  changeText($o, "You hit the warlock for " + Math.floor(Math.random()*(character.str + character.dex + character.int)) + " damage.");
  option(secondStrike, gotoMap);
}

var secondStrike = function() {
  changeText($o, "You hit the warlock for " + Math.floor(Math.random()*(character.str + character.dex + character.int)) + " damage.");
  option(thirdStrike, gotoMap);
}

var thirdStrike = function() {
  changeText($o, "You defeated the warlock!");
  changeText($s, "Huzzah!");
  changeText($d, "Leave");
  option(endScene, endScene);
}

var endScene = function() {
  $('#choicebtn').removeClass('btn-danger btn-warning').addClass('btn-primary');
  $('#choicebtn h3').text("Thanks for playing");
  addTrack(intro_music);
  changeText($o, "The town thanks you for your efforts.")
  changeText($s, "View credits");
  changeText($d, "View credits");
  option(viewCredits, viewCredits);
}

var viewCredits = function() {
  changeText($m, "Created for Game in Ten Days #50");
  changeText($s, "Next");
  changeText($d, "Play again");
  creditMusic();
}

var creditMusic = function() {
  changeText($o, "Music from JukeDeck.");
  option(creditProgrammer, newGame);
}

var creditProgrammer = function() {
  changeText($o, "Written by stain88");
  option(creditOthers, newGame);
}

var creditOthers = function() {
  changeText($o, "Remember to check out the other entries, and vote for your favourite!");
  changeText($s, "Play again");
  option(newGame, newGame);
}

var updateQuestInfo = function() {
  currentQuest.number = Math.max(0, --currentQuest.number);
  currentQuest.info = currentQuest.info.split(" ");
  currentQuest.info[1] = currentQuest.number;
  currentQuest.info = currentQuest.info.join(" ");
  if (currentQuest.number <= 0) currentQuest.status = "done";
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
  if (track === currentMusic) return;
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
    if (track.currentTime !== 0) track.currentTime = 0;
    track.play();
  }
};