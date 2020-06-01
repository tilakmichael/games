// Global Variables
//Constants
const gmaxvalue = 100;
const cupimg = "../images/cup.jpeg";
const startimg = "../images/start.jpeg";
const snakeimg = "../images/snake.png";
const ladderimg = "../images/ladder.png";
const playerimageAray = [
  "../images/player1.png",
  "../images/player2.png",
  "../images/player3.png",
  "../images/player4.png",
  "../images/player5.png",
];
const yourimage = "../images/tilak.jpg";
const roboimage = "../images/pc.jpeg";

// Globals
var gQaTime = false;
var gMaxPlayer = 2;
var isAutoPlayer = false;
var gVolume = null;

var gStatus = "B";
var tableAry = new Array(100);
var snakeAry = new Array(100);
var laderAry = new Array(100);
var currentPlayr = 0;
var gPlayer = {
  name: "",
  diceCount: 0,
  diceValue: 0,
  prevScore: 0,
  totalScore: 0,
  color: null,
  roboplayer: false,
  image: null,
  imageEle: null,
};
var playerArray = new Array();
var snakeEle;
var LaderEle;
/* *********************** */
window.onload = function () {
  loadLaderSnake();
  getUserPref();
};

function loadLaderSnake() {
  snakeAry[98] = 21;
  snakeAry[96] = 72;
  snakeAry[93] = 30;
  snakeAry[78] = 62;
  snakeAry[74] = 52;
  snakeAry[69] = 43;
  snakeAry[61] = 43;
  snakeAry[48] = 29;
  snakeAry[18] = 6;

  laderAry[66] = 72;
  laderAry[42] = 60;
  laderAry[24] = 76;
  laderAry[31] = 82;
  laderAry[18] = 55;
  laderAry[10] = 15;
}

//
function getUserPref() {
  let player = prompt("Please enter Number of Players (1 to 4) :");
  let rightAnser = false;
  if (typeof +player == "number") {
    if (+player <= 4 && +player > 0) {
      gMaxPlayer = +player;
      rightAnser = true;
      gQaTime = true;
    }
  }

  if (rightAnser == false) {
    alert("Sine you have not entered right answers , players set to default");
    gMaxPlayer = 2;
    isAutoPlayer = true;
    defaultPlayer();
  }
  checkQaTime();
}

// enable disable region
function enDisRegion(flag) {
  let ele = document.getElementById("qadiv");
  let ele1 = document.getElementById("bodydiv");
  if (flag) {
    if (ele !== null) {
      ele.style.display = "block";
      if (ele1 !== null) {
        ele1.style.display = "none";
      }
      paintPlayersQA();
    }
  } else {
    if (ele !== null) {
      ele.style.display = "none";
      if (ele1 !== null) {
        ele1.style.display = "block";
      }
    }
    paintGame();
    setPlayerName();
  }
}

// decide which are (qa/game) to be displayed
function checkQaTime() {
  if (gQaTime) {
    enDisRegion(true);
  } else {
    enDisRegion(false);
  }
}

