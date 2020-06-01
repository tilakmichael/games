const maxvalue = 100;
const maxPlayer = 2;
const cupimg = "../images/cup.jpeg";
const startimg = "../images/start.jpeg";
const snakeimg = "../images/snake.png";
const ladderimg = "../images/ladder.png";

var status = "B";
var tableAry = new Array(100);
var snakeAry = new Array(100);
var laderAry = new Array(100);
var currentPlayr = 1;
var player = {
  name: "",
  diceCount: 0,
  diceValue: 0,
  prevScore: 0,
  totalScore: 0,
  dicecount: 0,
  color: null,
  roboplayer: false,
  image: null,
  imageEle: null,
};
var playerArray = new Array();
var snakeEle;
var LaderEle;

/******************** Function  *********************/

window.onload = function () {
  initglobal();
  initAll();
};

// This function intialise al that need for the game
// every time game started
function initAll() {
  status = "B";
  drawTable();
}

// This initalise all the  information that need for game
// and intialise once for the page
function initglobal() {
  loadLaderSnake();
}

//function to intialise the ladder and snake
function loadLaderSnake() {
  snakeAry[98] = 21;
  snakeAry[96] = 72;
  snakeAry[93] = 30;
  snakeAry[78] = 62;
  snakeAry[74] = 52;
  snakeAry[69] = 43;
  snakeAry[48] = 29;
  snakeAry[18] = 6;

  laderAry[66] = 72;
  laderAry[42] = 60;
  laderAry[24] = 76;
  laderAry[31] = 82;
  laderAry[18] = 55;
  laderAry[10] = 15;
  // load employee

  /// me player
  let gPlayer = Object.create(player);
  gPlayer.name = "Tilak";
  gPlayer.image = "../images/tilak.jpg";
  gPlayer.imageEle = document.createElement("img");
  gPlayer.imageEle.src = gPlayer.image;
  gPlayer.imageEle.height = 50;
  gPlayer.color = "blue";
  playerArray.push(gPlayer);
  //  pc player
  gPlayer = Object.create(player);
  gPlayer.name = "Robo";
  gPlayer.image = "../images/pc.jpeg";
  gPlayer.imageEle = document.createElement("img");
  gPlayer.imageEle.src = gPlayer.image;
  gPlayer.imageEle.height = 50;
  gPlayer.color = "red";
  gPlayer.roboplayer = true;
  playerArray.push(gPlayer);
}

// this function draw the table in screen
function drawTable() {
  let tbl = document.getElementById("gamebody");
  //   Delete if there is any child in the body
  if (tbl.hasChildNodes()) {
    tbl.innerHTML = "";
  }

  for (i = 10; i > 0; i--) {
    let row = document.createElement("tr");
    let id = "idrow" + i;
    row.id = id;

    //row.id = "idr" + i.toString(8);
    if (i % 2 != 0) {
      for (k = 0; k < 10; k++) {
        let colno = i * 10 - 10 + k + 1;
        //document.write(colno + "\n");
        let col = document.createElement("td");
        id = "idcol" + colno;
        col.id = id;
        //col.id = "idc" + colno.toString(8);
        let span = document
          .createElement("span")
          .appendChild(document.createTextNode(colno + " "));
        col.appendChild(span);
        row.appendChild(col);
      }
    } else {
      for (k = 10; k > 0; k--) {
        let colno = i * 10 - 10 + k;
        //document.write(colno + "\n");
        let col = document.createElement("td");
        id = "idcol" + colno;
        col.id = id;
        //col.id = "idc" + colno.toString(8);
        let span = document
          .createElement("span")
          .appendChild(document.createTextNode(colno + " "));
        col.appendChild(span);
        row.appendChild(col);
      }
    }
    tbl.appendChild(row);
  }
  // after drawing table dra snake and lader
  drawLaderSnake();
}

