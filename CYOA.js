//CYOA Javascript

//-----------------------Start Screen and Loading Screen-----------------------

//Get start text to cycle colours
//Array to hold colours
var titleColours = ["#66cd00", "#f69500", "#D4147A"];

//Counter var
var titleCount = 0;

//Function that changes colours
function changeTitle() {
  //Increase counter if less than lenth of array
  if (titleCount < titleColours.length - 1) {
    titleCount++;
  }else {//Set counter back to 0
    titleCount = 0;
  }
  
  //Set the colour to the current colour determined by the counter
  getId("pressStart").style.color = titleColours[titleCount];
  
  //Make the text size 'blink'
  //Increase text size
  getId("pressStart").style.fontSize = "1.1rem";
  //Wait a bit then reset it
  setTimeout(resetTitle, 100);
  //Reset function
  function resetTitle() {
    getId("pressStart").style.fontSize = "1rem";
  }
  

}

//Keep repeating blinking title text
var titleInt = setInterval(changeTitle, 2000);


//Var that tells program whether still on start screen(on start screen to begin with)
var onStartScreen = true;
//Var that tells whether on character creation
var onCharScreen = false;
//Var that tells whether on main game screen
var onMainScreen = false;

window.addEventListener ("keypress", function (e) {
  keyPress(e.keyCode);
});
window.addEventListener ("keydown", function (e) {
  keyDown(e.keyCode);
});

//Manage keyboard presses
function keyPress(event) {
  //Stores the key that was pressed
  var checkKey = event;
  
  //Only run if it's on the start screen
  if (onStartScreen === true) {
    
    //If it was the 'enter' key(or if the user clicked the element), stop the title
    if (checkKey == 13 || event == "13") {
      //Stop the title from flashing and hide it
      clearInterval(titleInt);
      getId("pressStart").style.display = "none";
      getId("version").style.display = "none";
      getId("copyright").style.display = "none";
      //Set onStartScreen = to false so function doesn't run again
      onStartScreen = false;
      //Play loading screen
      loadScreen("charScreen");
    }
    
    //If it was the 'T' key, skip Character creation
    if (checkKey == 116 || event == "116") {
      //Stop the title from flashing and hide it
      clearInterval(titleInt);
      getId("pressStart").style.display = "none";
      getId("version").style.display = "none";
      getId("copyright").style.display = "none";
      //Set onStartScreen = to false so function doesn't run again
      onStartScreen = false;
      //Make the Character, then go to game screen
      playerChar = new Character("Human", "none", "Sword", 6, 3, 0, false, 1, 5, 7, 5, 5, 5, 1, 100);
      playerChar.charClass = "Rogue";
      playerChar.secWeap = "Throwing Knife";
      playerChar.ability = "Dodge";
      playerChar.armour = "Leather";
      playerChar.rAtk += 4;
      playerChar.mAtk -= 2;
      playerChar.stealth += 4;
      playerChar.diplo += 2;
      playerChar.spd += 3;
      playerChar.tough -= 3;
      playerChar.firstName = "King";
      playerChar.lastName = "Tritium";
      //Show new stuff
      getId("charCreate").style.display = "none";
      getId("mainGame").style.display = "block";
      onMainScreen = true;
      makeSidebar();
      enterRoom();
    }
  }
  
  //If on main game screen
  if(onMainScreen) {
    //If it was the enter key and screenWrite isn't running, do stuff determined by doWhenKey var
    if (checkKey == 13 && writing === false && canDoKey === true && typeof getId("gameInput").value === "string") {
      canDoKey = false;
      doWhenKey();
    }
    
    //If it was the 'n' key, run next() function
    if (checkKey == 110 || event == "110") {
      next();
    }
  }
}


//KeyDown event function
function keyDown(event) {
  //Stores the key that was pressed
  var checkKey = event;
  
  //If on main game screen
  if(onMainScreen) {
    
    //If it was the up arrow key, go north
    if (checkKey == 38) {
      // document.write("north");
      moveRoom("north");
    }
    //If it was the down arrow key, go south
    if (checkKey == 40) {
      // document.write("south");
      moveRoom("south");
    }
    //If it was the right arrow key, go east
    if (checkKey == 39) {
      // document.write("east");
      moveRoom("east");
    }
    //If it was the left arrow key, go west
    if (checkKey == 37) {
      // document.write("west");
      moveRoom("west");
    }
  }
  
}


//Var that only lets doWhenKey run once at a time
var canDoKey = true;

//Var used during main game to decide what to do when the user presses a key
var doWhenKey = function() {};


//Show loading screen:
function loadScreen(destination) {
  //Var to determine how many dots
  var loadNum = 0;
  //Var to hold loading text
  var loadText;
  //Counter to stop loading animation
  var loadStop = 0;
  //Random number of times to load >:)
  var loadUntil = (Math.ceil(Math.random() * 5)) * 1 + 3;
  
  function showDots() {
    //Show 'Loading' plus 0-3 dots depending on loadNum var
    if (loadNum === 0) {
      //Show text
      loadText = "Loading      ";
      
      //Increase number of dots for next time
      loadNum++;
    }else if (loadNum == 1) {
      //Show text
      loadText = "Loading .    ";
      
      //Increase number of dots for next time
      loadNum++;
    }else if (loadNum == 2) {
      //Show text
      loadText = "Loading . .  ";
      
      //Increase number of dots for next time
      loadNum++;
    }else{//LoadNum will equal 3
      //Show text
      loadText = "Loading . . .";
      
      //Reset number of dots to 0 for next time
      loadNum = 0;
    }
    
    //Increase the counter var to eventually stop the animation
    loadStop++;
    
    //Display the text
    getId("loading").style.display = "block";
    getId("loading").innerHTML = loadText;
    
    //Stop counter after certain # of cycles determined by the loadUntil var
    if (loadStop == loadUntil) {
      //Stop loading animation
      clearInterval(loadRepeat);
      //Hide loading
      getId("loading").style.display = "none";
      
      //Go to a different place depending on destination passed in
      if (destination == "charScreen") {
      //Start character creation
      onCharScreen = true;
      next();
        
      } else {
        getId("mainGame").style.display = "block";
        onCharScreen = false;
        onMainScreen = true;
        canMove = true;
        makeSidebar();
        enterRoom();
      }
    }
    
  }
  
  
  
  //Repeat the showDots function until told to stop
  var loadRepeat = setInterval(showDots, 500);
  
  
}


//-----------------------Other Functions-----------------------

//Var that tells if screenWrite is running
var writing = false;

//Next function tells the program to run the next function in the sequence
function next() {
  //Only run the next thing if screenWrite function is not currently running
  if (allowWrite) {
    if (onCharScreen) {
      //Increase charNext
      charNext++;
      //Get an array of methods in the createCharFuncs
      var createCharArray = Object.keys(createCharFuncs);
      //Call the respective function from the createCharFuncs object
      createCharFuncs[createCharArray[charNext]]();
    }else if (onMainScreen) {
      //Only run if there is another entry in que(when the next property is not the blank one)
      if (mainGameQue[curQuePos] !== "") {
        //Increase curQuePos
        curQuePos++;
        //Call the respective function from the mainGameQue object
        mainGameQue[curQuePos - 1]();
      }
    }
  }
}




//-----------------------Character Creation-----------------------

//Character object constructor
function Character(charRace, charClass, defaultWeap, mAtk, rAtk, magAtk, magAff, magDef, tough, diplo, size, str, stealth, spd, HP) {
  //Constants for every race when created
  this.level = 1;
  this.money = 1000;
  this.secWeap = "none";
  this.armour = "none";
  this.ability = "none";
  this.firstName = "none";
  this.lastName = "none";
  this.inventory = [];
  
  //Custom for every race when created
  this.HP = HP;
  this.charRace = charRace;
  this.charClass = charClass;
  this.defaultWeap = defaultWeap;
  this.mAtk = mAtk;
  this.rAtk = rAtk;
  this.magAtk = magAtk;
  this.magAff = magAff;
  this.magDef = magDef;
  this.tough = tough;
  this.diplo = diplo;
  this.size = size;
  this.str = str;
  this.stealth = stealth;
  this.spd = spd;
}

//Create var that will hold the player's character object
var playerChar;

//Holds the function index that next is on(starts on -1 so first time increases to 0)
var charNext = -1;


//Object holds the functions that will get the user through character creation
//Every function must end with calling the next function (directly or indirectly)
var createCharFuncs = {
  
  wizPic: function() {screenWrite("charCreate", "div", "<img src = 'Sprites/Wiizard.gif'>", true)},
  
  welcome: function() {screenWrite("charCreate", "h1", wizSpeach[0], true)},
  
  badSight: function() {screenWrite("charCreate", "h2", wizSpeach[5], true)},
  
  whoYou: function() {screenWrite("charCreate", "h2 class = 'green'", wizSpeach[1], true)},
  
  askRace: function() {screenWrite("charCreate", "div", "<br><form><p>Race: </p><select id = 'charRace'><option>Human</option><option>Elf</option><option>Dwarf</option><option>Flobbit</option><option>Centaur</option><option>Fairy</option><option>Marsh-Wiggle</option></select><br><br><br><br><input type = 'button' value = 'Huzzah!' onclick = makeUserRace() id = 'chooseRace'></form><br>", false)},
  
  raceResponse: function() {screenWrite("charCreate", "h2", wizSpeach[7], true)},
  
  whatGoodAt: function() {screenWrite("charCreate", "h2 class = 'green'", wizSpeach[6], true)},
  
  askClass: function() {screenWrite("charCreate", "div", "<form><p>Class: </p><select id = 'charClass'><option>Basic Warrior</option><option>Berzerker</option><option>Rogue</option><option>Druid</option><option>Mage</option><option>Trader</option></select><br><br><br><br><input type = 'button' value = 'Huzzah!' onclick = makeUserClass() id = 'chooseClass'></form>", false)},
  
  whatName: function() {screenWrite("charCreate", "h2 class = 'green'", wizSpeach[8], true)},
  
  askName: function() {screenWrite("charCreate", "div", "<form><p>First: </p><input type = 'text' id = 'getFirstName' placeholder = 'eg. Achilles'><br><br><p>Last: </p><input type = 'text' id = 'getLastName' placeholder = 'eg. Silverbow'><br><br><br><br><input type = 'button' value = 'Huzzah!' onclick = makeUserName() id = 'chooseName'></form>", false)},
  
  
  
  
};