function paintPlayersQA() {
  let form = document.getElementById("qaformdiv");

  let div = document.createElement("div");

  let range = document.createElement("input");
  range.type = "range";
  range.id = "range";
  range.min = "0";
  range.max = "10";
  let label = document.createElement("label");
  label.appendChild(document.createTextNode("Game Volume"));
  label.appendChild(range);
  div.appendChild(label);
  let br = document.createElement("br");
  div.appendChild(br);
  div.appendChild(document.createElement("hr"));

  for (let i = 0; i < gMaxPlayer; i++) {
    let h5 = document.createElement("span");
    h5.className = "bold";
    h5.appendChild(
      document.createTextNode("Player " + (i + 1) + " Information:")
    );
    div.appendChild(h5);
    br = document.createElement("br");
    div.appendChild(br);
    let inplable = document.createElement("label");
    inplable.appendChild(document.createTextNode("Enter Player Name: "));
    inplable.for = "idipqa" + i;

    let input = document.createElement("input");
    input.required = true;
    input.id = "idipqa" + i;
    div.appendChild(inplable).appendChild(input);
    // break
    br = document.createElement("br");
    div.appendChild(br);
    // color of player
    let color = document.createElement("select");
    color.name = "namecolorqa" + i;
    color.id = "idcolorqa" + i;
    color.required = true;
    label = document.createElement("label");
    label.appendChild(document.createTextNode("Select Color: "));
    label.for = "idcolorqa" + i;
    // red color
    let option = document.createElement("option");
    option.appendChild(document.createTextNode("Red"));
    option.value = "red";
    if (i == 0) {
      option.selected = true;
    }
    color.appendChild(option);

    // blue color
    option = document.createElement("option");
    option.appendChild(document.createTextNode("Blue"));
    option.value = "blue";
    if (i == 1) {
      option.selected = true;
    }
    color.appendChild(option);

    // color green
    option = document.createElement("option");
    option.appendChild(document.createTextNode("Green"));
    option.value = "green";
    if (i == 2) {
      option.selected = true;
    }
    color.appendChild(option);
    // yellow
    option = document.createElement("option");
    option.appendChild(document.createTextNode("Yellow"));
    if (i == 3) {
      option.selected = true;
    }
    option.value = "yellow";
    color.appendChild(option);
    div.appendChild(label);
    div.appendChild(color);
    // break
    br = document.createElement("br");
    div.appendChild(br);

    // robo player

    ele = document.createElement("input");
    ele.id = "idrobo" + i;
    ele.name = "roboPlayer";
    ele.type = "radio";
    label = document.createElement("label");
    label.htmlFor = "idrobo" + i;
    label.appendChild(document.createTextNode("  Robo Player: "));
    //label.appendChild(ele);
    div.appendChild(label);
    div.appendChild(ele);
    div.appendChild(document.createElement("br"));
    // picture
    for (let k = 0; k < 5; k++) {
      ele = document.createElement("input");
      ele.id = "idipradio1player" + i + "_" + k;
      ele.name = "radio" + i;
      ele.type = "radio";
      if (k == 1) {
        ele.required = true;
      }
      if (i == k) {
        ele.checked = true;
      }
      ele.value = k;
      label = document.createElement("label");
      let img = document.createElement("img");
      img.src = playerimageAray[k];
      img.height = 50;
      label.appendChild(img);
      label.appendChild(ele);
      div.appendChild(label);
    }

    // line of player
    div.appendChild(document.createElement("hr"));
    // all the div to form
    form.appendChild(div);
  }
}

// paintGameRegion
function paintGame() {
  paintTable();
}

// paint table of 100 cell
function paintTable() {
  let tbl = document.getElementById("tbody");
  tbl.innerHTML = "";
  for (let i = Math.floor(gmaxvalue / 10); i > 0; i--) {
    let row = document.createElement("tr");
    let id = "idrow" + i;
    row.id = id;

    if (i % 2 == 0) {
      // descending order
      for (k = 10; k > 0; k--) {
        let colno = i * 10 - 10 + k;
        //document.write(colno + "\n");
        let col = document.createElement("td");
        id = "idcol" + colno;
        col.id = id;
        //col.id = "idc" + colno.toString(8);
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(colno + " "));
        span.id = "idcolspan" + colno;
        col.appendChild(span);
        row.appendChild(col);
      }
    } else {
      // ascending order
      for (k = 0; k < 10; k++) {
        let colno = i * 10 - 10 + k + 1;
        //document.write(colno + "\n");
        let col = document.createElement("td");
        id = "idcol" + colno;
        col.id = id;
        //col.id = "idc" + colno.toString(8);
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(colno + " "));
        span.id = "idcolspan" + colno;
        col.appendChild(span);
        row.appendChild(col);
      }
    }

    tbl.appendChild(row);
  }

  // paimnt the laddr and snake
  paintLadderSnake();

  // after painting table paint score
  paintscoreCard();
}

