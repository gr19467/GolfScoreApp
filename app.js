/*TODO
  1. css on tables
*/

let courses = [
    {
      "id": 11819,
      "name": "Thanksgiving Point Golf Course - Lehi, UT",
      "url": "thanksgivingPoint"
    },
    {
      "id": 18300,
      "name": "Fox Hollow Golf Course - American Fork, UT",
      "url": "foxHollow"
    },
    {
      "id": 19002,
      "name": "Spanish Oaks Golf Course - Spanish Fork, UT",
      "url": "spanishOaks"
    }
];

let holes;
let tee;

//loading functions
function homeLoad(){
  let courseOptionsHtml = '';
  courses.forEach((course) => {
    courseOptionsHtml += `<option onclick="courseSelected(${course.id})" value="${course.id}">${course.name}</option>`;
  });
  document.getElementById("course-select").innerHTML = courseOptionsHtml;
}

function gameLoad(){
  let course;
  let teeBoxes = getTeeBoxes();

  function getTeeBoxes() {
    let courseTeeBoxes;
    let courseId = localStorage.getItem("id");

    coursesInfo.forEach(courses => {
      courses.thanksgivingPoint.forEach(element => {
        if(element.id === courseId){
          course = element.name;
          holes = element.holes;
          holes.forEach(hole => {
            courseTeeBoxes = hole.teeBoxes;
            return courseTeeBoxes;
          });
        }
      });

      courses.foxHollow.forEach(element => {
        if(element.id === courseId){
          course = element.name;
          holes = element.holes;
          holes.forEach(hole => {
            courseTeeBoxes = hole.teeBoxes;
            return courseTeeBoxes;
          });
        }
      });

      courses.spanishOaks.forEach(element => {
        if(element.id === courseId){
          course = element.name;
          holes = element.holes;
          holes.forEach(hole => {
            courseTeeBoxes = hole.teeBoxes;
            return courseTeeBoxes;
          });
        }
      });
    });
    return courseTeeBoxes;
  }  

  let teeBoxSelectHtml = ''
  teeBoxes.forEach(function (teeBox, index) {
    teeBoxSelectHtml += `<option onclick='teeSelected(${JSON.stringify(teeBox.teeType.toUpperCase())},${JSON.stringify(teeBox.yards)}, ${JSON.stringify(teeBox.teeTypeId)})' value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.yards} yards</option>`
  });

  document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;

  //add the name of the course to the top of the screen
  let header = document.getElementById("header");
  header.textContent = course;
}

//dropdown functions
function courseDropdown(){
  dropdown = document.getElementById("course-select");
  dropdown.style.display = "block";
}

function teeDropdown(){
  dropdown = document.getElementById("tee-box-select");
  dropdown.style.display = "block";
}

function playerDropdown(){
  dropdown = document.getElementById("player-select");
  dropdown.style.display = "block";
}

//selection functions
function courseSelected(id){
  let courseName;
  localStorage.setItem("id", JSON.stringify(id));

  //identify the course that was selected
  courses.forEach(course => {
    if(course.id === id){
      courseName = course.name;
    }
  });

  //hide the dropdown
  dropdown = document.getElementById("course-select");
  dropdown.style.display = "none";

  //change the selection box to say the course they selected
  selection = document.getElementById("selected");
  selection.textContent = courseName;

  //make the go button visible
  document.getElementById("goButton").style.display = "flex";
}

function teeSelected(teeType, teeYards, teeId){
  tee = teeId - 1;
  let teeName = teeType + ", " + teeYards + " yards";
  selection = document.getElementById("selected");
  selection.textContent = teeName;

  let dropdown = document.getElementById("tee-box-select");
  dropdown.style.display = "none";

  let playerSelect = document.getElementById("player-select-row");
  playerSelect.style.display = "block";

  let arrow = document.getElementById("teeArrow");
  arrow.style.display = "none";
}

function playerSelected(num){
  selection = document.getElementById("player-selected");
  selection.textContent = num;

  dropdown = document.getElementById("player-select");
  dropdown.style.display = "none";

  scorecards = document.getElementById("scorecard-container");
  scorecards.style.display = "block";

  let arrow = document.getElementById("playerArrow");
  arrow.style.display = "none";

  document.getElementById("totals-container").style.display = "flex";

  //build the table
  buildTable(num);

  //build the score outputs
  buildScores(num);
}

//build the table
function buildTable(playerNum){
  let yardageOut = document.getElementById("yardageOut").getElementsByTagName("td");
  let parOut = document.getElementById("parOut").getElementsByTagName("td");
  let handicapOut = document.getElementById("handicapOut").getElementsByTagName("td");
  let yardageIn = document.getElementById("yardageIn").getElementsByTagName("td");
  let parIn = document.getElementById("parIn").getElementsByTagName("td");
  let handicapIn = document.getElementById("handicapIn").getElementsByTagName("td");

  for (let i = 0; i < 9; i++) {
    yardageOut[i].textContent = holes[i].teeBoxes[tee].yards;
    parOut[i].textContent = holes[i].teeBoxes[tee].par;
    handicapOut[i].textContent = holes[i].teeBoxes[tee].hcp;
  }

  for (let i = 9; i < 18; i++) {
    yardageIn[i - 9].textContent = holes[i].teeBoxes[tee].yards;
    parIn[i - 9].textContent = holes[i].teeBoxes[tee].par;
    handicapIn[i - 9].textContent = holes[i].teeBoxes[tee].hcp;
  }

  //append a row for each player needed
  let tbodies = document.getElementsByTagName("tbody");
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < playerNum; j++) {
      let player = document.createElement("tr");
      player.setAttribute("id", "player" + (j + 1));
        let th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.setAttribute("id", "player" + (j + 1) + "Name" + (i + 1));
        th.setAttribute("oninput", "changeName(" + (j + 1) + ")");
        
        th.textContent = "Player " + (j + 1);

      //append the th
      player.appendChild(th);

      //append 9 tds
      for (let k = 0; k < 9; k++) {
        let td = document.createElement("td");
        td.setAttribute("contenteditable", "true");
        td.setAttribute("oninput", "scoreInput(" + (i + 1) + "," + (k + 1) + "," + j + ")");
        td.setAttribute("id", "table" + (i + 1) + "Player" + (j + 1) + "Hole" + (k + 1));
        player.appendChild(td);
      }

      //append the player row to the tbody
      tbodies[i].appendChild(player);

      //add a new player to the player array
      players[j] = new Player("Player " + (j + 1), "player" + (j + 1));
    }
  }

  //make the names in the first table editable
  for (let i = 0; i < playerNum; i++) {
    let playerName = document.getElementById("player" + (i + 1) + "Name1");
    playerName.setAttribute("contenteditable", "true");
  }
}

//build the score outputs
function buildScores(num){
  for (let i = 1; i <= num; i++) {
    //make the player totals container
    let totalsContainer = document.createElement("div");
    totalsContainer.classList.add("player-totals-container");
      //make the h1
      let h1 = document.createElement("h1");
      h1.textContent = "Player " + i;
    totalsContainer.appendChild(h1);

      //make the player totals div
      let playerTotals = document.createElement("div");
      playerTotals.classList.add("playerTotals");
        //make the out div
        let outDiv = document.createElement("div");
        outDiv.classList.add("playerScore");
          //make the h2s
          let out = document.createElement("h2");
          out.textContent = "Out";
          outDiv.appendChild(out);

          let outScore = document.createElement("h2");
          outScore.textContent = "0";
          outScore.setAttribute("id", "player" + i + "Out");
          outDiv.appendChild(outScore);

        playerTotals.appendChild(outDiv);

        //make the in div
        let inDiv = document.createElement("div");
        inDiv.classList.add("playerScore");

          //make the h2s
          let inText = document.createElement("h2");
          inText.textContent = "In";
          inDiv.appendChild(inText);

          let inScore = document.createElement("h2");
          inScore.textContent = "0";
          inScore.setAttribute("id", "player" + i + "In");
          inDiv.appendChild(inScore);

        playerTotals.appendChild(inDiv);

        //make the total div
        let totalDiv = document.createElement("div");
        totalDiv.classList.add("playerScore");

          //make the h2s
          let totalText = document.createElement("h2");
          totalText.textContent = "Total";
          totalDiv.appendChild(totalText);

          let totalScore = document.createElement("h2");
          totalScore.textContent = "0";
          totalScore.setAttribute("id", "player" + i + "Total");
          totalDiv.appendChild(totalScore);

        playerTotals.appendChild(totalDiv);

      totalsContainer.appendChild(playerTotals);
    
    //append all that to the totals-container
    document.getElementById("totals-container").appendChild(totalsContainer);
  }
}

//name change
function changeName(num){
  //get the name input in the first table
  let playerName = document.getElementById("player" + num + "Name1").textContent;

  //change the name in the second table to that name
  document.getElementById("player" + num + "Name2").textContent = playerName;

  //update the player's name
  players[num - 1].name = playerName;
}

//score input
function scoreInput(table, num, player){
  let score = document.getElementById("table" + table + "Player" + (player + 1) + "Hole" + num).textContent;

  //change the num to the correct number if it's the second table
  if(table === 2){
    num += 9;
  }

  //update the player's score
  players[player].scores[num - 1] =  score;

  //update the player's score box
  let playerOut = document.getElementById("player" + (player + 1) + "Out");
  let playerIn = document.getElementById("player" + (player + 1) + "In");
  let playerTotal = document.getElementById("player" + (player + 1) + "Total");

  playerOut.textContent = players[player].calculateOut();
  playerIn.textContent = players[player].calculateIn();
  playerTotal.textContent = players[player].calculateTotal();

  //check if the game is over
  let scoresNeeded = players.length * 18;
  let currentScores = 0;
  players.forEach(player => {
    player.scores.forEach(score => {
      if(score > 0){
        currentScores++;
      }
    });
    if(scoresNeeded === currentScores){
      function temp(){
        toast();
      }
      
      setTimeout(temp, 500);
    }
  });
}