//Create default character template depending on race
function makeUserRace() {
  //Disable the button
  getId("chooseRace").onclick = "";
  
  //Create the player character based on what race the user selected
  var userRace = getId("charRace").selectedIndex;
  if (userRace === 0) {//If Human
    playerChar = new Character("Human", "none", "Sword", 6, 3, 0, false, 1, 5, 7, 5, 5, 5, 5, 100);
    
  } else if (userRace == 1) {//If Elf
    playerChar = new Character("Elf", "none", "Bow", 3, 8, 2, true, 4, 3, 5, 5, 5, 7, 6, 100);
    
  } else if (userRace == 2) {//If Dwarf
    playerChar = new Character("Dwarf", "none", "Axe", 9, 1, 0, false, 7, 7, 1, 3, 6, 3, 4, 100);
    
  } else if (userRace == 3) {//If Flobbit
    playerChar = new Character("Flobbit", "none", "Frying Pan", 4, 3, 0, false, 7, 6, 4, 3, 3, 10, 3, 100);
    
  } else if (userRace == 4) {//If Centaur
    playerChar = new Character("Centaur", "none", "Greatsword", 10, 2, 0, false, 1, 9, 5, 8, 8, 1, 3, 100);
    
  } else if (userRace == 5) {//If Fairy
    playerChar = new Character("Fairy", "none", "Pixie Blast", 0, 5, 9, true, 8, 1, 6, 1, 2, 4, 7, 100);
    
  } else if (userRace == 6) {//If Marsh-Wiggle
    playerChar = new Character("Marsh-Wiggle", "none", "Tinder Box", 3, 2, 0, true, 10, 10, 5, 5, 5, 6, 3, 100);
    
  }
  
  //Output dif response depending on what user chooses
  if (playerChar.charRace == "Marsh-Wiggle") {
    screenWrite("charCreate", "h2", wizSpeach[3], true);
  } else {
    next();
  }
    
}
  

//update default character template depending on class
function makeUserClass() {
  //Disable button
  getId("chooseClass").onclick = "";
  
  //Get the class the user selected and update character properties
  if (getId("charClass").selectedIndex === 0) {
    playerChar.charClass = "Basic-Warrior";
    playerChar.secWeap = "Side Sword";
    playerChar.ability = "Blade Flourish";
    playerChar.armour = "Steel Plate";
    playerChar.mAtk += 3;
    playerChar.magAtk -= 2;
    
  }else if (getId("charClass").selectedIndex == 1) {
    playerChar.charClass = "Berzerker";
    playerChar.secWeap = "Spiked Club";
    playerChar.ability = "Rage";
    playerChar.armour = "none";
    playerChar.tough += 5;
    playerChar.mAtk += 4;
    playerChar.stealth -= 3;
    playerChar.diplo -= 2;
    playerChar.str += 2;
    
  }else if (getId("charClass").selectedIndex == 2) {
    playerChar.charClass = "Rogue";
    playerChar.secWeap = "Throwing Knife";
    playerChar.ability = "Dodge";
    playerChar.armour = "Leather";
    playerChar.rAtk += 4;
    playerChar.mAtk -= 2;
    playerChar.stealth += 4;
    playerChar.diplo += 2;
    playerChar.spd += 3;
    playerChar.tough -= 3;
    
  }else if (getId("charClass").selectedIndex == 3) {
    playerChar.charClass = "Druid";
    playerChar.secWeap = "Infused Staff";
    playerChar.ability = "Life Leach";
    playerChar.armour = "Bark";
    playerChar.magAtk += 2;
    playerChar.magDef += 3;
    playerChar.magAff = true;
    playerChar.stealth += 1;
    playerChar.mAtk -= 3;
    playerChar.tough += 3;
    
  }else if (getId("charClass").selectedIndex == 4) {
    playerChar.charClass = "Mage";
    playerChar.secWeap = "Fireball";
    playerChar.ability = "Lightning";
    playerChar.armour = "Mail";
    playerChar.magAtk += 4;
    playerChar.magDef += 2;
    playerChar.magAff = true;
    playerChar.mAtk -= 1;
    playerChar.diplo += 1;
    playerChar.spd += 2;
    
  }else {
    playerChar.charClass = "Trader";
    playerChar.secWeap = "Sling";
    playerChar.ability = "Hire Help";
    playerChar.armour = "Leather";
    playerChar.diplo += 10;
    playerChar.stealth += 1;
    playerChar.money += 5000;
    
  }
  
  // //Display selected class
  // //Var to hold object property names
  // var charPropsNames = Object.keys(playerChar);
  // //Var to hold object properties
  // var charProps = [];
  // //Add the properties from the player's char to the charProps array
  // for (var i = 0; i < charPropsNames.length; i++) {
  //   charProps.push(playerChar[charPropsNames[i]]);
  // }
  
  
  // screenWrite("charCreate", "div", charProps.join(), false);
  
  
  //If any character stats are less then 0, set to 0
  //Var to hold object property names
  var charPropsNames = Object.keys(playerChar);
  //Var to hold object properties
  var charProps = [];
  //Add the properties from the player's char to the charProps array
  for (var i = 0; i < charPropsNames.length; i++) {
    //If less than 0, set to 0
    if (playerChar[charPropsNames[i]] < 0) {
      playerChar[charPropsNames[i]] = 0;
    }
  }
    
  
  //Output dif response depending on what user chooses
  if (playerChar.charClass == "Trader") {
    screenWrite("charCreate", "h2", wizSpeach[4], true);
  } else {
    screenWrite("charCreate", "h2", wizSpeach[2], true);
  }
  
}


//update default character template depending on class
function makeUserName() {
  if(getId("getFirstName").value != "" && getId("getLastName").value != "") {
    
    //Disable button
    getId("chooseName").onclick = "";
    
    //Get the first name and set it as character's first name
    playerChar.firstName = getId("getFirstName").value;
    
    //Get the last name and set it as character's last name
    playerChar.lastName = getId("getLastName").value;
    
    
    //Show new stuff
    getId("charCreate").style.display = "none";
    loadScreen("mainGame");
    
  }
  
}



//-----------------------Main Game-----------------------

//--------------Sidebar--------------

//Create sidebar initially
function makeSidebar() {
  
  //Get the character image url
  var charImageUrl = "Sprites/Races/" + playerChar.charRace + "/" + playerChar.charRace + "_" + playerChar.charClass + ".png";
  //Display the image
  getId("charPic").src = charImageUrl;
  
  //Display the stats
  //Name
  getId("name").innerHTML = playerChar.firstName + " " + playerChar.lastName;
  //HP
  getId("type").innerHTML = playerChar.charRace + " " + playerChar.charClass;
  //HP
  getId("HP").innerHTML = playerChar.HP;
  //Gold
  getId("gold").innerHTML = playerChar.money;
  //ability
  getId("ability").innerHTML = "Ability: " + playerChar.ability;
  //Weapon 1
  getId("weapon1").innerHTML = "Weapon 1: " + playerChar.defaultWeap;
  //Weapon 2
  getId("weapon2").innerHTML = "Weapon 2: " + playerChar.secWeap;
  //Armour
  getId("armour").innerHTML = "Armour: " + playerChar.armour;
  //Melee Atk
  getId("melee").innerHTML = "Melee Atk: " + playerChar.mAtk;
  //Ranged Atk
  getId("ranged").innerHTML = "Ranged Atk: " + playerChar.rAtk;
  //Magic Atk
  getId("magicAtk").innerHTML = "Magic Atk: " + playerChar.magAtk;
  //Magic Defense
  getId("magicDef").innerHTML = "Magic Def: " + playerChar.magDef;
  //Toughness
  getId("tough").innerHTML = "Toughness: " + playerChar.tough;
  //level
  getId("levelNum").innerHTML = playerChar.level;
  
  
  //Set on main game screen equal to true
  onMainScreen = true;
  
  //Draw the minimap
  drawMap(0, 0);
  
}



//--------------Mini Map--------------

//Set the coordinate of the starting room
var curRoomX = 0;
var curRoomY = 4;

//Save coordinates of the previous room
var preRoomX = 0;
var preRoomY = 4;

//Vars to tell where adjacent rooms are
var rmNorth = false;
var rmSouth = false;
var rmEast = false;
var rmWest = false;

//Vars to tell if rooms have been visited
var visNorth = false;
var visSouth = false;
var visEast = false;
var visWest = false;

