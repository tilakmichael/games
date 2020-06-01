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

// Globals
var gQaTime = false;
var gMaxPlayer = 2;
var isAutoPlayer = false;

var gStatus = "B";
var tableAry = new Array(100);
var snakeAry = new Array(100);
var laderAry = new Array(100);
var currentPlayr = 1;
var gPlayer = {
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

window.onload = function () {
  getUserPref();
};

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
  for (let i = 0; i < gMaxPlayer; i++) {
    let div = document.createElement("div");
    let h5 = document.createElement("h5");
    h5.appendChild(
      document.createTextNode("Player " + (i + 1) + " Information:")
    );
    div.appendChild(h5);
    let inplable = document.createElement("label");
    inplable.appendChild(document.createTextNode("Enter Player Name: "));
    inplable.for = "idipqa" + i;

    let input = document.createElement("input");
    input.required = true;
    input.id = "idipqa" + i;
    div.appendChild(inplable).appendChild(input);
    // break
    let br = document.createElement("br");
    div.appendChild(br);
    // color of player
    let color = document.createElement("select");
    color.name = "namecolorqa" + i;
    color.id = "idcolorqa" + i;
    color.required = true;
    let label = document.createElement("label");
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
        let span = document
          .createElement("span")
          .appendChild(document.createTextNode(colno + " "));
        col.appendChild(span);
        row.appendChild(col);
      }
    } else {
    }

    tbl.appendChild(row);
  }
}

// when the qa form submit
// collect values ffrom usr enty
function qaFormSubmit() {
  //alert("Qa form submitted");
  playerArray = new Array();
  let verified = true;
  for (let i = 0; i < gMaxPlayer; i++) {
    let name = null;
    let color = null;
    let image = null;
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
    if (i == 0) {
      name = "You";
      color = "red";
    } else {
      if (isAutoPlayer) {
        name = "Robo";
      } else {
        name = "Me";
      }
      color = "blue";
    }
    image = playerimageAray[i];

    let player = Object.create(gPlayer);
    player.name = name;
    player.image = playerimageAray[+image];
    player.imageEle = document.createElement("img");
    player.imageEle.src = player.image;
    player.imageEle.height = 50;
    player.color = color;
    playerArray.push(player);
  }
}

// this function reset the game
function resetGame() {
  alert("Rest game czlled");
}