//toast
function toast(){
  //figure out the winner
  let winnerTotal = 0;
  let winnerName;
  let tieName;
  players.forEach(player => {
    if(player.calculateTotal() < winnerTotal || winnerTotal === 0){
      winnerTotal = player.calculateTotal();
      winnerName = player.name;
    }
    //check for a tie
    if(player.calculateTotal() === winnerTotal && player.name != winnerName){
      tieName = player.name;
    }else{
      tieName = "undefined";
    }
  });
  localStorage.setItem("winnerTotal", JSON.stringify(winnerTotal));
  localStorage.setItem("winnerName", JSON.stringify(winnerName));
  localStorage.setItem("tieName", JSON.stringify(tieName));

  window.location.href = "./winner.html";
}

//winner
function winner(){
  let tieName = localStorage.getItem("tieName");
  tieName = JSON.parse(tieName);
  winnerName = localStorage.getItem("winnerName");
  winnerName = JSON.parse(winnerName);
  winnerTotal = parseInt(localStorage.getItem("winnerTotal"));
  if(tieName != "undefined"){
    document.getElementById("congrats").textContent = "Congratulations, " + winnerName + " and " + tieName + "!";
    document.getElementById("score").textContent = "You both tied with a score of " + winnerTotal + "!";
  }else{
    document.getElementById("congrats").textContent = "Congratulations, " + winnerName + "!";
    document.getElementById("score").textContent = "You won with a score of " + winnerTotal + "!";
  }
  
  
}

//player class
class Player{
  constructor(name, id){
    this.name = name;
    this.id = id;
    this.scores = [
      this.score1 = 0,
      this.score2 = 0,
      this.score3 = 0,
      this.score4 = 0,
      this.score5 = 0,
      this.score5 = 0,
      this.score6 = 0,
      this.score7 = 0,
      this.score8 = 0,
      this.score9 = 0,
      this.score10 = 0,
      this.score11 = 0,
      this.score12 = 0,
      this.score13 = 0,
      this.score14 = 0,
      this.score15 = 0,
      this.score16 = 0,
      this.score17 = 0,
      this.score18 = 0
    ];
  }

  calculateOut(){
    let total = 0;
    for (let i = 0; i < 9; i++) {
      total += parseInt(this.scores[i]);
    }
    return total;
  }

  calculateIn(){
    let total = 0;
    for (let i = 9; i < 18; i++) {
      total += parseInt(this.scores[i]);
    }
    return total;
  }

  calculateTotal(){
    return this.calculateOut() + this.calculateIn();
  }
}

//player arrays
let players = [];