// this function draw snake and ladder
function drawLaderSnake() {
  for (let i = 0; i < 100; i++) {
    let colid = "idcol" + i;
    if (snakeAry[i] != undefined && snakeAry[i] != null) {
      let ele = document.getElementById(colid);
      if (ele != undefined || ele != null) {
        snakeEle = document.createElement("img");
        snakeEle.src = snakeimg;
        snakeEle.height = 35;
        ele.appendChild(snakeEle);

        ele.appendChild(
          document
            .createElement("span")
            .appendChild(document.createTextNode("  ==> " + snakeAry[i]))
        );
        ele.className = "redbg";
      }
    } else if (laderAry[i] != undefined && laderAry[i] != null) {
      let ele = document.getElementById(colid);
      if (ele != undefined || ele != null) {
        laderEle = document.createElement("img");
        laderEle.src = ladderimg;
        laderEle.height = 35;

        ele.appendChild(document.createElement("span").appendChild(laderEle));

        ele.appendChild(
          document
            .createElement("span")
            .appendChild(document.createTextNode("  ==> " + laderAry[i]))
        );
        ele.className = "greenbg";
      }
    }
  }

  // draw cup and start

  colno = 1;
  let ele = document.getElementById("idcol" + colno);
  let img = document.createElement("img");
  img.src = startimg;
  img.height = 40;
  ele.appendChild(document.createElement("span").appendChild(img));

  // cup for 100
  colno = 100;
  ele = document.getElementById("idcol" + colno);
  img = document.createElement("img");
  img.src = cupimg;
  img.height = 40;
  ele.appendChild(document.createElement("span").appendChild(img));

  resetScore();
}

function resetScore() {
  let ele = document.getElementById("pname");
  if (ele != null) {
    ele.innerHTML = "";
  }

  // refresh first player information
  for (let i = 0; i < maxPlayer; i++) {
    let col = i + 1;
    let totscore = 0;
    ele = document.getElementById("playername" + col);
    if (ele != null) {
      ele.innerHTML = "";
    }
    ele = document.getElementById("ipdice" + col);
    if (ele != null) {
      ele.value = 0;
    }

    ele = document.getElementById("ipprevval" + col);
    if (ele != null) {
      ele.value = 0;
    }

    ele = document.getElementById("ipcurvval" + col);
    if (ele != null) {
      ele.value = 0;
    }
    ele = document.getElementById("ipcount" + col);
    if (ele != null) {
      ele.value = 0;
    }

    // draw the person picture
  }

  // reset first player name
  // set first player name
  ele = document.getElementById("npname");
  if (ele != null) {
    ele.classList.remove("blue", "red", "green");
    ele.innerHTML = "";
    ele.appendChild(
      document.createTextNode(playerArray[findPlayer(0) - 1].name)
    );
    ele.classList.add(playerArray[findPlayer(0) - 1].color);
  }
}

function resetPlayer() {
  for (let i = 0; i < maxPlayer; i++) {
    playerArray[i].diceValue = 0;
    playerArray[i].prevScore = 0;
    playerArray[i].totalScore = 0;
    playerArray[i].dicecount = 0;
  }
}

function toggleDice(value) {
  document.getElementById("rollbtn").disabled = value;
}

