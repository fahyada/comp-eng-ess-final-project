let currFairyTile;
let currBeeTile;
let score = 0;
let gameOver = false;
let playerName = "";



//window.onload = function() {
    //getPlayerName(); // Call the function to prompt player for their name
//}
function startGame() {
    playerName = document.getElementById("playerName").value.trim();
    playerNewName = document.getElementById("playerNewName").value.trim();


    if (playerName === "" && playerNewName === "") {
        alert("Please enter your name to start the game.");
        return;
    }

    // Hide the playerNameContainer
    //document.getElementById("playerNameContainer").style.display = "none";


    document.getElementById("lobbyWindow").style.display = "none";
    document.getElementById("gameWindow").style.display = "block";
    if (playerName === "") {
        document.getElementById("playerNameDisplay").textContent = "Welcome, " + playerNewName + "!";
    }
    if (playerNewName === "") {
        document.getElementById("playerNameDisplay").textContent = "Welcome, " + playerName + "!";
    }
    //document.getElementById("playerNameDisplay").textContent = "Welcome, " + playerName + "!";

    // Start the game
    setGame();
    //document.getElementById("startGameButton").disabled = true;
}

function displayWelcomeMessage() {
    let welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Welcome, " + playerName + "!";
    document.getElementById("playerNameContainer").style.display = "block"; // Make sure container is visible
    document.getElementById("playerNameContainer").appendChild(welcomeMessage);
}


function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setFairy, 1000); // 1000 miliseconds = 1 second, every 1 second call setFairy
    setInterval(setBee, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setBee
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setFairy() {
    if (gameOver) {
        return;
    }
    if (currFairyTile) {
        currFairyTile.innerHTML = "";
    }
    let fairy = document.createElement("img");
    fairy.src = "./fairy.png";

    let num = getRandomTile();
    if (currBeeTile && currBeeTile.id == num) {
        return;
    }
    currFairyTile = document.getElementById(num);
    currFairyTile.appendChild(fairy);
}

function setBee() {
    if (gameOver) {
        return;
    }
    if (currBeeTile) {
        currBeeTile.innerHTML = "";
    }
    let bee = document.createElement("img");
    bee.src = "./bee.png";

    let num = getRandomTile();
    if (currFairyTile && currFairyTile.id == num) {
        return;
    }
    currBeeTile = document.getElementById(num);
    currBeeTile.appendChild(bee);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currFairyTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
    }
    else if (this == currBeeTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
}