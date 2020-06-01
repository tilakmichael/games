// console.log("welcome to new World");
//alert("Welcome");

// var name = "Tlak";
// var age  = 16 ;
// alert(name + " is " + age + " Years Old");

// var name = prompt("What is Your Name? :");
// var age = prompt("What is Your Age? :");
// alert(name + " is " + age + " Years Old");
/*
   iinsert into a html Tag
*/

// var obj = document.getElementById("mydoc");
// // alert(obj);
// obj.innerHTML = name + " is " + age + " Years Old";

// document.getElementById("mydoc").innerHTML = name + " is " + age + " Years Old";

var num1 = 10;
// alert((num1 += 20));
// alert((num1 = +20));

// alert(num1);

// function myAlert() {
//   alert("Iam in my alert");
// }

// myAlert();

// function findDay(day) {
//   switch (day) {
//     case 0:
//       alert("Today is Sunday");
//       break;
//     case 1:
//       alert("Today is Monday");
//       break;
//     case 2:
//       alert("Today is Tuesday");
//       break;
//     case 3:
//       alert("today is Wedesday");
//       break;
//     case 4:
//       alert("today is Thursday");
//       break;
//     case 5:
//       alert("today is Friday");
//       break;
//     case 6:
//       alert("today is Saturday");
//       break;
//     default:
//       alert("today is Unknow");
//       break;
//   }
// }
// var days = prompt("enter today day?");
// findDay(+days);

// function findSal(sal) {
//   switch (true) {
//     case sal < 3000:
//       alert("You need to work hard and improve your skills");
//     break;
//     case sal <= 5000:
//       alert("not bad still you can improve");
//     //break;
//     case sal <= 10000:
//       alert("good keep it up");
//     //break;
//     default:
//       alert("Great");
//     //break;
//   }
// }

// var sal = prompt("enter salary?");
// findSal(+sal);
/*
 This function displya the value to h3 tab is mydoc
*/
function displayh3(value) {
  document.getElementById("mydoc").innerHTML = value;
}
/*
  this function accpets two value 
  and return added value
*/
function addNum(num1, num2) {
  var num3 = num1 + num2;
  return num3;
}

// var innum1 = prompt("Enter First Number?");
// var innum2 = prompt("Enter Second Number?");
// if (innum1 != null && innum1 != "") {
//   if (innum2 != null && innum2 != "") {
//     displayh3(addNum(+innum1, +innum2));
//   } else {
//     displayh3(innum1);
//   }
// } else if (innum2 != null && innum2 != "") {
//   displayh3(innum2);
// } else {
//   displayh3("You are cheating me !");
// }

// var num = 1;
// while (num <= 50) {
//   num++;
// }

// for (var i = 0; i < 200; i++) {
//   console.log(i);
// }

// data type
// num

var num = 1.1;
// displayh3(num * 3);
// alert(typeof num);

var str = "Tilak";
// displayh3(str);

// alert(typeof str);
//alert(str.substr(2, 3));
// alert(str.substring(1, 3));
/*
  dealing with json file
*/
//var students = JSON.parse(../data/Saturday.json);

/*
  This function called on click 
  This create h3 element and add text to that 
  the apend into div nore from the page
*/