//Draw the mini map
function drawMap(x, y) {
  //Get the cavas element
  var canvas = getId("miniMap");
  //Create a drawing object for the canvas
  var ctx = canvas.getContext("2d");
  
  //Clear the canvas so it can be redrawn
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  //Set the line width
  ctx.lineWidth = 6;
  
  
  //Function that draws an "X" across a room the user has already been to
  function drawX(corner1X, corner1Y, corner2X, corner2Y) {
    //Set the line width
    ctx.lineWidth = 4;
    
    //Begin path for drawing "X"
    ctx.beginPath();
    
    //Start drawing at top left corner of room
    ctx.moveTo(corner1X, corner1Y);
    //Draw a line to bottom right corner
    ctx.lineTo(corner1X + corner2X, corner1Y + corner2Y);
    
    //Move to top right corner of room
    ctx.moveTo(corner1X + corner2X, corner1Y);
    //Draw line to botton left corner
    ctx.lineTo(corner1X, corner1Y + corner2Y);
    
    
    //Actually draw the lines
    ctx.stroke();
    
    //Reset the line width
    ctx.lineWidth = 6;
  }
  
  //Function that draws the corridors
  function drawCorr(xCorr, yCorr, width, height) {
    
    //Draw the corridor
    ctx.strokeRect(xCorr, yCorr, width, height);
    
    //Set the fill colour to black
    ctx.fillStyle = "#000000";
    
    //Detect if it's drawing a horizontal or vertical corridor
    if (height > width) {//If Vertical
      
      //Draw the left black box to block the room indicator
      ctx.fillRect(xCorr - width, yCorr + 3, width - 3, height - 6);
      
      //Draw the right black box
      ctx.fillRect(xCorr + width + 3, yCorr + 3, width - 4, height - 6);
    
    }else {//If horizontal
      
      //Draw the top black box to block the room indicator
      ctx.fillRect(xCorr + 3, yCorr - height, width - 6, height - 3);
      
      //Draw the bottom black box
      ctx.fillRect(xCorr + 3, yCorr + height + 3, width - 6, height - 4);
      
    }
    
    
  }
  
  //Check if adjacent rooms exist
  checkRooms();
  
  //screenWrite("gameSpace", "h2", rmNorth.toString() + rmSouth.toString() + rmEast.toString() + rmWest.toString())
  
  //Set the fill colour for the current room indicator
  ctx.fillStyle = "#555555";
  //Draw current room indicator
  ctx.fillRect(78 + 3, 78 + 3, 44 - 6, 44 - 6)
  
  //Set the fill colour for adjacent rooms
  ctx.strokeStyle = "#FFFFFF";
  
  //Draw adjacent rooms
  //North
  if (rmNorth) {
    //Draw room
    ctx.strokeRect(x + 78, y + 3, 44, 44);
    //Draw corridor
    drawCorr(x + 92, y + 47, 17, 31);
    //Draw "X" if been to room
    if (visNorth) {
      drawX(x + 78, y + 3, 44, 44);
    }
  }
  
  //South
  if (rmSouth) {
    //Draw room
    ctx.strokeRect(x + 78, y + 153, 44, 44);
    //Draw corridor
    drawCorr(x + 92, y + 122, 17, 31);
    //Draw "X" if been to room
    if (visSouth) {
      drawX(x + 78, y + 153, 44, 44);
    }
    
  }
  
  //East
  if (rmEast) {
    //Draw room
    ctx.strokeRect(x + 153, y + 78, 44, 44);
    //Draw corridor
    drawCorr(x + 122, y + 92, 31, 17);
    //Draw "X" if been to room
    if (visEast) {
      drawX(x + 153, y + 78, 44, 44);
    }
    
  }
  
  //West
  if (rmWest) {
    //Draw room
    ctx.strokeRect(x + 3, y + 78, 44, 44);
    //Draw corridor
    drawCorr(x + 47, y + 92, 31, 17);
    //Draw "X" if been to room
    if (visWest) {
      drawX(x + 3, y + 78, 44, 44);
    }
    
  }
  
  //Fill colour for current room border
  ctx.strokeStyle = "#FFFFFF";
  
  //Draw the current room after adjacent rooms so it draws on top
  ctx.strokeRect(x + 78, y + 78, 44, 44);
  
  //Draw an "X over it to show the user has been there (because they are there)
  drawX(x + 78, y + 78, 44, 44);
  
  
  
}

//Function that finds the room index from the x and y coordinate; takes the x and y coordinate as parameters and outputs the array index
function findRoom(xCoord, yCoord) {
  
  //Var to hold room index
  var i = 0;
  
  //Loop through the dungeon rooms array until finding the correct coordinates
  for (; i < dungeonRooms.length; i++) {
    //Check coordinates of room to see if they match the inputted values
    if (dungeonRooms[i].rmX == xCoord && dungeonRooms[i].rmY == yCoord) {
      //End the loop so i will be the index of the current room
      break;
    }
  }
  
  //Return the room index
  return i;
}

//Function that checks whether or not a room has been visited; takes the index of the dungeon room to check
function checkVisit(roomIndex) {
  if (dungeonRooms[roomIndex].visited) {
    return true;
  } else {
    return false;
  }
}

//Function that checks whether adjacent rooms exist
function checkRooms() {
  
  //Set vars back to false to recheck
  rmNorth = false;
  rmSouth = false;
  rmEast = false;
  rmWest = false;
  visNorth = false;
  visSouth = false;
  visEast = false;
  visWest = false;
  
  //Loop through rooms array to figure out which directions have adjacent rooms
  for(var i = 0; i < dungeonRooms.length; i++) {
    //Get the x value of the current room the loop is checking
    var rmXTemp = dungeonRooms[i].rmX;
    //Get the y value of the current room the loop is checking
    var rmYTemp = dungeonRooms[i].rmY;
    
    //If a room is adjacent, set direction var to true
    if(rmXTemp == curRoomX && rmYTemp == curRoomY - 1) {//If North
      rmNorth = true;
      //Check if the room has been visisted already and set var to true if has
      if (checkVisit(i)) {
        visNorth = true;
      }
    }else if(rmXTemp == curRoomX && rmYTemp == curRoomY + 1) {//If South
      rmSouth = true;
      //Check if the room has been visisted already and set var to true if has
      if (checkVisit(i)) {
        visSouth = true;
      }
    }else if(rmYTemp == curRoomY && rmXTemp == curRoomX + 1) {//If East
      rmEast = true;
      //Check if the room has been visisted already and set var to true if has
      if (checkVisit(i)) {
        visEast = true;
      }
    }else if(rmYTemp == curRoomY && rmXTemp == curRoomX - 1) {//If West
      rmWest = true;
      //Check if the room has been visisted already and set var to true if has
      if (checkVisit(i)) {
        visWest = true;
      }
    }
    
  }
  
}

//Var to tell if the player can move rooms
var canMove = true;

//Function to move rooms; takes direction to move as input
function moveRoom(dir) {
  if (canMove) {
    //Check if adjacent rooms exist
    checkRooms();
    
    //If user pressed arrow key and room exists, move to that room
    if (rmNorth && dir == "north") { //Move North
      var animateMap = setInterval(animateRooms, 10, 0, 1);
    }else if (rmSouth && dir == "south") { //Move South
      var animateMap = setInterval(animateRooms, 10, 0, -1);
    }else if (rmEast && dir == "east") { //Move East
      var animateMap = setInterval(animateRooms, 10, -1, 0);
    }else if (rmWest && dir == "west") { //Move West
      var animateMap = setInterval(animateRooms, 10, 1, 0);
    }
    
    //Var to store the x and y offset
    var xOffset = 0;
    var yOffset = 0;
    
    //Function that animates the room change; takes both an x and y change (either 1, 0 or -1) to know which direction to move the room drawings
    function animateRooms(xChange, yChange) {
      
      //Tell the program the user can't move while animation is running
      canMove = false;
      
      //Change the xOffset by amount indicated by xChange
      xOffset += xChange;
      
      //Change the yOffset by amount indicated by yChange
      yOffset += yChange;
      
      //Draw the rooms offset by the amount indicated by x and y offsets
      drawMap(xOffset, yOffset);
      
      //Stop moving the map after it has moved 1 room in a direction; this happens when it has moved by 75px
      if (xOffset == 75 || xOffset == -75 || yOffset == 75 || yOffset == -75) {
        //Stop moving the map
        clearInterval(animateMap);
        
        //Tell the program the player can move
        canMove = true;
        
        //Make the current coordinates the old ones
        preRoomX = curRoomX;
        preRoomY = curRoomY;
        
        //Move the current room to the next one in the direction specified by the player
        curRoomX -= xChange;
        curRoomY -= yChange;
        
        //Tell the new room it has been visited
        dungeonRooms[findRoom(curRoomX, curRoomY)].visited = true;
        
        //Draw map at new position
        drawMap(0, 0);
        
        //Call the enter room function
        enterRoom();
        
      }
    }
  }
}



//--------------Game Space and Que--------------


//Object that holds screenWrites for the game space; starts with a blank property(blank property will always get 'pushed up' so that next() function knows whether or not there is anything left in que to output)
var mainGameQue = {
  0: "",
};
//Var to tell how many items are in que
var queLength = 1;
//Counter var to keep track of where in que the program is
var curQuePos = 0;

//Function that adds a screenWrite command to the que; takes text to add to screenWrite and type of container to use(the default to use is 'p')
function addWriteToQue(inputText, conType) {
  //Add the function to the end of the que(before the blank one)
  mainGameQue[queLength - 1] = function() {screenWrite("gameSpace", conType, inputText, true)};
  
  //Push up the blank property in mainGameQue
  mainGameQue[queLength] = "";
  
  //Try running next() function
  next();
  
  //Increase queLength so next time it adds a new entry
  queLength++;
  
}

