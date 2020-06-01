var g1wincount = 0;
var g1lostcount = 0;
var g1drawcount = 0;
var g1gamecount = 0;
var g1maxCount = 10;

function resetcounts() {
  g1wincount = 0;
  g1lostcount = 0;
  g1drawcount = 0;
  g1gamecount = 0;
  setScore();
  togglestartButton(true);

  let ele = document.getElementById("result1");
  ele.innerHTML = "";

  ele = document.getElementById("pcgame1");
  ele.innerHTML = "";
}

function setScore() {
  let ele = document.getElementById("winscore");
  if (ele != null) {
    ele.value = g1wincount;
  }
  ele = document.getElementById("lostscore");
  if (ele != null) {
    ele.value = g1lostcount;
  }

  ele = document.getElementById("drawcore");
  if (ele != null) {
    ele.value = g1drawcount;
  }
}

function incWin() {
  g1wincount++;
  g1gamecount++;
  setScore();
}

function incLost() {
  g1lostcount++;
  g1gamecount++;
  setScore();
}

function incDraw() {
  g1drawcount++;
  g1gamecount++;
  setScore();
}

function clickMe() {
  alert("You cliked Me");
  let mdiv = document.getElementById("myResult");
  let h3 = document.createElement("h3");
  h3.appendChild(document.createTextNode("You cliked Me"));

  mdiv.appendChild(h3);
}

/*
     this assign value to a h3 tag
  */
function clickMe2() {
  let h3 = document.getElementById("myclickh3");
  h3.innerHTML = "You clicked me 2";
}

/*
    calcualtes
  */
function calNoDays() {
  //alert("in calcnoday");
  let age = document.getElementById("_age").value;
  if (age != 0 && age != null) {
    let nodays = age * 356;
    //alert(nodays);
    document.getElementById("_nodays").value = nodays;
  }
  return true;
}

function calcRange() {
  //alert("i am in");
  let value = document.getElementById("_range").value;
  document.getElementById("_rangevalue").innerHTML = value;
}
function randiomVal() {
  let val = Math.floor(Math.random() * 3) + 1;
  //alert(val);
  return val;
}

function togglestartButton(value) {
  let ele = document.getElementById("startbtn");
  if (ele != null) {
    ele.disabled = value;
  }
}

function switchRadio(value) {
  let ele = document.getElementsByName("mygame");
  for (let i = 0; i < ele.length; i++) {
    ele[i].disabled = value;
  }
}

function resetGame() {
  switchRadio(false);
}

function determineResult(player, pc) {
  let result = 1;
  let msg = "You Win";
  let clas = "winner";
  if (pc == player) {
    result = -1;
    msg = "You Draw ";
    clas = "none";
    incDraw();
  } else {
    if (player == "R" && pc == "P") {
      result = 0;
    } else if (player == "S" && pc == "R") {
      result = 0;
    } else if (player == "P" && pc == "S") {
      result = 0;
    }
    if (result == 0) {
      msg = "You Lose";
      clas = "loser";
      incLost();
    } else if (result == 1) {
      incWin();
    }
  }
  let h3 = document.createElement("h3");
  h3.className = clas;

  h3.appendChild(document.createTextNode(msg));
  let ele = document.getElementById("result1");
  ele.innerHTML = "";
  ele.appendChild(h3);

  switchRadio(true);
}

function playgame(playerSelection) {
  //alert(playerSelection);
  let random = randiomVal();
  let retvalue = "R";
  let image = "../images/rock.jpeg";

  switch (random) {
    case 1:
      retvalue = "S";
      image = "../images/scissors.jpeg";
      break;
    case 2:
      retvalue = "P";
      image = "../images/paper.jpeg";
      break;
    default:
      retvalue = "R";
      break;
  }
  let img = document.createElement("img");
  img.src = image;
  img.height = "80";
  let ele = document.getElementById("pcgame1");
  ele.innerHTML = "";
  ele.appendChild(img);
  determineResult(playerSelection, retvalue);
}
function getRadioValue(ele) {
  let value;
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      value = ele[i].value;
      ele[i].checked = false;
    }
  }
  return value;
}

function radioHandle() {
  let radioEle = document.getElementsByName("mygame");
  let value = getRadioValue(radioEle);
  if (value != undefined) {
    playgame(value);
  }

  setTimeout(() => {}, 1000);
  resetGame();
  if (g1maxCount == g1gamecount) {
    togglestartButton(false);
    switchRadio(true);
    alert("game Over !!!");
  }
}

function StartGame() {
  resetcounts();
  resetGame();
}