function paintscoreCard() {
  // paint score are
  let elmt = document.getElementById("score");
  elmt.innerHTML = "";
  for (let i = 0; i < gMaxPlayer; i++) {
    let div = document.createElement("div");
    div.classList.add(playerArray[i].color + "Bg", "scorediv");
    div.style = "width:" + Math.floor(100 / gMaxPlayer - 1) + "%";
    let span = document
      .createElement("span")
      .appendChild(document.createTextNode(playerArray[i].name + ": "));
    div.appendChild(span);
    //dice value
    let input = document.createElement("input");
    let label = document.createElement("label");
    label.appendChild(document.createTextNode("Dice: "));
    input.type = "text";
    input.readOnly = true;
    input.id = "dice" + i;
    input.size = "5";
    label.for = "dice" + i;
    label.appendChild(input);
    div.appendChild(label);
    let br = document.createElement("br");

    // count
    input = document.createElement("input");
    label = document.createElement("label");
    label.appendChild(document.createTextNode(" Count: "));
    input.type = "text";
    input.readOnly = true;
    input.id = "count" + i;
    input.size = "5";
    label.for = "count" + i;
    label.appendChild(input);
    div.appendChild(label);
    br = document.createElement("br");

    div.appendChild(br);

    // prevscore
    input = document.createElement("input");
    label = document.createElement("label");
    label.appendChild(document.createTextNode("Previous Score: "));
    input.type = "text";
    input.readOnly = true;
    input.id = "prev" + i;
    input.size = "5";
    label.for = "prev" + i;
    label.appendChild(input);
    div.appendChild(label);
    br = document.createElement("br");
    div.appendChild(br);

    //total score
    input = document.createElement("input");
    label = document.createElement("label");
    label.appendChild(document.createTextNode("Total Score: "));
    input.type = "text";
    input.readOnly = true;
    input.id = "total" + i;
    input.size = "5";
    label.for = "total" + i;
    label.appendChild(input);
    div.appendChild(label);

    // add to div in footer
    elmt.appendChild(div);
  }
}

function paintLadderSnake() {
  for (let i = 0; i < gmaxvalue; i++) {
    let colid = "idcol" + i;
    if (snakeAry[i] != undefined && snakeAry[i] != null) {
      let ele = document.getElementById(colid);
      if (ele != undefined || ele != null) {
        snakeEle = document.createElement("img");
        snakeEle.src = snakeimg;
        //snakeEle.height = 35;
        ele.appendChild(snakeEle);
        ele.appendChild(
          document
            .createElement("span")
            .appendChild(document.createTextNode("  ==> " + snakeAry[i]))
        );
        ele.className = "redBg";
      }
    } else if (laderAry[i] != undefined && laderAry[i] != null) {
      let ele = document.getElementById(colid);
      if (ele != undefined || ele != null) {
        laderEle = document.createElement("img");
        laderEle.src = ladderimg;
        //laderEle.height = 35;
        ele.appendChild(document.createElement("span").appendChild(laderEle));
        ele.appendChild(
          document
            .createElement("span")
            .appendChild(document.createTextNode("  ==> " + laderAry[i]))
        );
        ele.className = "greenBg";
      }
    }
  }

  // paint cup and start

  let ele = document.getElementById("idcol" + 1);
  let img = document.createElement("img");
  img.src = startimg;
  img.height = 40;
  ele.appendChild(document.createElement("span").appendChild(img));

  // cup for 100

  ele = document.getElementById("idcol" + gmaxvalue);
  img = document.createElement("img");
  img.src = cupimg;
  img.height = 40;
  ele.appendChild(document.createElement("span").appendChild(img));
}