//Function that adds a instant write function to the que; takes a string of html to add to mainGame div
function addInstantToQue(HTMLString) {
  //Add the function to the end of the que(before the blank one)
  mainGameQue[queLength - 1] = function() {
    //Create a div element, put whatever inside it and append it to the gameSpace div
    var newDiv = document.createElement("div");
    newDiv.innerHTML = HTMLString;
    getId("gameSpace").appendChild(newDiv);
    
    //Scroll to botton of parent element so new thing is always visible
    document.getElementById("gameSpace").scrollBy(0, document.getElementById("gameSpace").scrollHeight);
    document.getElementById("gameSpace").scrollBy(0, document.getElementById("gameSpace").scrollHeight);
    
    next();
  };
  
  //Push up the blank property in mainGameQue
  mainGameQue[queLength] = "";
  
  //Increase queLength so next time it adds a new entry
  queLength++;
  
  //Try running next() function
  next();
  
  
}

//Function that adds a function to the que
function addFuncToQue(func) {
  mainGameQue[queLength - 1] = func;
  
  //Push up the blank property in mainGameQue
  mainGameQue[queLength] = "";
  
  //Increase queLength so next time it adds a new entry
  queLength++;
  
  //Try running next() function
  next();
  
  
}



//--------------Room Control--------------

//Function that executes when user enters a room
function enterRoom() {
  //Var to store the type of room the user just entered
  var curRoomType = dungeonRooms[findRoom(curRoomX, curRoomY)].roomType;
  
  //Set canMove to false so the user doesn't move until the room is finished
  canMove = false;
  
  //Output default message
  if (curRoomType != "start") {
    addWriteToQue("<br>You enter the room and look around. . .", "p");
  }
  
  //Do something different depending on what type of room it is
  if (curRoomType == "start") {
    addWriteToQue(wizSpeach[9], "p");
    addWriteToQue(wizSpeach[10], "p");
    addWriteToQue(wizSpeach[11], "p");
    addWriteToQue(". . .", "p");
    addWriteToQue(". . .", "p");
    addWriteToQue(". . .", "p");
    addWriteToQue(wizSpeach[12], "p");
    addWriteToQue(wizSpeach[13], "div");
    addWriteToQue(wizSpeach[14], "p");
    addWriteToQue(wizSpeach[15], "p");
    // addWriteToQue("Welcome to the dungeon!", "p class = 'green'");
    addWriteToQue("Move through the dungeon with the arrow keys.", "p class = 'green'");
    
    addFuncToQue(function() {
      dungeonRooms[findRoom(0, 4)].roomType = "empty";
      canMove = true;
    });
    
  }else if (curRoomType == "monster") {
    //Check if the player has beaten the monster already
    if (dungeonRooms[findRoom(curRoomX, curRoomY)].beaten == false) {
      addWriteToQue("There is a monster in this room!", "p");
      randomMonster();
    } else {
      battleCount = 9;
      battle();
    }
    
  }else if (curRoomType == "chest") {
    //Check if the chest has been opened already
    if (dungeonRooms[findRoom(curRoomX, curRoomY)].opened == false) {
      chestCount = 0;
      foundChest();
    } else {
      chestCount = 4;
      foundChest();
    }
    
  }else if (curRoomType == "item") {
    addWriteToQue("There is a item in this room!", "p");
    canMove = true;
    
  }else if (curRoomType == "trader") {
    addWriteToQue("There is a trader in this room!", "p");
    canMove = true;
    
  }else if (curRoomType == "boss1") {
    //Check if the player has beaten the monster already
    if (dungeonRooms[findRoom(curRoomX, curRoomY)].beaten == false) {
      addWriteToQue("There is a boss in this room!", "p");
      
      enemy = new Character("Rat-King", "none", "Sword Tail", 7, 0, 0, false, 2, 6, 0, 0, 0, 0, 6, 35);
      
      battleCount = 0;
      bossBattle();
      
    } else {
      battleCount = 9;
      bossBattle();
    }
    
  }else if (curRoomType == "boss2") {
    //Check if the player has beaten the monster already
    if (dungeonRooms[findRoom(curRoomX, curRoomY)].beaten == false) {
      addWriteToQue("There is a boss in this room!", "p");
      
      enemy = new Character("King-Koopa", "none", "Fireball", 0, 5, 0, false, 7, 8, 0, 0, 0, 0, 3, 60);
      
      battleCount = 0;
      bossBattle();
      
    } else {
      battleCount = 9;
      bossBattle();
    }
    
  }else if (curRoomType == "final-boss") {
    //Check if the player has beaten the monster already
    if (dungeonRooms[findRoom(curRoomX, curRoomY)].beaten == false) {
      addWriteToQue("The Final Boss is in this room!", "p");
      
      enemy = new Character("Plutonium-Dragon", "none", "Atomic Blast", 0, 0, 8, false, 10, 10, 0, 0, 0, 0, 3, 80);
      
      // charRace, charClass, defaultWeap, mAtk, rAtk, magAtk, magAff, magDef, tough, diplo, size, str, stealth, spd, HP
      
      battleCount = 0;
      bossBattle();
      
    } else {
      battleCount = 9;
      bossBattle();
    }
    
  }else {
    addWriteToQue("The room is empty. . .", "p");
    addFuncToQue(function() {
      canMove = true;
    });
  }
  
  //Output what type of room you entered
  //screenWrite("gameSpace", "p", curRoomType, false);
}

//Function that parses user input; returns a simplified standard answer
function parseInput() {
  var text = (getId("gameInput").value).toLowerCase();
  //Remove all spaces
  while (text.indexOf(" ") != -1) {
    text = text.replace(/ /g, "");
  }
  
  //Shorten some words if found
  if (text.indexOf("attack") != -1) {
    text = text.replace(/attack/g, "atk");
  }
  if (text.indexOf("defence") != -1) {
    text = text.replace(/defence/g, "def");
  }
  if (text.indexOf("weapon") != -1) {
    text = text.replace(/weapon/g, "weap");
  }
  
  //Yes
  if (text == "yes" || text == "y" || text == "ye") {
    return "yes";
  }
  
  //No
  else if (text == "no" || text == "n") {
    return "no";
  }
  
  //Melee Atk
  else if (text == "matk" || text == "meleeatk") {
    return "mAtk";
  }
  
  //Ranged Atk
  else if (text == "ratk" || text == "rangedatk") {
    return "rAtk";
  }
  
  //Magic Atk
  else if (text == "magatk" || text == "magicatk") {
    return "magAtk";
  }
  
  //Magic Def
  else if (text == "magdef" || text == "magicdef") {
    return "magDef";
  }
  
  //Toughness
  else if (text == "tough" || text == "toughness") {
    return "tough";
  }
  
  //Speed
  else if (text == "speed" || text == "spd") {
    return "spd";
  }
  
  //Diplomacy
  else if (text == "diplo" || text == "diplomacy" || text == "dip") {
    return "diplo";
  }
  
  //Strength
  else if (text == "str" || text == "strength") {
    return "str";
  }
  
  //Stealth
  else if (text == "stl" || text == "stealth") {
    return "stealth";
  }
  
  //Weapon 1
  else if (text == "weapon1" || text == "weaponone" || text == "weap1" || text == "weapone" || text == "w1" || text == "wone") {
    return "defaultWeap";
  }
  
  //Weapon 2
  else if (text == "weapon2" || text == "weapontwo" || text == "weap2" || text == "weaptwo" || text == "w2" || text == "wtwo") {
    return "secWeap";
  }
  
  //One
  else if (text == "one") {
    return "1";
  }
  
  //Two
  else if (text == "two") {
    return "2";
  }
  
  else {
    return text;
  }
  
  
}



//---------Chest Control---------

var chestCount = 0;
var chestType = 3;

//Function that runs when you encounter a chest
function foundChest() {
  switch (chestCount) {
    case 0:
      //Ask if they want to open the chest
      addWriteToQue("There is a chest in this room!", "p");
      addWriteToQue("Do you want to open it?", "p class = 'green'");
      addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Yes/No'>");
      addFuncToQue(function() {getId("gameInput").focus();});
      
      //Get answer
      canDoKey = true;
      doWhenKey = function() {
        //Run different code next repeat if the user says yes or no
        if (parseInput() == "yes"){
          chestCount = 1;
        } else if (parseInput() == "no") {
          chestCount = 2;
        }
        
        //Reset input field
        getId("gameInput").disabled = true;
        getId("gameInput").id = "";
        
        //Repeat function
        foundChest();
      };
      
      break;
    case 1:
      //Open chest
      dungeonRooms[findRoom(curRoomX, curRoomY)].opened = true;
      //Select what type of thing will be in the chest(HP, XP, money, weapon, armour)
      addFuncToQue(function() {
        //Get random number from 0-4 and set type of chest based on that
        chestType = Math.floor(Math.random() * 5);
        if (chestType == 0) {
          chestType = "HP";
          //Give user random amount of health from 5-15
          findHealth();
          
        } else if (chestType == 1) {
          chestType = "XP";
          //Give user one level
          findXP();
          
          
          
        } else if (chestType == 2) {
          chestType = "money";
          addWriteToQue("The chest is full of glittering gold and gleaming jewels!", "p");
          //Give user random amount of money from 50-300 and update sidebar
          var randomMoney = Math.ceil(Math.random() * 250) + 50;
          addFuncToQue(function() {
            playerChar.money += randomMoney;
            makeSidebar();
            next();
          });
          addWriteToQue("You add " + randomMoney.toString() + " treasure to your pouch!", "p class = 'green'");
          
        } else if (chestType == 3) {
          chestType = "weapon";
          addWriteToQue("There is a weapon in the chest.", "p");
          addFuncToQue(function() {
            //Get a random weapon and ask the user if they want it
            newWeap = Weapons[Math.floor(Math.random() * Weapons.length)].name;
            changeWeapon("chest");
            
          });
          
        } else if (chestType == 4) {
          chestType = "armour";
          addWriteToQue("There is armour in the chest.", "p");
          addFuncToQue(function() {
            //Get a random armour and ask the user if they want it
            newArmour = Armour[Math.floor(Math.random() * Armour.length)].name;
            changeArmour("chest");
            
          });
          
        }
        
        next();
      });
      
      //End room
      if (chestType != "XP" && chestType != "weapon" && chestType != "armour") {
        chestCount = 3;
        foundChest();
      }
      
      break;
    case 2:
      //Do not open chest:
      //Output message and allow user to move
      addWriteToQue("You stare at the chest in front of you and wonder why you didn't accept this free gift.", "p");
      
      //End room
      chestCount = 3;
      foundChest();
      break;
      
    case 3:
      //End of room
      //Reset chestCount so next time the user enters a chest room, the whole cycle starts over
      chestCount = 0;
      
      addWriteToQue("There is nothing else in this room.", "p");
      addFuncToQue(function() {canMove = true;});
      break;
      
    case 4:
      //If user has already opened chest
      addWriteToQue("You see an open chest in the middle of the room.", "p");
      addWriteToQue("There is nothing in it.", "p class = 'green'");
      
      chestCount = 0;
      addWriteToQue("There is nothing else in this room.", "p");
      addFuncToQue(function() {canMove = true;});
      break;
  }
}

