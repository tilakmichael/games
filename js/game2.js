var tableAry = new Array(100);
var snakeAry = new Array(100);
var laderAry = new Array(100);
var scoreArray = new Array(2);
var noPlayer = 1;
var currentPlayr = 1;
var playerimg = "../images/tilak.jpg";

function randiomVal() {
  let val = Math.floor(Math.random() * 6) + 1;
  //alert(val);
  return val;
}

function initvar() {
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
  setColsColor();
}

function setColsColor() {
  for (let i = 0; i < 100; i++) {
    if (snakeAry[i] != undefined && snakeAry[i] != null) {
      let colid = "idc" + i.toString(8);
      let ele = document.getElementById(colid);
      if (ele != undefined || ele != null) {
        ele.appendChild(
          document
            .createElement("span")
            .appendChild(document.createTextNode(" ==> " + snakeAry[i]))
        );
        ele.className = "redcol";
      }
    } else if (laderAry[i] != undefined && laderAry[i] != null) {
      let ele = document.getElementById("idc" + i.toString(8));
      if (ele != undefined || ele != null) {
        ele.appendChild(
          document
            .createElement("span")
            .appendChild(document.createTextNode(" ==> " + laderAry[i]))
        );
        ele.className = "greencol";
      }
    }
  }
}

function disableDice() {
  let ele = document.getElementById("rollbtn");
  ele.disabled = true;
}

function initScore() {
  for (let i = 0; i < scoreArray.length; i++) {
    scoreArray[i] = 0;
  }
  // enable the roll dice
  let ele = document.getElementById("rollbtn");
  ele.disabled = false;
}

function loadTable() {
  let maxcol = 100;

  let tbl = document.getElementById("g2tbdy");
  //   Delete if there is any child
  if (tbl.hasChildNodes()) {
    tbl.innerHTML = "";
  }

  for (i = 10; i > 0; i--) {
    let row = document.createElement("tr");
    row.id = "idr" + i.toString(8);
    if (i % 2 != 0) {
      for (k = 0; k < 10; k++) {
        let colno = i * 10 - 10 + k + 1;
        //document.write(colno + "\n");
        let col = document.createElement("td");
        col.id = "idc" + colno.toString(8);
        let span = document
          .createElement("span")
          .appendChild(document.createTextNode(colno));
        col.appendChild(span);
        row.appendChild(col);
      }
    } else {
      for (k = 10; k > 0; k--) {
        let colno = i * 10 - 10 + k;
        //document.write(colno + "\n");
        let col = document.createElement("td");
        col.id = "idc" + colno.toString(8);
        let span = document
          .createElement("span")
          .appendChild(document.createTextNode(colno));
        col.appendChild(span);
        row.appendChild(col);
      }
    }
    tbl.appendChild(row);
  }

  // set cup and statt image to column 100 and 1
  colno = 1;
  let ele = document.getElementById("idc" + colno.toString(8));
  let img = document.createElement("img");
  img.src = "../images/start.jpeg";
  img.height = 40;
  ele.appendChild(document.createElement("span").appendChild(img));

  // cup for 100
  colno = 100;
  ele = document.getElementById("idc" + colno.toString(8));
  img = document.createElement("img");
  img.src = "../images/cup.jpeg";
  img.height = 40;
  ele.appendChild(document.createElement("span").appendChild(img));
}

function setScoreDisplay(score, totalScore, prevScore) {
  let ele;
  if (score != -1) {
    ele = document.getElementById("dicescore");
    ele.value = score;
  }
  if (prevScore != -1) {
    ele = document.getElementById("prevscore");
    ele.value = prevScore;
  }
  if (totalScore != -1) {
    ele = document.getElementById("totalscore");
    ele.value = totalScore;
    // set imge of player
    ele = document.getElementById("idc" + totalScore.toString(8));
    let img = document.createElement("img");
    img.src = playerimg;
    img.height = 40;
    ele.appendChild(document.createElement("span").appendChild(img));
  }
}

function blinkValue(colno, music) {
  let ele = document.getElementById("idc" + colno.toString(8));
  if (ele != null) {
    ele.classList.add("blinking");
  }
  let x = document.getElementById(music);
  x.play();
}

function chekLaderSnake(score) {
  let num = score;
  if (snakeAry[num] != undefined && snakeAry[num] != null) {
    num = snakeAry[num];
    blinkValue(score, "myAudioSnake");
  } else if (laderAry[num] != undefined && laderAry[num] != null) {
    num = laderAry[num];
    blinkValue(score, "myAudioLadder");
  }
  return num;
}

function setplayerScore(score) {
  let plyrscore = scoreArray[currentPlayr - 1];
  let totalscore = plyrscore + score;
  let prevScore = plyrscore;
  if (plyrscore + score <= 100) {
    refreshTable();
    totalscore = chekLaderSnake(totalscore);
    // in casw there is snake or ladder then change the previous score
    if (totalscore != plyrscore + score) {
      prevScore = plyrscore + score;
    }
    scoreArray[currentPlayr - 1] = totalscore;
    setScoreDisplay(score, totalscore, prevScore);
    if (plyrscore + score == 100) {
      alert("You Win");
      disableDice();
      //resetGame();
    }
  } else {
    // whne the total cross 100 only display diced value
    setScoreDisplay(score, -1, -1);
  }
}

function diceRoll() {
  let score = randiomVal();

  setplayerScore(score);
}

function refreshTable() {
  loadTable();
  setColsColor();
}

function resetGame() {
  refreshTable();
  initScore();
  setScoreDisplay(0, 0, 0);
}

window.onload = function () {
  initvar();
  resetGame();
};