// when the qa form submit
// collect values ffrom usr enty
function qaFormSubmit() {
  //alert("Qa form submitted");
  // get volume
  let rangevalue = document.getElementById("range");
  if (rangevalue != null) {
    let rangeno = rangevalue.value;
    //alert(rangeno);
    if (+rangeno == 0) {
      gVolume = 0;
    } else {
      gVolume = +rangeno / 10;
    }
  }

  let robo = document.getElementsByName("roboPlayer");

  playerArray = new Array();
  let verified = true;
  for (let i = 0; i < gMaxPlayer; i++) {
    let name = null;
    let color = null;
    let image = null;
    let roboplayer = false;
    let ele = document.getElementById("idipqa" + i);
    if (ele != null) {
      name = ele.value;
    }
    ele = document.getElementById("idcolorqa" + i);
    if (ele != null) {
      color = ele.options[ele.selectedIndex].value;
    }

    ele = document.getElementsByName("radio" + i);
    if (ele != null) {
      for (let k = 0; k < ele.length; k++) {
        if (ele[k].checked) {
          image = ele[k].value;
          break;
        }
      }
    }
    if (robo !== null) {
      if (robo[i].checked) {
        roboplayer = true;
      }
    }

    if (name == null || color == null || image == null) {
      alert("Some pf the value is missing");
      verified = false;
      break;
    } else {
      // creaat user
      let player = Object.create(gPlayer);
      player.name = name;
      player.image = playerimageAray[+image];
      player.imageEle = document.createElement("img");
      player.imageEle.src = player.image;
      player.imageEle.height = 50;
      player.color = color;
      player.roboplayer = roboplayer;
      playerArray.push(player);
    }
  }
  if (verified) {
    gQaTime = false;
    enDisRegion(false);
  }
}

function defaultPlayer() {
  //alert("Qa form submitted");
  playerArray = new Array();

  for (let i = 0; i < gMaxPlayer; i++) {
    let name = null;
    let color = null;
    let image = null;
    let roboplayer = false;
    if (i == 0) {
      name = "You";
      color = "red";
      image = yourimage;
    } else {
      image = roboimage;
      color = "grey";
      if (isAutoPlayer) {
        name = "Robo";
        roboplayer = true;
      } else {
        name = "Me";
      }
    }

    let player = Object.create(gPlayer);
    player.name = name;
    player.image = image;
    player.roboplayer = roboplayer;
    //.player.image = playerimageAray[+image];
    player.imageEle = document.createElement("img");
    player.imageEle.src = player.image;
    player.imageEle.height = 50;
    player.color = color;
    playerArray.push(player);
  }
}

// reset Score
function resetScore() {
  currentPlayr = 0;
  gStatus = "B";
  for (let i = 0; i < gMaxPlayer; i++) {
    playerArray[i].diceCount = 0;
    playerArray[i].diceValue = 0;
    playerArray[i].totalScore = 0;
    playerArray[i].prevScore = 0;
  }
  setCurrentScore();
  setPlayerName();
}

// set curent score
function setCurrentScore() {
  for (let i = 0; i < gMaxPlayer; i++) {
    let ele = document.getElementById("dice" + i);
    if (ele != null) {
      ele.value = playerArray[i].diceValue;
    }
    ele = document.getElementById("count" + i);
    if (ele != null) {
      ele.value = playerArray[i].diceCount;
    }

    ele = document.getElementById("prev" + i);
    if (ele != null) {
      ele.value = playerArray[i].prevScore;
    }
    ele = document.getElementById("total" + i);
    if (ele != null) {
      ele.value = playerArray[i].totalScore;
    }
    paintPlayerImage(i);
  }
}

function paintPlayerImage(playerno) {
  let player = getPlayer(playerno);
  if (player != null) {
    if (player.totalScore != 0) {
      let elmt = document.getElementById("idcol" + player.totalScore);
      let span = document.getElementById("idcolspan" + player.totalScore);
      if (span != null) {
        span.classList.add(player.color);
      }

      if (elmt != null) {
        if (player.imageEle != null) {
          let span = document.createElement("span");
          span.appendChild(player.imageEle);
          elmt.appendChild(span);
        }
      }
    }
  }
}