//Function that runs when the user recieves a health potion
function findHealth() {
  addWriteToQue("You found a health potion!", "p");
  addWriteToQue("You drink it!", "p");
  
  //Choose a random amount of health to give between 5 and 15
  var randomHP = Math.ceil(Math.random() * 10) + 5;
  playerChar.HP += randomHP;
  //Redraw sidebar
  makeSidebar();
  
  addWriteToQue("You're health increased by " + randomHP.toString() + ".", "p class = 'green'");
}

//Function that runs when the user finds an XP potion
function findXP() {
  //Select a random book title to have the user find
  var bookTitle = Math.floor(Math.random() * Books.length);
  addWriteToQue("You found the book, " + Books[bookTitle] + ".", "p");
  addWriteToQue("You sit down and read it.", "p");
  addWriteToQue(". . .", "p");
  addWriteToQue(". . .", "p");
  addWriteToQue(". . .", "p");
  
  levelUp("chest");
}

//Function for leveling up
function levelUp(comeFrom) {
  //Give user a level and update sidebar
  addFuncToQue(function() {
    playerChar.level++;
    makeSidebar();
    
    next();
  });
  
  addWriteToQue("You leveled up!", "p")
  addWriteToQue("You gain 10 hitpoints!", "p class = 'green'");
  addFuncToQue(function() {
    playerChar.HP += 10;
    makeSidebar();
    next()
  });
  addWriteToQue("Which stat would you like to increase?", "p class = 'green'")
  addWriteToQue("You can choose: Melee Atk, Ranged Atk, Magic Atk, Magic Def, Toughness, Speed, Diplomacy, Strength or Stealth.")
  
  addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Stat to increase'>");
  addFuncToQue(function() {getId("gameInput").focus();});
  
  //Get answer
  canDoKey = true;
  doWhenKey = function() {
    var inputStat = parseInput();
    
    playerChar[inputStat]++;
    
    //Reset input field
    getId("gameInput").disabled = true;
    getId("gameInput").id = "";
    
    makeSidebar();
    addWriteToQue("Your " + inputStat + " stat was increased!", "p class = 'green'");
    
    //If the user is in a chest or battle room, end the room
    if (comeFrom == "chest") {
      chestCount = 3;
      foundChest();
    }else if (comeFrom == "battle") {
      addWriteToQue("There is nothing else in this room.", "p");
    
    //Let the player move again
    addFuncToQue(function() {
      
      dungeonRooms[findRoom(curRoomX, curRoomY)].beaten = true;
      canMove = true;
      
    });
    }
  }
  
}

//Function that finds the index of a weapon; takes the name of the weapon
function findWeap(weapName) {
  
  //Var to hold weapon index
  var i = 0;
  
  //Loop through the Weapons array until finding the correct name
  for (; i < Weapons.length; i++) {
    //Check if names match
    if (Weapons[i].name == weapName) {
      //End the loop so i will be the index of the current weapon
      break;
    }
  }
  
  //Return the weapon index
  return i;
  
}

//Function that finds the index of armour; takes the name of the armour
function findArmour(armourName) {
  
  //Var to hold armour index
  var i = 0;
  
  //Loop through the Armour array until finding the correct name
  for (; i < Armour.length; i++) {
    //Check if names match
    if (Armour[i].name == armourName) {
      //End the loop so i will be the index of the current armour
      break;
    }
  }
  
  //Return the armour index
  return i;
  
}

//Counter var to control changeWeapon function
var weapCount = 0;
var newWeap = "";

//Function that runs when the user gets a weapon
function changeWeapon(comeFrom) {
    
  switch (weapCount) {
  
  case 0:
    
    //Output different thing depending on where the function was called from
    if (comeFrom == "chest") {
      //Use 'an' if weapon starts with a vowel
      var c1 = newWeap.charAt(0);
      if (c1 == "A" || c1 == "E" || c1 == "I" || c1 == "O" || c1 == "U") {
        addWriteToQue("It is an " + newWeap + ".", "p");
      } else {
        addWriteToQue("It is a " + newWeap + ".", "p");
      }
    }
    
    //Check if the new weapon is magic and if the player can use it
    var canUse = true;
    
    if (Weapons[findWeap(newWeap)].type == "magic") {
      //Check if the user's character is magical
      if (playerChar.magAff == false) {
        canUse = false;
      }
    }
    
    //If the user can use the weapon, ask if they want to
    if (canUse == true) {
      addWriteToQue("Would you like to equip it in one of your weapon slots?", "p class = 'green'");
      addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Yes/No'>");
      addFuncToQue(function() {getId("gameInput").focus();});
      
      //Get answer
      canDoKey = true;
      doWhenKey = function() {
        //Run different code next repeat if the user says yes or no
        if (parseInput() == "yes"){
          weapCount = 1;
        } else if (parseInput() == "no") {
          weapCount = 4;
        }
        
        //Reset input field
        getId("gameInput").disabled = true;
        getId("gameInput").id = "";
        
        //Repeat function
        changeWeapon(comeFrom);
      }
    }
    //If the user can't use the weapon, put it in their inventory
    else {
      addWriteToQue("The weapon is magical . . . you are not.", "P");
      addWriteToQue("You cannot use it.", "P");
      
      //Repeat function
      addFuncToQue(function() {
        weapCount = 4;
        changeWeapon(comeFrom);
      })
      
    }
    
    break;
    
  case 1:
    //If user says yes, ask which weapon slot to replace
    addWriteToQue("Which weapon would you like to replace?", "p class = 'green'");
    addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Weapon 1 or Weapon 2?'>");
    addFuncToQue(function() {getId("gameInput").focus();});
    
    //Get answer
    canDoKey = true;
    doWhenKey = function() {
      //Replace the weapon slot the user specified
      if (parseInput() == "defaultWeap" || parseInput() == "1"){
        weapCount = 2;
      } else if (parseInput() == "secWeap" || parseInput() == "2") {
        weapCount = 3;
      }
      
      //Reset input field
      getId("gameInput").disabled = true;
      getId("gameInput").id = "";
      
      //Repeat function
      changeWeapon(comeFrom);
    }
    
    break;
    
  case 2:
    //Replace defaultWeap and put old weapon in inventory
    addWriteToQue("You put your " + playerChar.defaultWeap + " in your bag.", "p");
    addFuncToQue(function() {
      playerChar.inventory[playerChar.inventory.length] = playerChar.defaultWeap;
      playerChar.defaultWeap = newWeap;
      makeSidebar();
      
      next()
    });
    addWriteToQue("You equip your new " + newWeap + ".", "p");
    
    //End function
    weapCount = 5;
    changeWeapon(comeFrom);
    
    break;
    
  case 3:
    //Replace secWeap
    addWriteToQue("You put your " + playerChar.secWeap + " in your bag.", "p");
    addFuncToQue(function() {
      playerChar.inventory[playerChar.inventory.length] = playerChar.defaultWeap;
      playerChar.secWeap = newWeap;
      makeSidebar();
      
      next()
    });
    addWriteToQue("You equip your new " + newWeap + ".", "p");
    
    //End function
    weapCount = 5;
    changeWeapon(comeFrom);
    
    break;
    
  case 4:
    //If they don't want to replace their weapon or can't use the new one, add it to their inventory
    addWriteToQue("You put the " + newWeap + " in your bag.", "p");
    addFuncToQue(function () {
      playerChar.inventory[playerChar.inventory.length] = newWeap;
      
      //End function
      weapCount = 5;
      changeWeapon(comeFrom);
    });
    
    break;
    
  case 5:
    //End weapon function
    if (comeFrom == "chest") {
      addWriteToQue("There is nothing else in this room.", "p");
      addFuncToQue(function() {canMove = true; weapCount = 0; newWeap = "";})
    }
  }
}

//Counter var to control changeArmour function
var armourCount = 0;
var newArmour = "";