function refreshScore() {
  // playr name in the top
  let ele = document.getElementById("pname");

  if (ele != null) {
    ele.classList.remove("blue", "red", "green");
    ele.classList.add(playerArray[currentPlayr - 1].color);
    ele.innerHTML = "";
    ele.appendChild(
      document.createTextNode(playerArray[currentPlayr - 1].name)
    );
  }

  ele = document.getElementById("npname");

  if (ele != null) {
    ele.classList.remove("blue", "red", "gren");
    ele.classList.add(playerArray[findPlayer(1) - 1].color);
    ele.innerHTML = "";
    ele.appendChild(
      document.createTextNode(playerArray[findPlayer(1) - 1].name)
    );
  }

  // refresh first player information
  for (let i = 0; i < maxPlayer; i++) {
    let col = i + 1;
    let totscore = 0;
    ele = document.getElementById("playername" + col);
    if (ele != null) {
      ele.innerHTML = "";
      ele.appendChild(document.createTextNode(playerArray[i].name));
    }
    ele = document.getElementById("ipdice" + col);
    if (ele != null) {
      ele.value = playerArray[i].diceValue;
    }

    ele = document.getElementById("ipprevval" + col);
    if (ele != null) {
      ele.value = playerArray[i].prevScore;
    }

    ele = document.getElementById("ipcurvval" + col);
    if (ele != null) {
      ele.value = playerArray[i].totalScore;
      totscore = playerArray[i].totalScore;
    }
    ele = document.getElementById("ipcount" + col);
    if (ele != null) {
      ele.value = playerArray[i].diceCount;
    }

    // draw the person picture
    if (totscore != 0) {
      ele = document.getElementById("idcol" + totscore);
      if (ele != null) {
        if (playerArray[i].imageEle != null) {
          ele.appendChild(
            document.createElement("span").appendChild(playerArray[i].imageEle)
          );
        }
      }
    }
  }
}

/* Call this when the restart button cliked
   This will reset the sgame
*/

function restartGame() {
  initAll();
  resetPlayer();
  toggleDice(false);
}

function randomVal() {
  let val = Math.floor(Math.random() * 6) + 1;
  //alert(val);
  return val;
}

function blinkValue(colno, music) {
  let ele = document.getElementById("idcol" + colno);
  if (ele != null) {
    ele.classList.add("blinking");
  }
  if (music != null) {
    let x = document.getElementById(music);
    if (x != null) {
      if (music != "winner") {
        x.volume = 0.2;
      }
      x.play();
    }
  }
}

function checkSnakeLAder(score) {
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

function SetScore(value) {
  let plyr = currentPlayr - 1;
  playerArray[plyr].diceValue = value;
  playerArray[plyr].diceCount++;
  let prevVal = playerArray[plyr].totalScore;
  let total = prevVal + value;
  if (total <= maxvalue) {
    playerArray[plyr].prevScore = prevVal;
    playerArray[plyr].totalScore = checkSnakeLAder(total);
    // if lader or snake  yhen set prev value
    if (playerArray[plyr].totalScore != total) {
      playerArray[plyr].prevScore = total;
    }
  }

  refreshScore();

  // if win
  if (total == maxvalue) {
    toggleDice(true);
    blinkValue(maxvalue, "winner");
    status = "W";
    alert(playerArray[plyr].name + ", You Win !!!!!");
  }
}

function incPlayer() {
  currentPlayr++;
  if (currentPlayr > maxPlayer) {
    currentPlayr = 1;
  }
  // set background color for button of different player
  let ele = document.getElementById("rollbtn");
  ele.classList.remove("bluebtn", "redbtn", "greybtn", "greenbtn");
  if (playerArray[currentPlayr - 1].roboplayer != true) {
    ele.classList.add(playerArray[currentPlayr - 1].color + "btn");
  } else {
    ele.classList.add("greybtn");
  }
}

function findPlayer(num) {
  let no = currentPlayr + num;
  if (no > maxPlayer) {
    no = 1;
  } else if (no < 1) {
    no = maxPlayer;
  }
  return no;
}

function setNextPlayer() {
  // if the game is closed do not go furtger till thye reset the game
  if (status != "B") {
    return;
  }

  incPlayer();
  // if current playr auto execute it
  if (playerArray[currentPlayr - 1].roboplayer == true) {
    toggleDice(true);
    setTimeout(function () {
      rollDice();
      incPlayer();
      toggleDice(false);
    }, 3000);
  }
}

function rollDice() {
  // if the game is closed do not go furtger till thye reset the game
  if (status != "B") {
    return;
  }
  initAll();
  let dice = randomVal();
  SetScore(dice);
}