function setPlayerName() {
  let plyr = getPlayer(0);
  let elmt = document.getElementById("cpname");
  if (elmt != null) {
    elmt.classList.remove("red", "green", "blue", "yellow", "grey");
    elmt.innerHTML = "";
    if (plyr != null) {
      elmt.classList.add(plyr.color);
      elmt.appendChild(document.createTextNode(plyr.name));
    }
    // set button color
    elmt = document.getElementById("dicebtn");
    if (elmt != null) {
      elmt.classList.remove(
        "redBtn",
        "greenBtn",
        "blueBtn",
        "yellowBtn",
        "greyBtn"
      );
      elmt.classList.add(plyr.color + "Btn");
    }
  }
  elmt = document.getElementById("ppname");
  if (elmt != null) {
    elmt.classList.remove("red", "green", "blue", "yellow", "grey");
    elmt.innerHTML = "";
    if (gStatus != "B") {
      let prvplyr = getPlayer(-1);
      if (prvplyr != null) {
        elmt.appendChild(document.createTextNode(prvplyr.name));
        elmt.classList.add(prvplyr.color);
      }
    }
  }
}

function getPlayerNo(no) {
  let cplyr = currentPlayr + no;
  if (cplyr >= gMaxPlayer) {
    cplyr = 0;
  } else if (cplyr < 0) {
    cplyr = gMaxPlayer - 1;
  }
  return cplyr;
}
// getPlayer 0 current , 1 next , -1 prev
function getPlayer(no) {
  return playerArray[getPlayerNo(no)];
}

//set player score
function setPlayerScore(dice) {
  let plyer = getPlayer(0);
  let total = plyer.totalScore;
  plyer.diceCount++;
  plyer.diceValue = dice;
  plyer.prevScore = total;
  // add total to new dice value
  total += dice;
  if (total <= gmaxvalue) {
    plyer.totalScore = checkSnakeAndLadder(total);

    if (plyer.totalScore == gmaxvalue) {
      gStatus = "C";
      blinkValue(gmaxvalue, "winner");
    } else {
      // if the totalue changed reset previous value
      if (plyer.totalScore != total) {
        plyer.prevScore = total;
      }
    }
  } else {
    blinkValue(null, "error");
  }
  setCurrentScore();
}

function checkSnakeAndLadder(score) {
  let num = score;
  if (snakeAry[score] != undefined && snakeAry[score] != null) {
    num = snakeAry[score];
    blinkValue(score, "myAudioSnake");
  } else if (laderAry[score] != undefined && laderAry[score] != null) {
    num = laderAry[score];
    blinkValue(score, "myAudioLadder");
  }
  return num;
}

// blinking wiht playing music
function blinkValue(colno, music) {
  if (colno != null) {
    let ele = document.getElementById("idcol" + colno);
    if (ele != null) {
      ele.classList.add("blinking");
    }
  }

  if (music != null) {
    let x = document.getElementById(music);
    let volume = 1;
    if (gVolume != null) {
      volume = gVolume;
    } else {
      volume = 0.2;
    }
    if (x != null && volume != 0) {
      x.volume = volume;
      x.play();
    }
  }
}

// enable disable rollotton
function toggleDice(value) {
  document.getElementById("dicebtn").disabled = value;
}

// this function reset the game
function resetGame() {
  resetScore();
  toggleDice(false);
  paintGame();
}

function incPlayer() {
  // determine next player
  currentPlayr = getPlayerNo(1);
  setPlayerName();
  let player = getPlayer(0);
  if (player.roboplayer) {
    rollDice();
  } else {
    toggleDice(false);
    blinkValue(null, "next");
  }
}

function rollDice() {
  toggleDice(true);
  if (gStatus != "C") {
    gStatus = "P";
    let diceval = randomVal();
    paintGame();
    setPlayerScore(diceval);
    // decide on next player
    setTimeout(function () {
      incPlayer();
    }, 2000);
  }
}

function randomVal() {
  let val = Math.floor(Math.random() * 6) + 1;
  //alert(val);
  return val;
}