//Function that runs when the user gets armour
function changeArmour(comeFrom) {
    
  switch (armourCount) {
  
  case 0:
    
    //Output different thing depending on where the function was called from
    if (comeFrom == "chest") {
      addWriteToQue("It is " + newArmour + " armour!", "p");
    }
    
    //Check if the new armour is magic and if the player can use it
    var canUse = true;
    
    if (Armour[findArmour(newArmour)].type == "magic") {
      //Check if the user's character is magical
      if (playerChar.magAff == false) {
        canUse = false;
      }
    }
    
    //If the user can use the armour, ask if they want to
    if (canUse == true) {
      addWriteToQue("Would you like to equip it?", "p class = 'green'");
      addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Yes/No'>");
      addFuncToQue(function() {getId("gameInput").focus();});
      
      //Get answer
      canDoKey = true;
      doWhenKey = function() {
        //Run different code next repeat if the user says yes or no
        if (parseInput() == "yes"){
          armourCount = 1;
        } else if (parseInput() == "no") {
          armourCount = 2;
        }
        
        //Reset input field
        getId("gameInput").disabled = true;
        getId("gameInput").id = "";
        
        //Repeat function
        changeArmour(comeFrom);
      }
    }
    //If the user can't use the armour, put it in their inventory
    else {
      addWriteToQue("The armour is magical . . . you are not.", "P");
      addWriteToQue("You cannot use it.", "P");
      
      //Repeat function
      addFuncToQue(function() {
        armourCount = 2;
        changeArmour(comeFrom);
      })
      
    }
    
    break;
    
  case 1:
    //Replace armour and put old armour in inventory(if user has)
    if(playerChar.armour != "none") {
      addWriteToQue("You put your " + playerChar.armour + " armour in your bag.", "p");
      addFuncToQue(function() {
        playerChar.inventory[playerChar.inventory.length] = playerChar.armour;
        
        next()
      });
    }
    addFuncToQue(function() {
      playerChar.armour = newArmour;
      makeSidebar();
      
      next()
    });
    addWriteToQue("You equip your new " + newArmour + " armour!", "p");
    
    //End function
    armourCount = 3;
    changeArmour(comeFrom);
    
    break;
    
  case 2:
    //If they don't want to replace their armour, add it to their inventory
    addWriteToQue("You put the " + newArmour + " armour in your bag.", "p");
    addFuncToQue(function () {
      playerChar.inventory[playerChar.inventory.length] = newArmour;
      
      //End function
      armourCount = 3;
      changeArmour(comeFrom);
    });
    
    break;
    
  case 3:
    //End weapon function
    if (comeFrom == "chest") {
      addWriteToQue("There is nothing else in this room.", "p");
      addFuncToQue(function() {canMove = true; armourCount = 0;})
    }
  }
}



//---------Battle Control---------

//Battle variables
var enemy; //Holds monster object
var firstCycle; //Holds whether it's the first cycle of the battle
var firstTurn; //Holds whose turn is first
var secTurn; //Holds whose turn is second
var atkWeap; //Holds which weap the player is attacking with
var charHasGone = false; //Holds whether char has gone in battle cycle
var enemyHasGone = false; //Holds whether enemy has gone in battle cycle
var totalDamage = ""; //Var used to hold calculated damage

//Function that selects a random monster to fight
function randomMonster() {
  var selectMonster = Math.floor(Math.random() * 7);
  
  if (selectMonster == 0) {
    enemy = new Character("Orc", "none", "Axe", 4, 0, 0, false, 3, 5, 0, 1.5, 0, 5, 5, 15);
    
  } else if (selectMonster == 1) {
    enemy = new Character("Skeleton", "none", "Side Sword", 3, 0, 0, false, 10, 1, 0, 1.5, 0, 7, 4, 100);
    
  } else if (selectMonster == 2) {
    enemy = new Character("Troll", "none", "Spiked Club", 6, 0, 0, false, 1, 7, 0, 3, 0, 1, 3, 25);
    
  } else if (selectMonster == 3) {
    enemy = new Character("Goblin", "none", "Throwing Knife", 0, 5, 0, false, 2, 4, 0, 1.5, 0, 7, 6, 10);
    
  } else if (selectMonster == 4) {
    enemy = new Character("Gnome", "none", "Magic Skewer", 0, 0, 7, true, 7, 3, 0, 1, 0, 7, 6, 10);
    
  } else if (selectMonster == 5) {
    enemy = new Character("Leprechaun", "none", "Rainbow of Doom, Destruction, Death and Despair", 0, 0, 9, true, 9, 3, 0, 1, 0, 3, 4, 15);
    
  } else if (selectMonster == 6) {
    enemy = new Character("Giant-Bat", "none", "Poison Barb", 0, 7, 0, false, 5, 5, 0, 1.5, 0, 7, 8, 15);
  }
  
  //Run the fight with the new enemy
  battleCount = 0;
  battle();
}

//Counter var to control battle function
var battleCount = 0;

