let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let playerName = "";



//window.onload = function() {
    //getPlayerName(); // Call the function to prompt player for their name
//}
function startGame() {
    playerName = document.getElementById("playerName").value.trim();

    if (playerName === "") {
        alert("Please enter your name to start the game.");
        return;
    }

    // Hide the playerNameContainer
    document.getElementById("playerNameContainer").style.display = "none";

    // Display welcome message
    displayWelcomeMessage();

    // Start the game
    setGame();
}

//function getPlayerName() {
   // playerName = prompt("Please enter your name:"); // Prompt the player to enter their name

    //if (playerName === null || playerName.trim() === "") {
        // If the player cancels or enters an empty name, ask again
       // getPlayerName();
    //} else {
        // If the player provides a name, start the game
       // displayWelcomeMessage();
        //setGame();
    //}
//}
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
    setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./fairy.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./bee.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
}