//course arrays
let coursesInfo = [
  {
"thanksgivingPoint" : [
  {
"id": "11819",
"includes": "holes,teeBoxes,basicStats,staff,golfPros,events,bestRounds,recentRounds,nearbyCourses,media,courseExtendedStatsForYear,globalExtendedStatsForYear",
"courseId": 11819,
"statusId": 1,
"status": "active",
"courseTypeId": 1,
"courseType": "public",
"practiceAreaId": 1379,
"measurementTypeId": 2,
"measurementType": "yards",
"mediaId": 186134,
"holeCount": 18,
"lat": 40.4295033232823,
"lng": -111.902993917466,
"popularityOneWeek": 1.92,
"popularityThreeMonth": 2.68,
"distanceFromMeKilometers": 0,
"distanceFromMeMiles": 0,
"localRankOneWeek": 16,
"localRankThreeMonth": 17,
"globalRankOneWeek": 1667,
"globalRankThreeMonth": 2106,
"localMaxRank": 45,
"globalMaxRank": 32179,
"name": "Thanksgiving Point",
"addr1": "599 N Frontage Rd",
"addr2": null,
"city": "Lehi",
"stateOrProvince": "UT",
"country": "United States",
"zipCode": "84043-3506",
"phone": "(801)768-4955",
"website": "http://www.thanksgivingpoint.org/visit/golf",
"courseDesigner": null,
"courseArchitect": null,
"accomodations": null,
"hours": null,
"fax": null,
"fees": null,
"description": null,
"thumbnail": "https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/10112953/uploaded-photo68921726-480x270.png",
"holes": [
  {
    "hole": 1,
    "courseHoleId": 24568,
    "courseId": 11819,
    "greenLat": 40.431459252532,
    "greenLng": -111.905075311661,
    "frontLat": 40.4314088237304,
    "frontLng": -111.904919072986,
    "backLat": 40.4315221353011,
    "backLng": -111.905196681619,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570474,
        "courseHoleId": 24568,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4295033232823,
        "lng": -111.902114152909,
        "par": 4,
        "yards": 363,
        "meters": 331,
        "hcp": 11,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570473,
        "courseHoleId": 24568,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4296911602932,
        "lng": -111.902199983597,
        "par": 4,
        "yards": 342,
        "meters": 312,
        "hcp": 11,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570472,
        "courseHoleId": 24568,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4299198307289,
        "lng": -111.902468204499,
        "par": 4,
        "yards": 305,
        "meters": 278,
        "hcp": 11,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570471,
        "courseHoleId": 24568,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4301566671461,
        "lng": -111.902704238892,
        "par": 4,
        "yards": 270,
        "meters": 246,
        "hcp": 11,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570475,
        "courseHoleId": 24568,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4295033232823,
        "lng": -111.902993917466,
        "par": 4,
        "yards": 306,
        "meters": 279,
        "hcp": 11,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 2,
    "courseHoleId": 24571,
    "courseId": 11819,
    "greenLat": 40.4353096943996,
    "greenLng": -111.908057928085,
    "frontLat": 40.4352031262569,
    "frontLng": -111.90797612071,
    "backLat": 40.4354256533608,
    "backLng": -111.908137053251,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570479,
        "courseHoleId": 24571,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4319288304179,
        "lng": -111.904184818267,
        "par": 5,
        "yards": 545,
        "meters": 498,
        "hcp": 7,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570478,
        "courseHoleId": 24571,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4320676615127,
        "lng": -111.904485225677,
        "par": 5,
        "yards": 515,
        "meters": 470,
        "hcp": 7,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570477,
        "courseHoleId": 24571,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4322228253383,
        "lng": -111.904731988906,
        "par": 5,
        "yards": 485,
        "meters": 443,
        "hcp": 7,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570476,
        "courseHoleId": 24571,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4323698223164,
        "lng": -111.904978752136,
        "par": 5,
        "yards": 457,
        "meters": 417,
        "hcp": 3,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570480,
        "courseHoleId": 24571,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4324106547533,
        "lng": -111.905504465103,
        "par": 5,
        "yards": 424,
        "meters": 387,
        "hcp": 7,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 3,
    "courseHoleId": 24573,
    "courseId": 11819,
    "greenLat": 40.4377145775069,
    "greenLng": -111.910911798477,
    "frontLat": 40.4376661948582,
    "frontLng": -111.910868212581,
    "backLat": 40.4377764336972,
    "backLng": -111.910964772105,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570484,
        "courseHoleId": 24573,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4358282418343,
        "lng": -111.908723115921,
        "par": 4,
        "yards": 306,
        "meters": 279,
        "hcp": 13,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570483,
        "courseHoleId": 24573,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4359507327704,
        "lng": -111.908894777298,
        "par": 4,
        "yards": 284,
        "meters": 259,
        "hcp": 13,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570482,
        "courseHoleId": 24573,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4360242272249,
        "lng": -111.909077167511,
        "par": 4,
        "yards": 266,
        "meters": 243,
        "hcp": 13,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570481,
        "courseHoleId": 24573,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4361058876357,
        "lng": -111.909334659577,
        "par": 4,
        "yards": 243,
        "meters": 222,
        "hcp": 13,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570485,
        "courseHoleId": 24573,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.436228378066,
        "lng": -111.90957069397,
        "par": 4,
        "yards": 218,
        "meters": 199,
        "hcp": 13,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 4,
    "courseHoleId": 24575,
    "courseId": 11819,
    "greenLat": 40.4380851015095,
    "greenLng": -111.91319167614,
    "frontLat": 40.4379999730102,
    "frontLng": -111.913052871823,
    "backLat": 40.4381755376116,
    "backLng": -111.913355961442,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570489,
        "courseHoleId": 24575,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4377431579434,
        "lng": -111.911410689354,
        "par": 3,
        "yards": 169,
        "meters": 154,
        "hcp": 17,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570488,
        "courseHoleId": 24575,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4376737482908,
        "lng": -111.911534070969,
        "par": 3,
        "yards": 160,
        "meters": 146,
        "hcp": 17,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570487,
        "courseHoleId": 24575,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4375553434239,
        "lng": -111.9117218256,
        "par": 3,
        "yards": 149,
        "meters": 136,
        "hcp": 17,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570486,
        "courseHoleId": 24575,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4375675922129,
        "lng": -111.911898851395,
        "par": 3,
        "yards": 134,
        "meters": 122,
        "hcp": 15,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570490,
        "courseHoleId": 24575,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.437926889031,
        "lng": -111.911598443985,
        "par": 3,
        "yards": 148,
        "meters": 135,
        "hcp": 17,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 5,
    "courseHoleId": 24578,
    "courseId": 11819,
    "greenLat": 40.4323249066072,
    "greenLng": -111.914125084877,
    "frontLat": 40.4325153898157,
    "frontLng": -111.914113685489,
    "backLat": 40.4322122088524,
    "backLng": -111.914128437638,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570494,
        "courseHoleId": 24578,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4370408922706,
        "lng": -111.913883686066,
        "par": 5,
        "yards": 574,
        "meters": 524,
        "hcp": 5,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570493,
        "courseHoleId": 24578,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4367673333082,
        "lng": -111.913669109344,
        "par": 5,
        "yards": 542,
        "meters": 495,
        "hcp": 5,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570492,
        "courseHoleId": 24578,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4365550181224,
        "lng": -111.913416981697,
        "par": 5,
        "yards": 518,
        "meters": 473,
        "hcp": 5,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570491,
        "courseHoleId": 24578,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4363794492893,
        "lng": -111.91332578659,
        "par": 5,
        "yards": 498,
        "meters": 455,
        "hcp": 1,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570495,
        "courseHoleId": 24578,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4365876820408,
        "lng": -111.912783980369,
        "par": 5,
        "yards": 532,
        "meters": 486,
        "hcp": 5,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 6,
    "courseHoleId": 24581,
    "courseId": 11819,
    "greenLat": 40.4287764707753,
    "greenLng": -111.90845489502,
    "frontLat": 40.428867940262,
    "frontLng": -111.908611804247,
    "backLat": 40.4286903096235,
    "backLng": -111.908297985792,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570499,
        "courseHoleId": 24581,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4316430007909,
        "lng": -111.911700367928,
        "par": 4,
        "yards": 460,
        "meters": 420,
        "hcp": 1,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570498,
        "courseHoleId": 24581,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4314878356275,
        "lng": -111.911399960518,
        "par": 4,
        "yards": 427,
        "meters": 390,
        "hcp": 1,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570497,
        "courseHoleId": 24581,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4313612532553,
        "lng": -111.911104917526,
        "par": 4,
        "yards": 398,
        "meters": 363,
        "hcp": 1,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570496,
        "courseHoleId": 24581,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4312387539586,
        "lng": -111.910836696625,
        "par": 4,
        "yards": 371,
        "meters": 339,
        "hcp": 5,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570500,
        "courseHoleId": 24581,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4314510859311,
        "lng": -111.910772323609,
        "par": 4,
        "yards": 389,
        "meters": 355,
        "hcp": 1,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 7,
    "courseHoleId": 24584,
    "courseId": 11819,
    "greenLat": 40.4280618609334,
    "greenLng": -111.905547380447,
    "frontLat": 40.4281002458587,
    "frontLng": -111.905704960227,
    "backLat": 40.4280349097602,
    "backLng": -111.905432716012,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570504,
        "courseHoleId": 24584,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4278433929805,
        "lng": -111.907698512077,
        "par": 3,
        "yards": 200,
        "meters": 182,
        "hcp": 15,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570503,
        "courseHoleId": 24584,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4280087753279,
        "lng": -111.907626092434,
        "par": 3,
        "yards": 192,
        "meters": 175,
        "hcp": 15,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570502,
        "courseHoleId": 24584,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4281639485186,
        "lng": -111.90752953291,
        "par": 3,
        "yards": 183,
        "meters": 167,
        "hcp": 15,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570501,
        "courseHoleId": 24584,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4283272883325,
        "lng": -111.907470524311,
        "par": 3,
        "yards": 180,
        "meters": 164,
        "hcp": 17,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570505,
        "courseHoleId": 24584,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.428004691818,
        "lng": -111.90774679184,
        "par": 3,
        "yards": 203,
        "meters": 185,
        "hcp": 15,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 8,
    "courseHoleId": 24586,
    "courseId": 11819,
    "greenLat": 40.4318226652697,
    "greenLng": -111.906754374504,
    "frontLat": 40.4317058833882,
    "frontLng": -111.906776502728,
    "backLat": 40.4319120889769,
    "backLng": -111.906737610698,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570509,
        "courseHoleId": 24586,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4288499730713,
        "lng": -111.90782725811,
        "par": 4,
        "yards": 375,
        "meters": 342,
        "hcp": 9,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570508,
        "courseHoleId": 24586,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4290255615642,
        "lng": -111.907585859299,
        "par": 4,
        "yards": 348,
        "meters": 318,
        "hcp": 9,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570507,
        "courseHoleId": 24586,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4292276919361,
        "lng": -111.907357871533,
        "par": 4,
        "yards": 320,
        "meters": 292,
        "hcp": 9,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570506,
        "courseHoleId": 24586,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4294379885468,
        "lng": -111.907323002816,
        "par": 4,
        "yards": 294,
        "meters": 268,
        "hcp": 9,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570510,
        "courseHoleId": 24586,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4291051887529,
        "lng": -111.907478570938,
        "par": 4,
        "yards": 336,
        "meters": 307,
        "hcp": 9,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 9,
    "courseHoleId": 24588,
    "courseId": 11819,
    "greenLat": 40.4293685703208,
    "greenLng": -111.902741789818,
    "frontLat": 40.4294141004934,
    "frontLng": -111.902860477567,
    "backLat": 40.429336515385,
    "backLng": -111.902671381831,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570514,
        "courseHoleId": 24588,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4319778296606,
        "lng": -111.906185746193,
        "par": 4,
        "yards": 449,
        "meters": 410,
        "hcp": 3,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570513,
        "courseHoleId": 24588,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4317695826328,
        "lng": -111.906051635742,
        "par": 4,
        "yards": 423,
        "meters": 386,
        "hcp": 3,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570512,
        "courseHoleId": 24588,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4314755857309,
        "lng": -111.905933618545,
        "par": 4,
        "yards": 391,
        "meters": 357,
        "hcp": 3,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570511,
        "courseHoleId": 24588,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4311775042265,
        "lng": -111.905654668808,
        "par": 4,
        "yards": 347,
        "meters": 317,
        "hcp": 3,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570515,
        "courseHoleId": 24588,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.431740999657,
        "lng": -111.905938982963,
        "par": 4,
        "yards": 413,
        "meters": 377,
        "hcp": 3,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 10,
    "courseHoleId": 24590,
    "courseId": 11819,
    "greenLat": 40.425358525299,
    "greenLng": -111.901105642319,
    "frontLat": 40.4254949197351,
    "frontLng": -111.901173368096,
    "backLat": 40.4252345857561,
    "backLng": -111.901052668691,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570519,
        "courseHoleId": 24590,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4285008364501,
        "lng": -111.902996599674,
        "par": 4,
        "yards": 419,
        "meters": 383,
        "hcp": 14,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570518,
        "courseHoleId": 24590,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4282864534162,
        "lng": -111.902865171432,
        "par": 4,
        "yards": 391,
        "meters": 357,
        "hcp": 14,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570517,
        "courseHoleId": 24590,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4280087753279,
        "lng": -111.902623772621,
        "par": 4,
        "yards": 351,
        "meters": 320,
        "hcp": 14,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570516,
        "courseHoleId": 24590,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.427861768817,
        "lng": -111.902403831481,
        "par": 4,
        "yards": 326,
        "meters": 298,
        "hcp": 14,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570520,
        "courseHoleId": 24590,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4281761990184,
        "lng": -111.902776658534,
        "par": 4,
        "yards": 376,
        "meters": 343,
        "hcp": 14,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 11,
    "courseHoleId": 24592,
    "courseId": 11819,
    "greenLat": 40.4221854383726,
    "greenLng": -111.894316971302,
    "frontLat": 40.4223146924962,
    "frontLng": -111.894420906901,
    "backLat": 40.4220533252408,
    "backLng": -111.894219741225,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570524,
        "courseHoleId": 24592,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.425527997417,
        "lng": -111.899389028549,
        "par": 5,
        "yards": 621,
        "meters": 567,
        "hcp": 6,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570523,
        "courseHoleId": 24592,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4255667921791,
        "lng": -111.898962557316,
        "par": 5,
        "yards": 594,
        "meters": 543,
        "hcp": 6,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570522,
        "courseHoleId": 24592,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4256464234629,
        "lng": -111.898667514324,
        "par": 5,
        "yards": 582,
        "meters": 532,
        "hcp": 6,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570521,
        "courseHoleId": 24592,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4254994117885,
        "lng": -111.898069381714,
        "par": 5,
        "yards": 532,
        "meters": 486,
        "hcp": 2,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570525,
        "courseHoleId": 24592,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4255320810773,
        "lng": -111.899244189262,
        "par": 5,
        "yards": 611,
        "meters": 558,
        "hcp": 6,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 12,
    "courseHoleId": 24594,
    "courseId": 11819,
    "greenLat": 40.4182525630763,
    "greenLng": -111.893520355225,
    "frontLat": 40.4183460889228,
    "frontLng": -111.893507614732,
    "backLat": 40.418183745897,
    "backLng": -111.893526390195,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570529,
        "courseHoleId": 24594,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4212849404925,
        "lng": -111.893227994442,
        "par": 4,
        "yards": 369,
        "meters": 337,
        "hcp": 12,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570528,
        "courseHoleId": 24594,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4210766603549,
        "lng": -111.893319189548,
        "par": 4,
        "yards": 343,
        "meters": 313,
        "hcp": 12,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570527,
        "courseHoleId": 24594,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4209030930809,
        "lng": -111.893442571163,
        "par": 4,
        "yards": 322,
        "meters": 294,
        "hcp": 12,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570526,
        "courseHoleId": 24594,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4207315673348,
        "lng": -111.893665194511,
        "par": 4,
        "yards": 301,
        "meters": 275,
        "hcp": 10,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570530,
        "courseHoleId": 24594,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4210092754663,
        "lng": -111.893378198146,
        "par": 4,
        "yards": 335,
        "meters": 306,
        "hcp": 12,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 13,
    "courseHoleId": 24596,
    "courseId": 11819,
    "greenLat": 40.4200087040286,
    "greenLng": -111.897221803665,
    "frontLat": 40.4198796496245,
    "frontLng": -111.897186264396,
    "backLat": 40.42013285735,
    "backLng": -111.897280141711,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570534,
        "courseHoleId": 24596,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4171090047895,
        "lng": -111.894968748093,
        "par": 4,
        "yards": 410,
        "meters": 374,
        "hcp": 4,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570533,
        "courseHoleId": 24596,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.417378559565,
        "lng": -111.894987523556,
        "par": 4,
        "yards": 380,
        "meters": 347,
        "hcp": 4,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570532,
        "courseHoleId": 24596,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4173601808646,
        "lng": -111.895424723625,
        "par": 4,
        "yards": 361,
        "meters": 330,
        "hcp": 4,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570531,
        "courseHoleId": 24596,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4174520743164,
        "lng": -111.895655393601,
        "par": 4,
        "yards": 343,
        "meters": 313,
        "hcp": 8,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570535,
        "courseHoleId": 24596,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4173846857974,
        "lng": -111.895261108876,
        "par": 4,
        "yards": 367,
        "meters": 335,
        "hcp": 4,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 14,
    "courseHoleId": 24598,
    "courseId": 11819,
    "greenLat": 40.4228592724386,
    "greenLng": -111.900714039803,
    "frontLat": 40.4227292025454,
    "frontLng": -111.90074019134,
    "backLat": 40.4229650433299,
    "backLng": -111.90071336925,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570539,
        "courseHoleId": 24598,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4188610915266,
        "lng": -111.899123489856,
        "par": 5,
        "yards": 508,
        "meters": 464,
        "hcp": 8,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570538,
        "courseHoleId": 24598,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4189346046581,
        "lng": -111.899566054344,
        "par": 5,
        "yards": 488,
        "meters": 446,
        "hcp": 8,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570537,
        "courseHoleId": 24598,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4189734032229,
        "lng": -111.899826228618,
        "par": 5,
        "yards": 480,
        "meters": 438,
        "hcp": 8,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570536,
        "courseHoleId": 24598,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4189917814825,
        "lng": -111.900054216385,
        "par": 5,
        "yards": 474,
        "meters": 433,
        "hcp": 4,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570540,
        "courseHoleId": 24598,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4189876974253,
        "lng": -111.899236142635,
        "par": 5,
        "yards": 489,
        "meters": 447,
        "hcp": 8,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 15,
    "courseHoleId": 24600,
    "courseId": 11819,
    "greenLat": 40.4244315256765,
    "greenLng": -111.902822256088,
    "frontLat": 40.4242912494857,
    "frontLng": -111.902698203921,
    "backLat": 40.424541377816,
    "backLng": -111.902946308255,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570544,
        "courseHoleId": 24600,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4234820524672,
        "lng": -111.901092231273,
        "par": 3,
        "yards": 196,
        "meters": 179,
        "hcp": 18,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570543,
        "courseHoleId": 24600,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4234922619278,
        "lng": -111.901180744171,
        "par": 3,
        "yards": 190,
        "meters": 173,
        "hcp": 18,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570542,
        "courseHoleId": 24600,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4234840943594,
        "lng": -111.90153747797,
        "par": 3,
        "yards": 165,
        "meters": 150,
        "hcp": 18,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570541,
        "courseHoleId": 24600,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4235371835361,
        "lng": -111.901894211769,
        "par": 3,
        "yards": 137,
        "meters": 125,
        "hcp": 18,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570545,
        "courseHoleId": 24600,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4235371835361,
        "lng": -111.901411414146,
        "par": 3,
        "yards": 169,
        "meters": 154,
        "hcp": 18,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 16,
    "courseHoleId": 24602,
    "courseId": 11819,
    "greenLat": 40.4272982408819,
    "greenLng": -111.904501318932,
    "frontLat": 40.4272304538452,
    "frontLng": -111.904454380274,
    "backLat": 40.427389712379,
    "backLng": -111.904558986425,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570549,
        "courseHoleId": 24602,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4236617387478,
        "lng": -111.903557181358,
        "par": 4,
        "yards": 450,
        "meters": 411,
        "hcp": 2,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570548,
        "courseHoleId": 24602,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4239414766613,
        "lng": -111.903575956821,
        "par": 4,
        "yards": 416,
        "meters": 380,
        "hcp": 2,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570547,
        "courseHoleId": 24602,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4241742503887,
        "lng": -111.90349817276,
        "par": 4,
        "yards": 391,
        "meters": 357,
        "hcp": 2,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570546,
        "courseHoleId": 24602,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4244539861708,
        "lng": -111.903455257415,
        "par": 4,
        "yards": 358,
        "meters": 327,
        "hcp": 6,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570550,
        "courseHoleId": 24602,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4240558217509,
        "lng": -111.903567910194,
        "par": 4,
        "yards": 403,
        "meters": 368,
        "hcp": 2,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 17,
    "courseHoleId": 24604,
    "courseId": 11819,
    "greenLat": 40.4268000455867,
    "greenLng": -111.908031105995,
    "frontLat": 40.4268241386979,
    "frontLng": -111.907879561186,
    "backLat": 40.4267812610769,
    "backLng": -111.908182650805,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570554,
        "courseHoleId": 24604,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4265427793583,
        "lng": -111.905788779258,
        "par": 3,
        "yards": 209,
        "meters": 191,
        "hcp": 16,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570553,
        "courseHoleId": 24604,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.426450898324,
        "lng": -111.906081140041,
        "par": 3,
        "yards": 184,
        "meters": 168,
        "hcp": 16,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570552,
        "courseHoleId": 24604,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4268020873782,
        "lng": -111.906247437,
        "par": 3,
        "yards": 165,
        "meters": 150,
        "hcp": 16,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570551,
        "courseHoleId": 24604,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4269205111808,
        "lng": -111.906486153602,
        "par": 3,
        "yards": 143,
        "meters": 130,
        "hcp": 16,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570555,
        "courseHoleId": 24604,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4268429231958,
        "lng": -111.90603017807,
        "par": 3,
        "yards": 184,
        "meters": 168,
        "hcp": 16,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  },
  {
    "hole": 18,
    "courseHoleId": 24607,
    "courseId": 11819,
    "greenLat": 40.4289071414682,
    "greenLng": -111.903374791145,
    "frontLat": 40.4289251086437,
    "frontLng": -111.903529018164,
    "backLat": 40.428894482731,
    "backLng": -111.903217881918,
    "pinLat": null,
    "pinLng": null,
    "pinExpires": null,
    "teeBoxes": [
      {
        "courseHoleTeeBoxId": 21570559,
        "courseHoleId": 24607,
        "teeTypeId": 1,
        "teeType": "pro",
        "teeColorTypeId": 4,
        "teeColorType": "black",
        "lat": 40.4286784675891,
        "lng": -111.907226443291,
        "par": 4,
        "yards": 357,
        "meters": 326,
        "hcp": 10,
        "hcp2": null,
        "teeHexColor": "#443C30"
      },
      {
        "courseHoleTeeBoxId": 21570558,
        "courseHoleId": 24607,
        "teeTypeId": 2,
        "teeType": "champion",
        "teeColorTypeId": 3,
        "teeColorType": "blue",
        "lat": 40.4287968880878,
        "lng": -111.907022595406,
        "par": 4,
        "yards": 337,
        "meters": 308,
        "hcp": 10,
        "hcp2": null,
        "teeHexColor": "#6e869e"
      },
      {
        "courseHoleTeeBoxId": 21570557,
        "courseHoleId": 24607,
        "teeTypeId": 3,
        "teeType": "men",
        "teeColorTypeId": 2,
        "teeColorType": "white",
        "lat": 40.4289704349937,
        "lng": -111.9069314003,
        "par": 4,
        "yards": 329,
        "meters": 300,
        "hcp": 10,
        "hcp2": null,
        "teeHexColor": "#ffffff"
      },
      {
        "courseHoleTeeBoxId": 21570556,
        "courseHoleId": 24607,
        "teeTypeId": 4,
        "teeType": "women",
        "teeColorTypeId": 1,
        "teeColorType": "red",
        "lat": 40.4290949801442,
        "lng": -111.90671145916,
        "par": 4,
        "yards": 309,
        "meters": 282,
        "hcp": 12,
        "hcp2": null,
        "teeHexColor": "#ff0000"
      }
    ],
    "changeLocations": [
      {
        "courseHoleTeeBoxId": 21570560,
        "courseHoleId": 24607,
        "teeTypeId": 5,
        "teeType": "auto change location",
        "teeColorTypeId": null,
        "teeColorType": null,
        "lat": 40.4288540565298,
        "lng": -111.906917989254,
        "par": 4,
        "yards": 328,
        "meters": 299,
        "hcp": 10,
        "hcp2": null,
        "teeHexColor": null
      }
    ]
  }
]
}
],

"foxHollow" : [
  {
      "id": "18300",
      "includes": "holes,teeBoxes,basicStats,pendingRevisions",
      "courseId": 18300,
      "statusId": 1,
      "status": "active",
      "courseTypeId": 1,
      "courseType": "public",
      "practiceAreaId": null,
      "measurementTypeId": 2,
      "measurementType": "yards",
      "mediaId": 177854,
      "holeCount": 18,
      "lat": 40.4031413225741,
      "lng": -111.787138581276,
      "popularityOneWeek": 2.13,
      "popularityThreeMonth": 2.92,
      "distanceFromMeKilometers": 0,
      "distanceFromMeMiles": 0,
      "localRankOneWeek": 10,
      "localRankThreeMonth": 5,
      "globalRankOneWeek": 532,
      "globalRankThreeMonth": 837,
      "localMaxRank": 42,
      "globalMaxRank": 32179,
      "name": "Fox Hollow Golf Club",
      "addr1": "1400 N 200 E",
      "addr2": null,
      "city": "American Fork",
      "stateOrProvince": "UT",
      "country": "United States",
      "zipCode": "84003",
      "phone": "(801) 756-3594",
      "website": "http://www.foxhollowutah.com/",
      "courseDesigner": null,
      "courseArchitect": null,
      "accomodations": null,
      "hours": null,
      "fax": null,
      "fees": null,
      "description": null,
      "thumbnail": "https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/12486769/uploaded-photo43828077-480x360.png",
      "holes": [
        {
          "hole": 1,
          "courseHoleId": 76697,
          "courseId": 18300,
          "greenLat": 40.4018800610798,
          "greenLng": -111.783242672682,
          "frontLat": 40.4019285885914,
          "frontLng": -111.783392205834,
          "backLat": 40.4018223760949,
          "backLng": -111.783093139529,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675266,
              "courseHoleId": 76697,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4031413225741,
              "lng": -111.787138581276,
              "par": 4,
              "yards": 391,
              "meters": 357,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675267,
              "courseHoleId": 76697,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4031413225741,
              "lng": -111.787138581276,
              "par": 4,
              "yards": 391,
              "meters": 357,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675268,
              "courseHoleId": 76697,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4031413225741,
              "lng": -111.787138581276,
              "par": 4,
              "yards": 391,
              "meters": 357,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675269,
              "courseHoleId": 76697,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4031413225741,
              "lng": -111.787138581276,
              "par": 4,
              "yards": 391,
              "meters": 357,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675265,
              "courseHoleId": 76697,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4031413225741,
              "lng": -111.787138581276,
              "par": 4,
              "yards": 391,
              "meters": 357,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 2,
          "courseHoleId": 76700,
          "courseId": 18300,
          "greenLat": 40.4063490074717,
          "greenLng": -111.783305704594,
          "frontLat": 40.4062412871542,
          "frontLng": -111.783275529742,
          "backLat": 40.4064628888751,
          "backLng": -111.783327832818,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675271,
              "courseHoleId": 76700,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4020792092027,
              "lng": -111.782788038254,
              "par": 5,
              "yards": 521,
              "meters": 476,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675272,
              "courseHoleId": 76700,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4020792092027,
              "lng": -111.782788038254,
              "par": 5,
              "yards": 521,
              "meters": 476,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675273,
              "courseHoleId": 76700,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4020792092027,
              "lng": -111.782788038254,
              "par": 5,
              "yards": 521,
              "meters": 476,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675274,
              "courseHoleId": 76700,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4020792092027,
              "lng": -111.782788038254,
              "par": 5,
              "yards": 521,
              "meters": 476,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675270,
              "courseHoleId": 76700,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4020792092027,
              "lng": -111.782788038254,
              "par": 5,
              "yards": 521,
              "meters": 476,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 3,
          "courseHoleId": 76704,
          "courseId": 18300,
          "greenLat": 40.4084128334259,
          "greenLng": -111.783553808928,
          "frontLat": 40.4082938834073,
          "frontLng": -111.78352765739,
          "backLat": 40.4085287536213,
          "backLng": -111.783582642674,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675276,
              "courseHoleId": 76704,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4068504178157,
              "lng": -111.783050894737,
              "par": 3,
              "yards": 195,
              "meters": 178,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675277,
              "courseHoleId": 76704,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4068504178157,
              "lng": -111.783050894737,
              "par": 3,
              "yards": 195,
              "meters": 178,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675278,
              "courseHoleId": 76704,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4068504178157,
              "lng": -111.783050894737,
              "par": 3,
              "yards": 195,
              "meters": 178,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675279,
              "courseHoleId": 76704,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4068504178157,
              "lng": -111.783050894737,
              "par": 3,
              "yards": 195,
              "meters": 178,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675275,
              "courseHoleId": 76704,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4068504178157,
              "lng": -111.783050894737,
              "par": 3,
              "yards": 195,
              "meters": 178,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 4,
          "courseHoleId": 76707,
          "courseId": 18300,
          "greenLat": 40.405114357932,
          "greenLng": -111.783866286278,
          "frontLat": 40.4052435597698,
          "frontLng": -111.783877685666,
          "backLat": 40.4049984658262,
          "backLng": -111.783848181367,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675281,
              "courseHoleId": 76707,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4085619247846,
              "lng": -111.78429543972,
              "par": 4,
              "yards": 421,
              "meters": 384,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675282,
              "courseHoleId": 76707,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4085619247846,
              "lng": -111.78429543972,
              "par": 4,
              "yards": 421,
              "meters": 384,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675283,
              "courseHoleId": 76707,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4085619247846,
              "lng": -111.78429543972,
              "par": 4,
              "yards": 421,
              "meters": 384,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675284,
              "courseHoleId": 76707,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4085619247846,
              "lng": -111.78429543972,
              "par": 4,
              "yards": 421,
              "meters": 384,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675280,
              "courseHoleId": 76707,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4085619247846,
              "lng": -111.78429543972,
              "par": 4,
              "yards": 421,
              "meters": 384,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 5,
          "courseHoleId": 76709,
          "courseId": 18300,
          "greenLat": 40.4023079734987,
          "greenLng": -111.783635616302,
          "frontLat": 40.4024382019887,
          "frontLng": -111.783677861094,
          "backLat": 40.4022043317903,
          "backLng": -111.783593371511,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675286,
              "courseHoleId": 76709,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4051184428314,
              "lng": -111.784563660622,
              "par": 4,
              "yards": 352,
              "meters": 321,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675287,
              "courseHoleId": 76709,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4051184428314,
              "lng": -111.784563660622,
              "par": 4,
              "yards": 352,
              "meters": 321,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675288,
              "courseHoleId": 76709,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4051184428314,
              "lng": -111.784563660622,
              "par": 4,
              "yards": 352,
              "meters": 321,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675289,
              "courseHoleId": 76709,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4051184428314,
              "lng": -111.784563660622,
              "par": 4,
              "yards": 352,
              "meters": 321,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675285,
              "courseHoleId": 76709,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4051184428314,
              "lng": -111.784563660622,
              "par": 4,
              "yards": 352,
              "meters": 321,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 6,
          "courseHoleId": 76712,
          "courseId": 18300,
          "greenLat": 40.405812872116,
          "greenLng": -111.785379052162,
          "frontLat": 40.4056852542437,
          "frontLng": -111.78531602025,
          "backLat": 40.4059430938253,
          "backLng": -111.785436049104,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675291,
              "courseHoleId": 76712,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4024019300379,
              "lng": -111.784166693687,
              "par": 4,
              "yards": 429,
              "meters": 392,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675292,
              "courseHoleId": 76712,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4024019300379,
              "lng": -111.784166693687,
              "par": 4,
              "yards": 429,
              "meters": 392,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675293,
              "courseHoleId": 76712,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4024019300379,
              "lng": -111.784166693687,
              "par": 4,
              "yards": 429,
              "meters": 392,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675294,
              "courseHoleId": 76712,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4024019300379,
              "lng": -111.784166693687,
              "par": 4,
              "yards": 429,
              "meters": 392,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675290,
              "courseHoleId": 76712,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4024019300379,
              "lng": -111.784166693687,
              "par": 4,
              "yards": 429,
              "meters": 392,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 7,
          "courseHoleId": 76715,
          "courseId": 18300,
          "greenLat": 40.4084475533609,
          "greenLng": -111.784853339195,
          "frontLat": 40.408328603466,
          "frontLng": -111.784862056375,
          "backLat": 40.4085573465233,
          "backLng": -111.784848645329,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675296,
              "courseHoleId": 76715,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4054493188547,
              "lng": -111.784729957581,
              "par": 4,
              "yards": 364,
              "meters": 332,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675297,
              "courseHoleId": 76715,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4054493188547,
              "lng": -111.784729957581,
              "par": 4,
              "yards": 364,
              "meters": 332,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675298,
              "courseHoleId": 76715,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4054493188547,
              "lng": -111.784729957581,
              "par": 4,
              "yards": 364,
              "meters": 332,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675299,
              "courseHoleId": 76715,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4054493188547,
              "lng": -111.784729957581,
              "par": 4,
              "yards": 364,
              "meters": 332,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675295,
              "courseHoleId": 76715,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4054493188547,
              "lng": -111.784729957581,
              "par": 4,
              "yards": 364,
              "meters": 332,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 8,
          "courseHoleId": 76719,
          "courseId": 18300,
          "greenLat": 40.4074692612777,
          "greenLng": -111.786714792252,
          "frontLat": 40.4075586322835,
          "frontLng": -111.78661622107,
          "backLat": 40.4073850301368,
          "backLng": -111.786817386746,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675301,
              "courseHoleId": 76719,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4084812521041,
              "lng": -111.785588264465,
              "par": 3,
              "yards": 160,
              "meters": 146,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675302,
              "courseHoleId": 76719,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4084812521041,
              "lng": -111.785588264465,
              "par": 3,
              "yards": 160,
              "meters": 146,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675303,
              "courseHoleId": 76719,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4084812521041,
              "lng": -111.785588264465,
              "par": 3,
              "yards": 160,
              "meters": 146,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675304,
              "courseHoleId": 76719,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4084812521041,
              "lng": -111.785588264465,
              "par": 3,
              "yards": 160,
              "meters": 146,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675300,
              "courseHoleId": 76719,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4084812521041,
              "lng": -111.785588264465,
              "par": 3,
              "yards": 160,
              "meters": 146,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 9,
          "courseHoleId": 76722,
          "courseId": 18300,
          "greenLat": 40.4037326265064,
          "greenLng": -111.786942780018,
          "frontLat": 40.4038475335807,
          "frontLng": -111.786907240748,
          "backLat": 40.4036340932283,
          "backLng": -111.786989048123,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675306,
              "courseHoleId": 76722,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4076612445616,
              "lng": -111.785923540592,
              "par": 5,
              "yards": 486,
              "meters": 444,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675307,
              "courseHoleId": 76722,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4076612445616,
              "lng": -111.785923540592,
              "par": 5,
              "yards": 486,
              "meters": 444,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675308,
              "courseHoleId": 76722,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4076612445616,
              "lng": -111.785923540592,
              "par": 5,
              "yards": 486,
              "meters": 444,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675309,
              "courseHoleId": 76722,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4076612445616,
              "lng": -111.785923540592,
              "par": 5,
              "yards": 486,
              "meters": 444,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675305,
              "courseHoleId": 76722,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4076612445616,
              "lng": -111.785923540592,
              "par": 5,
              "yards": 486,
              "meters": 444,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 10,
          "courseHoleId": 76726,
          "courseId": 18300,
          "greenLat": 40.401325507049,
          "greenLng": -111.783064305782,
          "frontLat": 40.4013546306068,
          "frontLng": -111.783213838935,
          "backLat": 40.4013148006007,
          "backLng": -111.782960370183,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675311,
              "courseHoleId": 76726,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4029084760769,
              "lng": -111.78761869669,
              "par": 5,
              "yards": 463,
              "meters": 423,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675312,
              "courseHoleId": 76726,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4029084760769,
              "lng": -111.78761869669,
              "par": 5,
              "yards": 463,
              "meters": 423,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675313,
              "courseHoleId": 76726,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4029084760769,
              "lng": -111.78761869669,
              "par": 5,
              "yards": 463,
              "meters": 423,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675314,
              "courseHoleId": 76726,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4029084760769,
              "lng": -111.78761869669,
              "par": 5,
              "yards": 463,
              "meters": 423,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675310,
              "courseHoleId": 76726,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4029084760769,
              "lng": -111.78761869669,
              "par": 5,
              "yards": 463,
              "meters": 423,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 11,
          "courseHoleId": 76728,
          "courseId": 18300,
          "greenLat": 40.4049264522944,
          "greenLng": -111.782356202602,
          "frontLat": 40.4047681958448,
          "frontLng": -111.782330721617,
          "backLat": 40.4050929462389,
          "backLng": -111.782389730215,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675316,
              "courseHoleId": 76728,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4016952102438,
              "lng": -111.782114803791,
              "par": 4,
              "yards": 393,
              "meters": 359,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675317,
              "courseHoleId": 76728,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4016952102438,
              "lng": -111.782114803791,
              "par": 4,
              "yards": 393,
              "meters": 359,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675318,
              "courseHoleId": 76728,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4016952102438,
              "lng": -111.782114803791,
              "par": 4,
              "yards": 393,
              "meters": 359,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675319,
              "courseHoleId": 76728,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4016952102438,
              "lng": -111.782114803791,
              "par": 4,
              "yards": 393,
              "meters": 359,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675315,
              "courseHoleId": 76728,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4016952102438,
              "lng": -111.782114803791,
              "par": 4,
              "yards": 393,
              "meters": 359,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 12,
          "courseHoleId": 76730,
          "courseId": 18300,
          "greenLat": 40.4023192074396,
          "greenLng": -111.78170979023,
          "frontLat": 40.4024453508466,
          "frontLng": -111.781726554036,
          "backLat": 40.4022247571676,
          "backLng": -111.781695708632,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675321,
              "courseHoleId": 76730,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4041094651626,
              "lng": -111.781862676144,
              "par": 3,
              "yards": 217,
              "meters": 198,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675322,
              "courseHoleId": 76730,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4041094651626,
              "lng": -111.781862676144,
              "par": 3,
              "yards": 217,
              "meters": 198,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675323,
              "courseHoleId": 76730,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4041094651626,
              "lng": -111.781862676144,
              "par": 3,
              "yards": 217,
              "meters": 198,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675324,
              "courseHoleId": 76730,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4041094651626,
              "lng": -111.781862676144,
              "par": 3,
              "yards": 217,
              "meters": 198,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675320,
              "courseHoleId": 76730,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4041094651626,
              "lng": -111.781862676144,
              "par": 3,
              "yards": 217,
              "meters": 198,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 13,
          "courseHoleId": 76732,
          "courseId": 18300,
          "greenLat": 40.4004992845592,
          "greenLng": -111.786069720983,
          "frontLat": 40.400499812224,
          "frontLng": -111.785971149802,
          "backLat": 40.4004855140943,
          "backLng": -111.786185726523,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675326,
              "courseHoleId": 76732,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4011672080989,
              "lng": -111.781637370586,
              "par": 4,
              "yards": 418,
              "meters": 382,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675327,
              "courseHoleId": 76732,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4011672080989,
              "lng": -111.781637370586,
              "par": 4,
              "yards": 418,
              "meters": 382,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675328,
              "courseHoleId": 76732,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4011672080989,
              "lng": -111.781637370586,
              "par": 4,
              "yards": 418,
              "meters": 382,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675329,
              "courseHoleId": 76732,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4011672080989,
              "lng": -111.781637370586,
              "par": 4,
              "yards": 418,
              "meters": 382,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675325,
              "courseHoleId": 76732,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4011672080989,
              "lng": -111.781637370586,
              "par": 4,
              "yards": 418,
              "meters": 382,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 14,
          "courseHoleId": 76735,
          "courseId": 18300,
          "greenLat": 40.4018136782414,
          "greenLng": -111.787320971489,
          "frontLat": 40.4017345463416,
          "frontLng": -111.787203624845,
          "backLat": 40.4018999928734,
          "backLng": -111.787498667836,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675331,
              "courseHoleId": 76735,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4008577581085,
              "lng": -111.785888671875,
              "par": 3,
              "yards": 176,
              "meters": 160,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675332,
              "courseHoleId": 76735,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4008577581085,
              "lng": -111.785888671875,
              "par": 3,
              "yards": 176,
              "meters": 160,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675333,
              "courseHoleId": 76735,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4008577581085,
              "lng": -111.785888671875,
              "par": 3,
              "yards": 176,
              "meters": 160,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675334,
              "courseHoleId": 76735,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4008577581085,
              "lng": -111.785888671875,
              "par": 3,
              "yards": 176,
              "meters": 160,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675330,
              "courseHoleId": 76735,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4008577581085,
              "lng": -111.785888671875,
              "par": 3,
              "yards": 176,
              "meters": 160,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 15,
          "courseHoleId": 76737,
          "courseId": 18300,
          "greenLat": 40.4001428517016,
          "greenLng": -111.79009437561,
          "frontLat": 40.4002424453614,
          "frontLng": -111.790036037564,
          "backLat": 40.4000678030437,
          "backLng": -111.790159419179,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675336,
              "courseHoleId": 76737,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4024386956045,
              "lng": -111.788823008537,
              "par": 4,
              "yards": 302,
              "meters": 276,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675337,
              "courseHoleId": 76737,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4024386956045,
              "lng": -111.788823008537,
              "par": 4,
              "yards": 302,
              "meters": 276,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675338,
              "courseHoleId": 76737,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4024386956045,
              "lng": -111.788823008537,
              "par": 4,
              "yards": 302,
              "meters": 276,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675339,
              "courseHoleId": 76737,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4024386956045,
              "lng": -111.788823008537,
              "par": 4,
              "yards": 302,
              "meters": 276,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675335,
              "courseHoleId": 76737,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4024386956045,
              "lng": -111.788823008537,
              "par": 4,
              "yards": 302,
              "meters": 276,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 16,
          "courseHoleId": 76739,
          "courseId": 18300,
          "greenLat": 40.3967479639454,
          "greenLng": -111.791489124299,
          "frontLat": 40.3968771818412,
          "frontLng": -111.791471019387,
          "backLat": 40.396643292324,
          "backLng": -111.791513934731,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675341,
              "courseHoleId": 76739,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4006126481957,
              "lng": -111.790974140167,
              "par": 5,
              "yards": 472,
              "meters": 431,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675342,
              "courseHoleId": 76739,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4006126481957,
              "lng": -111.790974140167,
              "par": 5,
              "yards": 472,
              "meters": 431,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675343,
              "courseHoleId": 76739,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4006126481957,
              "lng": -111.790974140167,
              "par": 5,
              "yards": 472,
              "meters": 431,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675344,
              "courseHoleId": 76739,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4006126481957,
              "lng": -111.790974140167,
              "par": 5,
              "yards": 472,
              "meters": 431,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675340,
              "courseHoleId": 76739,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4006126481957,
              "lng": -111.790974140167,
              "par": 5,
              "yards": 472,
              "meters": 431,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 17,
          "courseHoleId": 76741,
          "courseId": 18300,
          "greenLat": 40.3994647048937,
          "greenLng": -111.79181098938,
          "frontLat": 40.3993436964993,
          "frontLng": -111.791861280799,
          "backLat": 40.3995877897235,
          "backLng": -111.791776791215,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675346,
              "courseHoleId": 76741,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.3965804620435,
              "lng": -111.792744398117,
              "par": 4,
              "yards": 360,
              "meters": 329,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675347,
              "courseHoleId": 76741,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.3965804620435,
              "lng": -111.792744398117,
              "par": 4,
              "yards": 360,
              "meters": 329,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675348,
              "courseHoleId": 76741,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.3965804620435,
              "lng": -111.792744398117,
              "par": 4,
              "yards": 360,
              "meters": 329,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675349,
              "courseHoleId": 76741,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.3965804620435,
              "lng": -111.792744398117,
              "par": 4,
              "yards": 360,
              "meters": 329,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675345,
              "courseHoleId": 76741,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.3965804620435,
              "lng": -111.792744398117,
              "par": 4,
              "yards": 360,
              "meters": 329,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 18,
          "courseHoleId": 76742,
          "courseId": 18300,
          "greenLat": 40.4033476157277,
          "greenLng": -111.789814084769,
          "frontLat": 40.4032225292361,
          "frontLng": -111.78991265595,
          "backLat": 40.4034676296463,
          "backLng": -111.789728924632,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21675351,
              "courseHoleId": 76742,
              "teeTypeId": 1,
              "teeType": "pro",
              "teeColorTypeId": 4,
              "teeColorType": "black",
              "lat": 40.4001019996776,
              "lng": -111.791617870331,
              "par": 4,
              "yards": 428,
              "meters": 391,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": "#443C30"
            },
            {
              "courseHoleTeeBoxId": 21675352,
              "courseHoleId": 76742,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.4001019996776,
              "lng": -111.791617870331,
              "par": 4,
              "yards": 428,
              "meters": 391,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21675353,
              "courseHoleId": 76742,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.4001019996776,
              "lng": -111.791617870331,
              "par": 4,
              "yards": 428,
              "meters": 391,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21675354,
              "courseHoleId": 76742,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 1,
              "teeColorType": "red",
              "lat": 40.4001019996776,
              "lng": -111.791617870331,
              "par": 4,
              "yards": 428,
              "meters": 391,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": "#ff0000"
            },
            {
              "courseHoleTeeBoxId": 21675350,
              "courseHoleId": 76742,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.4001019996776,
              "lng": -111.791617870331,
              "par": 4,
              "yards": 428,
              "meters": 391,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        }
      ]
    }
],

"spanishOaks" : [
  {
      "id": "19002",
      "includes": "holes,teeBoxes,basicStats,staff,golfPros,events,bestRounds,recentRounds,nearbyCourses,media,courseExtendedStatsForYear,globalExtendedStatsForYear",
      "courseId": 19002,
      "statusId": 1,
      "status": "active",
      "courseTypeId": 1,
      "courseType": "public",
      "practiceAreaId": 3691,
      "measurementTypeId": 2,
      "measurementType": "yards",
      "mediaId": 136549,
      "holeCount": 18,
      "lat": 40.0847371019788,
      "lng": -111.597889959812,
      "popularityOneWeek": 2.2,
      "popularityThreeMonth": 2.69,
      "distanceFromMeKilometers": 0,
      "distanceFromMeMiles": 0,
      "localRankOneWeek": 2,
      "localRankThreeMonth": 3,
      "globalRankOneWeek": 337,
      "globalRankThreeMonth": 2001,
      "localMaxRank": 8,
      "globalMaxRank": 32179,
      "name": "Spanish Oaks Golf Course",
      "addr1": "2300 E Powerhouse Rd",
      "addr2": null,
      "city": "Spanish Fork",
      "stateOrProvince": "UT",
      "country": "United States",
      "zipCode": "84660",
      "phone": "8018044653",
      "website": "http://golfspanishoaks.com/",
      "courseDesigner": null,
      "courseArchitect": null,
      "accomodations": null,
      "hours": null,
      "fax": null,
      "fees": null,
      "description": null,
      "thumbnail": "https://swingbyswing-b9.s3.amazonaws.com/photo/in-round/12399619/uploaded-photo58903008-480x360.png",
      "holes": [
        {
          "hole": 1,
          "courseHoleId": 82367,
          "courseId": 19002,
          "greenLat": 40.0868569288042,
          "greenLng": -111.600521206855,
          "frontLat": 40.0867887143617,
          "frontLng": -111.600450798869,
          "backLat": 40.0869374898099,
          "backLng": -111.600575521588,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688403,
              "courseHoleId": 82367,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0847494148131,
              "lng": -111.597702205181,
              "par": 4,
              "yards": 366,
              "meters": 334,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688402,
              "courseHoleId": 82367,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0849474459255,
              "lng": -111.597857773304,
              "par": 4,
              "yards": 339,
              "meters": 309,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688401,
              "courseHoleId": 82367,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0851013557187,
              "lng": -111.598003953695,
              "par": 4,
              "yards": 317,
              "meters": 289,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688404,
              "courseHoleId": 82367,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0847371019788,
              "lng": -111.597889959812,
              "par": 4,
              "yards": 355,
              "meters": 324,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 2,
          "courseHoleId": 82371,
          "courseId": 19002,
          "greenLat": 40.0849566805229,
          "greenLng": -111.596817076206,
          "frontLat": 40.0849951750955,
          "frontLng": -111.596883460879,
          "backLat": 40.0849182201224,
          "backLng": -111.596742644906,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688407,
              "courseHoleId": 82371,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.087872698516,
              "lng": -111.600539982319,
              "par": 5,
              "yards": 495,
              "meters": 452,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688406,
              "courseHoleId": 82371,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0875854116499,
              "lng": -111.599990129471,
              "par": 5,
              "yards": 435,
              "meters": 397,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688405,
              "courseHoleId": 82371,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0874807568474,
              "lng": -111.599831879139,
              "par": 5,
              "yards": 415,
              "meters": 379,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688408,
              "courseHoleId": 82371,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0874622883362,
              "lng": -111.60021007061,
              "par": 5,
              "yards": 438,
              "meters": 400,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 3,
          "courseHoleId": 82375,
          "courseId": 19002,
          "greenLat": 40.0838033722232,
          "greenLng": -111.603468954563,
          "frontLat": 40.0838326326994,
          "frontLng": -111.603284552693,
          "backLat": 40.0837854328535,
          "backLng": -111.603639945388,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688411,
              "courseHoleId": 82375,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0842158566175,
              "lng": -111.598775088787,
              "par": 5,
              "yards": 439,
              "meters": 401,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688410,
              "courseHoleId": 82375,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0843184642875,
              "lng": -111.598914563656,
              "par": 5,
              "yards": 428,
              "meters": 391,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688409,
              "courseHoleId": 82375,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0843451422564,
              "lng": -111.599196195603,
              "par": 5,
              "yards": 402,
              "meters": 367,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688412,
              "courseHoleId": 82375,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0843595073123,
              "lng": -111.598501503468,
              "par": 5,
              "yards": 466,
              "meters": 426,
              "hcp": 9,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 4,
          "courseHoleId": 82378,
          "courseId": 19002,
          "greenLat": 40.0836586942691,
          "greenLng": -111.605748832226,
          "frontLat": 40.0837187373633,
          "frontLng": -111.605508103967,
          "backLat": 40.0836202331353,
          "backLng": -111.605954691768,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688415,
              "courseHoleId": 82378,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0843061513752,
              "lng": -111.603637933731,
              "par": 3,
              "yards": 211,
              "meters": 192,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688414,
              "courseHoleId": 82378,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.084256899704,
              "lng": -111.603949069977,
              "par": 3,
              "yards": 182,
              "meters": 166,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688413,
              "courseHoleId": 82378,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0841132487927,
              "lng": -111.6044023633,
              "par": 3,
              "yards": 136,
              "meters": 124,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688416,
              "courseHoleId": 82378,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0841378746847,
              "lng": -111.603699624538,
              "par": 3,
              "yards": 199,
              "meters": 181,
              "hcp": 15,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 5,
          "courseHoleId": 82382,
          "courseId": 19002,
          "greenLat": 40.0808851276639,
          "greenLng": -111.606646031141,
          "frontLat": 40.0810159759144,
          "frontLng": -111.60664267838,
          "backLat": 40.0807953585314,
          "backLng": -111.60665743053,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688419,
              "courseHoleId": 82382,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0841378746848,
              "lng": -111.606591045857,
              "par": 4,
              "yards": 395,
              "meters": 361,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688418,
              "courseHoleId": 82382,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0836740855555,
              "lng": -111.606639325619,
              "par": 4,
              "yards": 339,
              "meters": 309,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688417,
              "courseHoleId": 82382,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0832759631633,
              "lng": -111.606510579586,
              "par": 4,
              "yards": 290,
              "meters": 265,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688420,
              "courseHoleId": 82382,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0835386421163,
              "lng": -111.606376469136,
              "par": 4,
              "yards": 323,
              "meters": 295,
              "hcp": 11,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 6,
          "courseHoleId": 82385,
          "courseId": 19002,
          "greenLat": 40.0845175227265,
          "greenLng": -111.607454717159,
          "frontLat": 40.0843980022225,
          "frontLng": -111.607464775443,
          "backLat": 40.0846370772145,
          "backLng": -111.607450023294,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688423,
              "courseHoleId": 82385,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.081125241116,
              "lng": -111.607446670532,
              "par": 4,
              "yards": 412,
              "meters": 376,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688422,
              "courseHoleId": 82385,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0814248686804,
              "lng": -111.607449352741,
              "par": 4,
              "yards": 376,
              "meters": 343,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688421,
              "courseHoleId": 82385,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0815377417361,
              "lng": -111.607441306114,
              "par": 4,
              "yards": 361,
              "meters": 330,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688424,
              "courseHoleId": 82385,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0809815835969,
              "lng": -111.607280373573,
              "par": 4,
              "yards": 429,
              "meters": 392,
              "hcp": 5,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 7,
          "courseHoleId": 82387,
          "courseId": 19002,
          "greenLat": 40.0850839126262,
          "greenLng": -111.602602601051,
          "frontLat": 40.0850721299816,
          "frontLng": -111.602787002921,
          "backLat": 40.0850957294626,
          "backLng": -111.602471843362,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688427,
              "courseHoleId": 82387,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0849895146368,
              "lng": -111.607055068016,
              "par": 4,
              "yards": 414,
              "meters": 378,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688426,
              "courseHoleId": 82387,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0846221820846,
              "lng": -111.606674194336,
              "par": 4,
              "yards": 382,
              "meters": 349,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688425,
              "courseHoleId": 82387,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0846098692272,
              "lng": -111.606419384479,
              "par": 4,
              "yards": 359,
              "meters": 328,
              "hcp": 3,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688428,
              "courseHoleId": 82387,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0849874625051,
              "lng": -111.607502996921,
              "par": 4,
              "yards": 456,
              "meters": 416,
              "hcp": 1,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 8,
          "courseHoleId": 82389,
          "courseId": 19002,
          "greenLat": 40.0857693201888,
          "greenLng": -111.600708961486,
          "frontLat": 40.0856477497709,
          "frontLng": -111.600763276219,
          "backLat": 40.0858857943217,
          "backLng": -111.600664034486,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688431,
              "courseHoleId": 82389,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0848007182654,
              "lng": -111.602071523666,
              "par": 3,
              "yards": 172,
              "meters": 157,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688430,
              "courseHoleId": 82389,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0849135857243,
              "lng": -111.601905226707,
              "par": 3,
              "yards": 152,
              "meters": 138,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688429,
              "courseHoleId": 82389,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0849238463931,
              "lng": -111.601202487945,
              "par": 3,
              "yards": 112,
              "meters": 102,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688432,
              "courseHoleId": 82389,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.084765831922,
              "lng": -111.602318286895,
              "par": 3,
              "yards": 192,
              "meters": 175,
              "hcp": 17,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 9,
          "courseHoleId": 82391,
          "courseId": 19002,
          "greenLat": 40.0846478338635,
          "greenLng": -111.598461270332,
          "frontLat": 40.0847376321106,
          "frontLng": -111.598616167903,
          "backLat": 40.0846021907873,
          "backLng": -111.598337218165,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688435,
              "courseHoleId": 82391,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0864978146736,
              "lng": -111.600851118564,
              "par": 4,
              "yards": 316,
              "meters": 288,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688434,
              "courseHoleId": 82391,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0863890540202,
              "lng": -111.600711643696,
              "par": 4,
              "yards": 297,
              "meters": 271,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688433,
              "courseHoleId": 82391,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0862187303837,
              "lng": -111.600494384766,
              "par": 4,
              "yards": 269,
              "meters": 245,
              "hcp": 7,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688436,
              "courseHoleId": 82391,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0862433555141,
              "lng": -111.600920855999,
              "par": 4,
              "yards": 299,
              "meters": 273,
              "hcp": 13,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 10,
          "courseHoleId": 82393,
          "courseId": 19002,
          "greenLat": 40.0792330420681,
          "greenLng": -111.595534980297,
          "frontLat": 40.0793495273837,
          "frontLng": -111.59560136497,
          "backLat": 40.0791463492191,
          "backLng": -111.595472618937,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688439,
              "courseHoleId": 82393,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0833067459055,
              "lng": -111.596919000149,
              "par": 5,
              "yards": 511,
              "meters": 467,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688438,
              "courseHoleId": 82393,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0832000323395,
              "lng": -111.596876084804,
              "par": 5,
              "yards": 498,
              "meters": 455,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688437,
              "courseHoleId": 82393,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0827095582219,
              "lng": -111.596790254116,
              "par": 5,
              "yards": 438,
              "meters": 400,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688440,
              "courseHoleId": 82393,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0833313720892,
              "lng": -111.597120165825,
              "par": 5,
              "yards": 519,
              "meters": 474,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 11,
          "courseHoleId": 82395,
          "courseId": 19002,
          "greenLat": 40.0816639541131,
          "greenLng": -111.59739241004,
          "frontLat": 40.0815659770685,
          "frontLng": -111.597347483039,
          "backLat": 40.0817506779521,
          "backLng": -111.597429290414,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688443,
              "courseHoleId": 82395,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0788944108779,
              "lng": -111.596095561981,
              "par": 4,
              "yards": 357,
              "meters": 326,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688442,
              "courseHoleId": 82395,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0790031835044,
              "lng": -111.596068739891,
              "par": 4,
              "yards": 345,
              "meters": 315,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688441,
              "courseHoleId": 82395,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.079132479042,
              "lng": -111.596256494522,
              "par": 4,
              "yards": 324,
              "meters": 296,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688444,
              "courseHoleId": 82395,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.078947771056,
              "lng": -111.595781743527,
              "par": 4,
              "yards": 363,
              "meters": 331,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 12,
          "courseHoleId": 82397,
          "courseId": 19002,
          "greenLat": 40.0817296255012,
          "greenLng": -111.598366051911,
          "frontLat": 40.0817599129831,
          "frontLng": -111.598240658641,
          "backLat": 40.0816973199705,
          "backLng": -111.598516926169,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688447,
              "courseHoleId": 82397,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0819974409752,
              "lng": -111.597061157227,
              "par": 3,
              "yards": 125,
              "meters": 114,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688446,
              "courseHoleId": 82397,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0820600337119,
              "lng": -111.597212702036,
              "par": 3,
              "yards": 113,
              "meters": 103,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688445,
              "courseHoleId": 82397,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0819974409752,
              "lng": -111.597600281239,
              "par": 3,
              "yards": 77,
              "meters": 70,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688448,
              "courseHoleId": 82397,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0820713209206,
              "lng": -111.59707993269,
              "par": 3,
              "yards": 125,
              "meters": 114,
              "hcp": 18,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 13,
          "courseHoleId": 82398,
          "courseId": 19002,
          "greenLat": 40.0794546906626,
          "greenLng": -111.597200632096,
          "frontLat": 40.0795588618281,
          "frontLng": -111.59730322659,
          "backLat": 40.0793710765474,
          "backLng": -111.597119495273,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688451,
              "courseHoleId": 82398,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0815582640897,
              "lng": -111.598761677742,
              "par": 4,
              "yards": 294,
              "meters": 268,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688450,
              "courseHoleId": 82398,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0813838238865,
              "lng": -111.598649024963,
              "par": 4,
              "yards": 270,
              "meters": 246,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688449,
              "courseHoleId": 82398,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0812647938443,
              "lng": -111.598560512066,
              "par": 4,
              "yards": 253,
              "meters": 231,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688452,
              "courseHoleId": 82398,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0816075177133,
              "lng": -111.598809957504,
              "par": 4,
              "yards": 301,
              "meters": 275,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 14,
          "courseHoleId": 82399,
          "courseId": 19002,
          "greenLat": 40.0812463236467,
          "greenLng": -111.599194854498,
          "frontLat": 40.0811545027431,
          "frontLng": -111.599129810929,
          "backLat": 40.0813207345655,
          "backLng": -111.599254533649,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688455,
              "courseHoleId": 82399,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0790196019989,
              "lng": -111.597667336464,
              "par": 4,
              "yards": 305,
              "meters": 278,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688454,
              "courseHoleId": 82399,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0790873282472,
              "lng": -111.597753167152,
              "par": 4,
              "yards": 294,
              "meters": 268,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688453,
              "courseHoleId": 82399,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0791673682719,
              "lng": -111.597833633423,
              "par": 4,
              "yards": 282,
              "meters": 257,
              "hcp": 14,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688456,
              "courseHoleId": 82399,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0791550544281,
              "lng": -111.597602963448,
              "par": 4,
              "yards": 294,
              "meters": 268,
              "hcp": 12,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 15,
          "courseHoleId": 82400,
          "courseId": 19002,
          "greenLat": 40.078828736755,
          "greenLng": -111.598201096058,
          "frontLat": 40.0789339350353,
          "frontLng": -111.598292961717,
          "backLat": 40.0787276771502,
          "backLng": -111.598126664758,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688459,
              "courseHoleId": 82400,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0810123673765,
              "lng": -111.599684357643,
              "par": 4,
              "yards": 298,
              "meters": 272,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688458,
              "courseHoleId": 82400,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0808646051074,
              "lng": -111.599729955196,
              "par": 4,
              "yards": 285,
              "meters": 260,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688457,
              "courseHoleId": 82400,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0806881108657,
              "lng": -111.599783599377,
              "par": 4,
              "yards": 270,
              "meters": 246,
              "hcp": 8,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688460,
              "courseHoleId": 82400,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0808605005954,
              "lng": -111.599526107311,
              "par": 4,
              "yards": 275,
              "meters": 251,
              "hcp": 10,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 16,
          "courseHoleId": 82401,
          "courseId": 19002,
          "greenLat": 40.0813222566493,
          "greenLng": -111.600098758935,
          "frontLat": 40.0812078611501,
          "frontLng": -111.600048467517,
          "backLat": 40.081427451077,
          "backLng": -111.600150391459,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688463,
              "courseHoleId": 82401,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0785229407867,
              "lng": -111.598372757434,
              "par": 4,
              "yards": 376,
              "meters": 343,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688462,
              "courseHoleId": 82401,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0786358186531,
              "lng": -111.598726809024,
              "par": 4,
              "yards": 351,
              "meters": 320,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688461,
              "courseHoleId": 82401,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0787363824127,
              "lng": -111.598826050758,
              "par": 5,
              "yards": 335,
              "meters": 306,
              "hcp": 6,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688464,
              "courseHoleId": 82401,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.07862760936,
              "lng": -111.598429083824,
              "par": 4,
              "yards": 361,
              "meters": 330,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 17,
          "courseHoleId": 82402,
          "courseId": 19002,
          "greenLat": 40.0807250515588,
          "greenLng": -111.602401435375,
          "frontLat": 40.080734816892,
          "frontLng": -111.602274700999,
          "backLat": 40.0807060852476,
          "backLng": -111.60253085196,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688467,
              "courseHoleId": 82402,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.081046229518,
              "lng": -111.600723713636,
              "par": 3,
              "yards": 160,
              "meters": 146,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688466,
              "courseHoleId": 82402,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0810852222662,
              "lng": -111.600873917341,
              "par": 3,
              "yards": 148,
              "meters": 135,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688465,
              "courseHoleId": 82402,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0810000538664,
              "lng": -111.601085811853,
              "par": 3,
              "yards": 126,
              "meters": 115,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688468,
              "courseHoleId": 82402,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.0809969754885,
              "lng": -111.600641906261,
              "par": 3,
              "yards": 166,
              "meters": 151,
              "hcp": 16,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        },
        {
          "hole": 18,
          "courseHoleId": 82403,
          "courseId": 19002,
          "greenLat": 40.0831815626669,
          "greenLng": -111.598324477672,
          "frontLat": 40.083031256902,
          "frontLng": -111.5985558182,
          "backLat": 40.0833411369859,
          "backLng": -111.598119959235,
          "pinLat": null,
          "pinLng": null,
          "pinExpires": null,
          "teeBoxes": [
            {
              "courseHoleTeeBoxId": 21688471,
              "courseHoleId": 82403,
              "teeTypeId": 2,
              "teeType": "champion",
              "teeColorTypeId": 3,
              "teeColorType": "blue",
              "lat": 40.0810103151249,
              "lng": -111.602784991265,
              "par": 5,
              "yards": 492,
              "meters": 449,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": "#6e869e"
            },
            {
              "courseHoleTeeBoxId": 21688470,
              "courseHoleId": 82403,
              "teeTypeId": 3,
              "teeType": "men",
              "teeColorTypeId": 2,
              "teeColorType": "white",
              "lat": 40.0810944573874,
              "lng": -111.602516770363,
              "par": 5,
              "yards": 465,
              "meters": 425,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": "#ffffff"
            },
            {
              "courseHoleTeeBoxId": 21688469,
              "courseHoleId": 82403,
              "teeTypeId": 4,
              "teeType": "women",
              "teeColorTypeId": 8,
              "teeColorType": "yellow",
              "lat": 40.0811478158414,
              "lng": -111.602345108986,
              "par": 5,
              "yards": 448,
              "meters": 409,
              "hcp": 2,
              "hcp2": null,
              "teeHexColor": "#fffc00"
            }
          ],
          "changeLocations": [
            {
              "courseHoleTeeBoxId": 21688472,
              "courseHoleId": 82403,
              "teeTypeId": 5,
              "teeType": "auto change location",
              "teeColorTypeId": null,
              "teeColorType": null,
              "lat": 40.080747626417,
              "lng": -111.603455543519,
              "par": 5,
              "yards": 562,
              "meters": 513,
              "hcp": 4,
              "hcp2": null,
              "teeHexColor": null
            }
          ]
        }
      ]
    }
]
}
];