//Function that controls battles
function battle() {
  //Switch statement that controls battle
  switch(battleCount) {
    //Check if user can run away
    case 0: {
      //Tell user what type of monster it is
      addWriteToQue("You see a " + enemy.charRace + " in the far corner of the room. . .", "p");
      
      //Check if player can run away and ask if they want to
      if (playerChar.stealth > enemy.stealth) {
        
        addWriteToQue("It has not seen you yet!", "p");
        addWriteToQue("Do you want to run away?", "p class = 'green'");
        
        addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Yes/No'>");
        addFuncToQue(function() {getId("gameInput").focus();});
        
        //Get answer
        canDoKey = true;
        doWhenKey = function() {
          //Run different code next repeat if the user says yes or no
          if (parseInput() == "yes"){
            battleCount = 2;
          } else if (parseInput() == "no") {
            battleCount = 1;
          }
          
          //Reset input field
          getId("gameInput").disabled = true;
          getId("gameInput").id = "";
          
          //Repeat function
          battle();
        }
        
      } else {
        addWriteToQue("It has seen you!", "p");
        
        //Repeat function and start battle
        addFuncToQue(function() {
        battleCount = 1;
        battle();
      });
        
      }
      
      break;
    }
    
    //Start the battle
    case 1: {
      //Start the battle (show battle screen etc.)
      addFuncToQue(function() {
        startBattle();
        next();
      });
      
      //If user's stealth is greater than monster's, give them first turn first time
      if (playerChar.stealth > enemy.stealth) {
        addWriteToQue("You slowly approach the " + enemy.charRace + ". . .","p");
        addFuncToQue(function() {firstTurn = "player"; next();});
        
      } else {
        addWriteToQue("The " + enemy.charRace + " rushes at you and attacks you!","p");
        addFuncToQue(function() {firstTurn = "enemy"; next();});
      }
      
      //Repeat function and start taking turns
      addFuncToQue(function() {
        battleCount = 4;
        battle();
        next();
      });
      
      //Display enemy properties
      // {
      //   //Output new enemy
      //   //Var to hold object property names
      //   var enemyPropsNames = Object.keys(enemy);
      //   //Var to hold object properties
      //   var enemyProps = [];
      //   //Add the properties from the player's char to the charProps array
      //   for (var i = 0; i <= enemyPropsNames.length; i++) {
      //     enemyProps.push(enemy[enemyPropsNames[i]]);
      //   }
      //   addWriteToQue(enemyProps.join(), "p");
      //
      // addInstantToQue("<img src = 'Sprites/Monsters/" + enemy.charRace + ".png' style = 'width: " + (enemy.size * 10).toString() + "%'>", "div");
      // }
      break;
    }
    
    //Run away
    case 2: {
      //Reset battleCount so function restarts next time
      battleCount = 0;
      
      addWriteToQue("You turn and bravely run away.", "p class = 'green'");
      
      //Move the room to the previous one
      addFuncToQue(function() {
        
        //Allow the program to move the user
        canMove = true;
        
        //Check which direction the previous room is and move that way
        if (preRoomY < curRoomY) {//North
          moveRoom("north");
        } else if (preRoomY > curRoomY) {//South
          moveRoom("south");
        } else if (preRoomX > curRoomX) {//East
          moveRoom("east");
        }  else {//West
          moveRoom("west");
        }
        
        next();
        
      });
      
      break;
    }
    
    //End battle
    case 3: {
      
      break;
    }
    
    //Ask which weapon
    case 4: {
      
      //Reset hasGone vars for new cycle
      charHasGone = false;
      enemyHasGone = false;
      
      //Ask which weapon to use
        
      addWriteToQue("Which weapon do you want to use?", "p class = 'green'");
      
      addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Weapon 1 or Weapon 2?'>");
      addFuncToQue(function() {getId("gameInput").focus();});
      
      //Get answer
      canDoKey = true;
      doWhenKey = function() {
        if (parseInput() == "defaultWeap" || parseInput() == "1"){
          atkWeap = playerChar.defaultWeap;
        } else if (parseInput() == "secWeap" || parseInput() == "2") {
          atkWeap = playerChar.secWeap;
        }
        
        //Reset input field
        getId("gameInput").disabled = true;
        getId("gameInput").id = "";
        
        //Repeat function
        battleCount = 5;
        battle();
      }
        
      
      
      break;
    }
    
    //Decide who goes first
    case 5: {
      
      //If it is the first cycle, determine first turn by stealth
      if (firstCycle && firstTurn == "player") {
        // addWriteToQue("stealth", "p");
        //Leave player with first turn and go to turn controller
        firstCycle = false;
        battleCount = 6;
        battle();
      }
      
      //Determine first turn by weapon type (mag > ranged > melee) or speed if same type
      else {
        
        //Get type advantage numbers
        var charTypeAd = 0;
        var enemyTypeAd = 0;
        // document.write("test")
        
        
        if (Weapons[findWeap(atkWeap)].type == "magic") {
          charTypeAd = 3;
        } else if (Weapons[findWeap(atkWeap)].type == "ranged") {
          charTypeAd = 2;
        } else {
          charTypeAd = 1;
        }
        
        if (Weapons[findWeap(enemy.defaultWeap)].type == "magic") {
          enemyTypeAd = 3;
        } else if (Weapons[findWeap(enemy.defaultWeap)].type == "ranged") {
          enemyTypeAd = 2;
        } else {
          enemyTypeAd = 1;
        }
        // document.write(charTypeAd.toString() + "<br>" + enemyTypeAd.toString());
        
        //Determine whose advantage is greater; if equal, use speed
        if (charTypeAd > enemyTypeAd) {
        // addWriteToQue("advantage", "p");
          firstTurn = "player";
        } else if (enemyTypeAd > charTypeAd) {
        // addWriteToQue("advantage", "p");
          firstTurn = "enemy";
        } else {
        // addWriteToQue("speed", "p");
          
          //Get total speeds of player and enemy
          var charTotalSpeed = playerChar.spd + Weapons[findWeap(atkWeap)].spd - (Armour[findArmour(playerChar.armour)].weight * 2);
          
          var enemyTotalSpeed = enemy.spd + Weapons[findWeap(enemy.defaultWeap)].spd - (Armour[findArmour(enemy.armour)].weight * 2);
          
          // document.write("Spd: " + charTotalSpeed.toString() + "<br>" + enemyTotalSpeed.toString());
          
          //Give turn to faster person(monster wins ties)
          if (charTotalSpeed > enemyTotalSpeed) {
            firstTurn = "player";
          } else {
            firstTurn = "enemy";
          }
        }
        
        
        //Go to turn controller
        firstCycle = false;
        battleCount = 6;
        battle();
        
      }
      
      break;
    }
    
    //Turn controller
    case 6: {
      
      //If neither person has gone, person with firstTurn goes first
      if (!charHasGone && !enemyHasGone) {
        
        if (firstTurn == "player") {
          //Run the player's turn
          battleCount = 8;
          
        } else {
          //Run the enemy's turn
          battleCount = 7;
          
        }
      }
      
      //If one person has gone, let the other person go
      else if (charHasGone && !enemyHasGone) {
        //Run the monster's turn
        battleCount = 7;
      } else if (enemyHasGone && !charHasGone) {
        //Run the player's turn
        battleCount = 8;
      }
      
      //If both people have gone, run new cycle
      else {
        battleCount = 4;
      }
      
      battle();
      
      break;
    }
    
    //Enemy's turn
    case 7: {
      
      //Hit the player
      addWriteToQue("The " + enemy.charRace + " hit you with its " + enemy.defaultWeap + "!", "p class = 'green'");
      
      // addFuncToQue(function() {
      //   calcDamage(enemy, playerChar, enemy.defaultWeap);
      //   next();
      // });
      
      // calcDamage(enemy, playerChar, enemy.defaultWeap);
      
      // addWriteToQue("It did " + totalDamage.toString() + " damage!", "p");
      
      addWriteToQue("It did " + calcDamage(enemy, playerChar, enemy.defaultWeap) + " damage!", "p");
      
      addFuncToQue(function() {
        //Refresh battle screen
        updateBattleScreen();
        
        //If the player has died, end the game
        if (playerChar.HP <= 0) {
          endGame();
        } else {
        
          //Tell program monster has gone
          enemyHasGone = true;
          
          //Go to next turn
          battleCount = 6;
          battle();
          
        }
      });
      
      break;
    }
    
    //Player's turn
    case 8: {
      
      //Hit the monster
      addWriteToQue("You hit the " + enemy.charRace + " with your " + atkWeap + "!", "p class = 'green'");
      
      // addFuncToQue(function() {
      //   calcDamage(playerChar, enemy, atkWeap);
      //   // document.write(totalDamage);
      //   next();
      // });
      
      // calcDamage(playerChar, enemy, atkWeap);
      
      // addWriteToQue("You did " + totalDamage.toString() + " damage!", "p");
      addWriteToQue("You did " + calcDamage(playerChar, enemy, atkWeap) + " damage!", "p");
      
      addFuncToQue(function() {
        //Refresh battle screen
        updateBattleScreen();
        
        //If the monster has died, end the battle
        if (enemy.HP <= 0) {
          endBattle();
        } else {
          
          //Tell program player has gone
          charHasGone = true;
          
          //Go to next turn
          battleCount = 6;
          battle();
        
        }
      });
      
      break;
    }
    
    //If the player has already beaten the monster
    case 9: {
      addWriteToQue("There is an awful stench coming from the corner of the room.", "p");
      addWriteToQue("You look and see a rotting monster corpse.", "p class = 'green'");
      addWriteToQue("There is nothing else in this room", "p");
      addFuncToQue(function() {
        canMove = true;
      });
      
      
      break;
    }
  }
}

//Function that finds the index of a boss's weapon; takes the name of the weapon
function findBossWeap(weapName) {
  
  //Var to hold weapon index
  var i = 0;
  
  //Loop through the BossWeapons array until finding the correct name
  for (; i < BossWeapons.length; i++) {
    //Check if names match
    if (BossWeapons[i].name == weapName) {
      //End the loop so i will be the index of the current weapon
      break;
    }
  }
  
  //Return the weapon index
  return i;
  
}

//Function that controls boss battles
function bossBattle() {
  //Switch statement that controls battle
  switch(battleCount) {
    //Check if user can run away
    case 0: {
      //Tell user what type of monster it is
      addWriteToQue("You see the " + enemy.charRace + " in the far corner of the room. . .", "p");
      
      //Check if player can run away and ask if they want to
      if (playerChar.stealth > enemy.stealth) {
        
        addWriteToQue("It has not seen you yet!", "p");
        addWriteToQue("Do you want to run away?", "p class = 'green'");
        
        addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Yes/No'>");
        addFuncToQue(function() {getId("gameInput").focus();});
        
        //Get answer
        canDoKey = true;
        doWhenKey = function() {
          //Run different code next repeat if the user says yes or no
          if (parseInput() == "yes"){
            battleCount = 2;
          } else if (parseInput() == "no") {
            battleCount = 1;
          }
          
          //Reset input field
          getId("gameInput").disabled = true;
          getId("gameInput").id = "";
          
          //Repeat function
          bossBattle();
        }
        
      } else {
        addWriteToQue("It has seen you!", "p");
        
        //Repeat function and start battle
        addFuncToQue(function() {
        battleCount = 1;
        bossBattle();
      });
        
      }
      
      break;
    }
    
    //Start the battle
    case 1: {
      //Start the battle (show battle screen etc.)
      addFuncToQue(function() {
        startBattle();
        next();
      });
      
      //If user's stealth is greater than monster's, give them first turn first time
      if (playerChar.stealth > enemy.stealth) {
        addWriteToQue("You slowly approach the " + enemy.charRace + ". . .","p");
        addFuncToQue(function() {firstTurn = "player"; next();});
        
      } else {
        addWriteToQue("The " + enemy.charRace + " rushes at you and attacks you!","p");
        addFuncToQue(function() {firstTurn = "enemy"; next();});
      }
      
      //Repeat function and start taking turns
      addFuncToQue(function() {
        battleCount = 4;
        bossBattle();
        next();
      });
      
      //Display enemy properties
      // {
      //   //Output new enemy
      //   //Var to hold object property names
      //   var enemyPropsNames = Object.keys(enemy);
      //   //Var to hold object properties
      //   var enemyProps = [];
      //   //Add the properties from the player's char to the charProps array
      //   for (var i = 0; i <= enemyPropsNames.length; i++) {
      //     enemyProps.push(enemy[enemyPropsNames[i]]);
      //   }
      //   addWriteToQue(enemyProps.join(), "p");
      //
      // addInstantToQue("<img src = 'Sprites/Monsters/" + enemy.charRace + ".png' style = 'width: " + (enemy.size * 10).toString() + "%'>", "div");
      // }
      break;
    }
    
    //Run away
    case 2: {
      //Reset battleCount so function restarts next time
      battleCount = 0;
      
      addWriteToQue("You turn and bravely run away.", "p class = 'green'");
      
      //Move the room to the previous one
      addFuncToQue(function() {
        
        //Allow the program to move the user
        canMove = true;
        
        //Check which direction the previous room is and move that way
        if (preRoomY < curRoomY) {//North
          moveRoom("north");
        } else if (preRoomY > curRoomY) {//South
          moveRoom("south");
        } else if (preRoomX > curRoomX) {//East
          moveRoom("east");
        }  else {//West
          moveRoom("west");
        }
        
        next();
        
      });
      
      break;
    }
    
    //End battle
    case 3: {
      
      break;
    }
    
    //Ask which weapon
    case 4: {
      
      //Reset hasGone vars for new cycle
      charHasGone = false;
      enemyHasGone = false;
      
      //Ask which weapon to use
        
      addWriteToQue("Which weapon do you want to use?", "p class = 'green'");
      
      addInstantToQue("<input id = 'gameInput' type = 'text' placeholder = 'Weapon 1 or Weapon 2?'>");
      addFuncToQue(function() {getId("gameInput").focus();});
      
      //Get answer
      canDoKey = true;
      doWhenKey = function() {
        if (parseInput() == "defaultWeap" || parseInput() == "1"){
          atkWeap = playerChar.defaultWeap;
        } else if (parseInput() == "secWeap" || parseInput() == "2") {
          atkWeap = playerChar.secWeap;
        } else {
          //Reset input field
          getId("gameInput").disabled = true;
          getId("gameInput").id = "";
          
          //Repeat function
          bossBattle();
        }
        
        //Reset input field
        getId("gameInput").disabled = true;
        getId("gameInput").id = "";
        
        //Repeat function
        battleCount = 5;
        bossBattle();
      }
        
      
      
      break;
    }
    
    //Decide who goes first
    case 5: {
      
      //If it is the first cycle, determine first turn by stealth
      if (firstCycle && firstTurn == "player") {
        // addWriteToQue("stealth", "p");
        //Leave player with first turn and go to turn controller
        firstCycle = false;
        battleCount = 6;
        bossBattle();
      }
      
      //Determine first turn by weapon type (mag > ranged > melee) or speed if same type
      else {
        
        //Get type advantage numbers
        var charTypeAd = 0;
        var enemyTypeAd = 0;
        // document.write("test")
        
        //Player's advantage
        if (Weapons[findWeap(atkWeap)].type == "magic") {
          charTypeAd = 3;
        } else if (Weapons[findWeap(atkWeap)].type == "ranged") {
          charTypeAd = 2;
        } else {
          charTypeAd = 1;
        }
        
        //Enemy's advantage
        if (BossWeapons[findBossWeap(enemy.defaultWeap)].type == "magic") {
          enemyTypeAd = 3;
        } else if (BossWeapons[findBossWeap(enemy.defaultWeap)].type == "ranged") {
          enemyTypeAd = 2;
        } else {
          enemyTypeAd = 1;
        }
        // document.write(charTypeAd.toString() + "<br>" + enemyTypeAd.toString());
        
        //Determine whose advantage is greater; if equal, use speed
        if (charTypeAd > enemyTypeAd) {
        // addWriteToQue("advantage", "p");
          firstTurn = "player";
        } else if (enemyTypeAd > charTypeAd) {
        // addWriteToQue("advantage", "p");
          firstTurn = "enemy";
        } else {
        // addWriteToQue("speed", "p");
          
          //Get total speeds of player and enemy
          var charTotalSpeed = playerChar.spd + Weapons[findWeap(atkWeap)].spd - (Armour[findArmour(playerChar.armour)].weight * 2);
          
          var enemyTotalSpeed = enemy.spd + BossWeapons[findBossWeap(enemy.defaultWeap)].spd - (Armour[findArmour(enemy.armour)].weight * 2);
          
          // document.write("Spd: " + charTotalSpeed.toString() + "<br>" + enemyTotalSpeed.toString());
          
          //Give turn to faster person(monster wins ties)
          if (charTotalSpeed > enemyTotalSpeed) {
            firstTurn = "player";
          } else {
            firstTurn = "enemy";
          }
        }
        
        
        //Go to turn controller
        firstCycle = false;
        battleCount = 6;
        bossBattle();
        
      }
      
      break;
    }
    
    //Turn controller
    case 6: {
      
      //If neither person has gone, person with firstTurn goes first
      if (!charHasGone && !enemyHasGone) {
        
        if (firstTurn == "player") {
          //Run the player's turn
          battleCount = 8;
          
        } else {
          //Run the enemy's turn
          battleCount = 7;
          
        }
      }
      
      //If one person has gone, let the other person go
      else if (charHasGone && !enemyHasGone) {
        //Run the monster's turn
        battleCount = 7;
      } else if (enemyHasGone && !charHasGone) {
        //Run the player's turn
        battleCount = 8;
      }
      
      //If both people have gone, run new cycle
      else {
        battleCount = 4;
      }
      
      bossBattle();
      
      break;
    }
    
    //Enemy's turn
    case 7: {
      
      //Hit the player
      addWriteToQue("The " + enemy.charRace + " hit you with its " + enemy.defaultWeap + "!", "p class = 'green'");
      
      // addFuncToQue(function() {
      //   calcDamage(enemy, playerChar, enemy.defaultWeap);
      //   next();
      // });
      
      // calcDamage(enemy, playerChar, enemy.defaultWeap);
      
      // addWriteToQue("It did " + totalDamage.toString() + " damage!", "p");
      
      addWriteToQue("It did " + calcDamage(enemy, playerChar, enemy.defaultWeap) + " damage!", "p");
      
      addFuncToQue(function() {
        //Refresh battle screen
        updateBattleScreen();
        
        //If the player has died, end the game
        if (playerChar.HP <= 0) {
          endGame();
        } else {
        
          //Tell program monster has gone
          enemyHasGone = true;
          
          //Go to next turn
          battleCount = 6;
          bossBattle();
          
        }
      });
      
      break;
    }
    
    //Player's turn
    case 8: {
      
      //Hit the monster
      addWriteToQue("You hit the " + enemy.charRace + " with your " + atkWeap + "!", "p class = 'green'");
      
      // addFuncToQue(function() {
      //   calcDamage(playerChar, enemy, atkWeap);
      //   // document.write(totalDamage);
      //   next();
      // });
      
      // calcDamage(playerChar, enemy, atkWeap);
      
      // addWriteToQue("You did " + totalDamage.toString() + " damage!", "p");
      addWriteToQue("You did " + calcDamage(playerChar, enemy, atkWeap) + " damage!", "p");
      
      addFuncToQue(function() {
        //Refresh battle screen
        updateBattleScreen();
        
        //If the monster has died, end the battle
        if (enemy.HP <= 0) {
          endBattle();
        } else {
          
          //Tell program player has gone
          charHasGone = true;
          
          //Go to next turn
          battleCount = 6;
          bossBattle();
        
        }
      });
      
      break;
    }
    
    //If the player has already beaten the monster
    case 9: {
      addWriteToQue("There is an awful stench coming from the corner of the room.", "p");
      addWriteToQue("You look and see a rotting monster corpse.", "p");
      addWriteToQue("There is nothing else in this room", "p");
      addFuncToQue(function() {
        canMove = true;
      });
      
      
      break;
    }
  }
}

//Initiate battle function
function startBattle() {
  //Display fight screen and hide mini map
  getId("miniMap").style.display = "none";
  getId("battleMode").style.display = "block";
  
  //Add monster picture
  getId("enemyFightPic").src = "Sprites/Monsters/" + enemy.charRace + ".png";
  
  //Add char picture
  getId("charFightPic").src = "Sprites/Races/" + playerChar.charRace + "/" + playerChar.charRace + "_" + playerChar.charClass + ".png";
  
  //Get correct HP values
  updateBattleScreen();
  
  //Tell program it's the first cycle
  firstCycle = true;
}

//Update player and monster health
function updateBattleScreen() {
  //Enemy
  getId("enemyFightHP").innerHTML = (enemy.HP).toString();
  
  //Char
  getId("charFightHP").innerHTML = (playerChar.HP).toString();
  
  //Update sidebar
  makeSidebar();
}

//End battle when necessary
function endBattle() {
  //Hide fight screen and show mini map
  getId("battleMode").style.display = "none";
  getId("miniMap").style.display = "block";
  
  addWriteToQue("You killed the " + enemy.charRace + "!", "p class = 'green'");
  
  //Level up the player
  addFuncToQue(function() {
    levelUp("battle");
  });
  
}

//Hit and calculate damage; takes the object of the attacker and defender and the name of the weapon used
function calcDamage(attacker, defender, weaponName) {
  
  //Check if it needs to use a boss weapon(if the player is not attacking and the room is not a monster room)
  if (attacker != playerChar && dungeonRooms[findRoom(curRoomX, curRoomY)].roomType != "monster") {
    var weapon = BossWeapons[findBossWeap(weaponName)];
    
  } else {
    var weapon = Weapons[findWeap(weaponName)];
    
  }
  var armour = Armour[findArmour(defender.armour)];
  
  
  //Get the damage done by the attacker
  //Get for melee weapon
  if (weapon.type == "melee") {
    var preDamage = attacker.mAtk + weapon.atk;
    
  }
  //Get for ranged weapon
  else if (weapon.type == "ranged") {
    var preDamage = attacker.rAtk + weapon.atk;
    
  }
  //Get for magic weapon
  else {
    var preDamage = attacker.magAtk + weapon.atk;
    
  }
  
  // document.write("weapon");
  
  //Get the resistance of the defender
  //Get for magic weapon
  if (weapon.type == "magic") {
    var resist = defender.magDef + armour.magDef;
    
  }
  //Get for melee or ranged weapon
  else {
    var resist = defender.tough + armour.tough;
    
  }
  
  //Make resist never negative
  if (resist < 0) {
    resist = 0;
  }
  
  
  //Calculate the total damage done
  totalDamage = preDamage - Math.ceil(Math.sqrt(resist));
  
  //Make damage never negative or zero
  if (totalDamage < 1) {
    totalDamage = 1;
  }
  
  // totalDamage = totalDamage.toString();
  
  //Subtract HP from defender
  defender.HP -= totalDamage;
  
  return totalDamage.toString();
  
}



//-----------------------End Game-----------------------

//End the game
function endGame() {
  // document.write("You were killed by the " + enemy.charRace + " :(");
  
  getId("mainGame").style.display = "none";
  
  getId("gameOver").style.display = "block";
  
  function endingWhite() {
    getId("gameOver").style.color = "#FFFFFF";
    
  }
  
  function endingBlack() {
    getId("gameOver").style.color = "#000000";
    
  }
  
  setTimeout(endingWhite, 500);
  setTimeout(endingBlack, 7000);
}







