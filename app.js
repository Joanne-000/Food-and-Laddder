/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
const game = {
  players: 2, // revert to default
  avatar: ["Burgerman", "Friesman", "Pizzaman", "Hotdogman"],
  difficultyLevel: ["Easy", "Medium", "Hard"],
  boxNumber: [30, 60, 100],
  boardRow: [6, 6, 10],
  rottenNchicken: [1, 3, 5],
  isSound: true,
  isMusic: true,
  message: "", // revert to default
  modeChose: "", // revert to default
  levelChosen: "", // revert to default
  levelBoxes: "", // revert to default
  rowOnBoard: "", // revert to default
  renderOnBoard: 0, // revert to default
  gameTurn: 0, // revert to default
  rotten: [], // revert to default
  toilet: [], // revert to default
  chicken: [], // revert to default
  ladder: [], // revert to default
};

const players = []; // revert to default

/*------------------------ Cached Element References ------------------------*/
const burgerAva = document.getElementById("burger");
const friesAva = document.getElementById("fries");
const pizzaAva = document.getElementById("pizza");
const hotdogAva = document.getElementById("hotdog");
const chsburger = document.getElementById("chsburger");
const chsfries = document.getElementById("chsfries");
const chspizza = document.getElementById("chspizza");
const chshotdog = document.getElementById("chshotdog");
const P3 = document.querySelector(".player3");
const P4 = document.querySelector(".player4");
const P3pizza = document.querySelector(".pizza");
const P4hotdog = document.querySelector(".hotdog");

const Cover = document.getElementById("coverPage");
const coverStartBtn = document.getElementById("coverStart");
const playersNo = document.getElementById("PNo");
const easy = document.getElementById("easy");
const med = document.getElementById("med");
const hard = document.getElementById("hard");
const infoBtn = document.getElementById("info");
const infoBoard = document.querySelector(".moreInfo");
const exitBtn = document.getElementById("close");

const gameboard = document.getElementById("board");
const Board = document.getElementById("boardBody");
const boardStartBtn = document.getElementById("start");
const boardHomeBtn = document.getElementById("home");
const message = document.getElementById("messagesplace");
const diceResult = document.getElementById("diceresult");
const diceroll = document.getElementById("dice");
const winPopup = document.getElementById("winpic");

const soundEffect = document.getElementById("sound");

/*----------------------------- Cover -----------------------------*/
// players number selection
const player3display = () => {
  P3.style.display = "flex";
  chspizza.style.display = "inline-block";
  pizzaAva.style.display = "flex";
  P3pizza.style.display = "flex";
};
const player4display = () => {
  P4.style.display = "flex";
  chshotdog.style.display = "inline-block";
  hotdogAva.style.display = "flex";
  P4hotdog.style.display = "flex";
};
const player3hide = () => {
  P3.style.display = "none";
  chspizza.style.display = "none";
  pizzaAva.style.display = "none";
  P3pizza.style.display = "none";
};
const player4hide = () => {
  P4.style.display = "none";
  chshotdog.style.display = "none";
  hotdogAva.style.display = "none";
  P4hotdog.style.display = "none";
};

const playerNumber = () => {
  playersNo.addEventListener("change", (e) => {
    game.players = Number(e.target.value);
    if (game.players === 2) {
      player3hide();
      player4hide();
    }
    if (game.players === 3) {
      player3display();
      player4hide();
    }
    if (game.players === 4) {
      player3display();
      player4display();
    }
  });
};

const addPlayerName = () => {
  for (let i = 0; i < game.players; i++) {
    let playerNo = i + 1;
    let playerID = "P" + playerNo;
    let playerName = document.getElementById(playerID).value;
    if (playerName === "") {
      players.push({
        name: "Player " + playerNo,
        avatar: game.avatar[i],
        currPos: 0,
      });
    } else {
      players.push({
        name: playerName,
        avatar: game.avatar[i],
        currPos: 0,
      });
    }
  }
};

const playerAvatar = () => {
  for (let i = 0; i < game.players; i++) {
    if (players[i].avatar === game.avatar[0]) {
      document.querySelector(".burger").textContent = players[i].name;
      burgerAva.style.display = "flex";
    }
    if (players[i].avatar === game.avatar[1]) {
      document.querySelector(".fries").textContent = players[i].name;
      friesAva.style.display = "flex";
    }
    if (players[i].avatar === game.avatar[2]) {
      document.querySelector(".pizza").textContent = players[i].name;
      pizzaAva.style.display = "flex";
    }
    if (players[i].avatar === game.avatar[3]) {
      document.querySelector(".hotdog").textContent = players[i].name;
      hotdogAva.style.display = "flex";
    }
  }
};

// enter game board
const toMain = () => {
  //push info and data
  addPlayerName();
  Cover.style.display = "none";
  Board.style.display = "block";
  infoBtn.style.display = "none";
  //generate new board
  generateboard();
  playerAvatar();
  game.message = "Game start! " + players[0].name + ", your turn.";
  renderMessage();
};

// for game reset
const removeBoard = () => {
  while (gameboard.firstChild) {
    gameboard.firstChild.remove();
  }
};

const clearPlayerPos = () => {
  for (let i = 0; i < game.players; i++) {
    players[i].currPos = 0;
  }
};

const homeRestartData = () => {
  game.players = 2;
  game.message = "";
  game.levelChosen = "";
  game.levelBoxes = "";
  game.renderOnBoard = 0;
  game.gameTurn = 0;
  game.rotten = [];
  game.toilet = [];
  game.chicken = [];
  game.ladder = [];
  players.length = 0;
  playersNo.value = 2;
  removeBoard();

  winPopup.style.display = "none";
  diceroll.disabled = false;

  player3hide();
  player4hide();
};

const restartData = () => {
  game.message = "";
  game.gameTurn = 0;
  game.rotten = [];
  game.toilet = [];
  game.chicken = [];
  game.ladder = [];
  removeBoard();
  clearPlayerPos();

  winPopup.style.display = "none";
  diceroll.disabled = false;
};

const backtoHome = () => {
  //reset prev data and board
  homeRestartData();
  //generate new board
  Cover.style.display = "flex";
  Board.style.display = "none";
};

const restartBtn = () => {
  //reset prev data and board
  restartData();
  //generate new board
  generateboard();
  playerAvatar();
  game.message = "Game start! " + players[0].name + ", your turn.";
  renderMessage();
};

// to create board
const rows = () => {
  let boardNo = game.levelBoxes;
  let row = game.rowOnBoard;

  for (let i = 0; i < row; i++) {
    let rowNum = "row" + (i + 1);
    let row = document.createElement("div");
    row.classList.add(rowNum);
    gameboard.prepend(row);
  }
};

const gameBoard = () => {
  let boardNo = game.levelBoxes;
  let row = game.rowOnBoard;
  let column = boardNo / row;

  for (let i = 0; i < boardNo; i++) {
    for (let j = 0; j < row; j++) {
      if (Math.floor(i / column) === j) {
        let rowNo = j + 1;
        let rowNum = ".row" + rowNo;
        let boxName = i + 1;

        const newSqr = document.createElement("div");
        const row = document.querySelector(rowNum);
        row.appendChild(newSqr);
        newSqr.classList.add("square");
        newSqr.setAttribute("id", boxName);
        newSqr.textContent = boxName;
      }
    }
  }
};

const gameboardStructure = () => {
  for (let i = 0; i < game.difficultyLevel.length; i++) {
    if (game.levelChosen === game.difficultyLevel[i]) {
      game.levelBoxes = game.boxNumber[i];
      game.rowOnBoard = game.boardRow[i];
      game.renderOnBoard = game.rottenNchicken[i];
    }
  }
};
const dice = () => {
  let result = Math.floor(Math.random() * 6) + 1;
  let picDice = "./assets/dice0" + result + ".jpg";
  let picDiceAlt = result + " dot";
  diceResult.setAttribute("src", picDice);
  diceResult.setAttribute("alt", picDiceAlt);

  updatePlayer(result);
  let curr = game.gameTurn % game.players;
  game.gameTurn += 1;
  playerTurn(curr);
};

// update game status and data
const updatePlayer = (result) => {
  let curr = game.gameTurn % game.players;
  players[curr].currPos += result;

  for (let i = 0; i < game.chicken.length; i++) {
    if (players[curr].currPos === game.rotten[i]) {
      players[curr].currPos = game.toilet[i];
    } else if (players[curr].currPos === game.chicken[i]) {
      players[curr].currPos = game.ladder[i];
    }
  }
  renderAvatar(players[curr].currPos, players[curr]);
};

const renderAvatar = (playerPos, player) => {
  let currBox = document.getElementById(player.currPos);
  let imgInBox = document.getElementById(player.avatar);

  if (playerPos >= game.levelBoxes) {
    let currBox = document.getElementById(game.levelBoxes);
    currBox.appendChild(imgInBox);
  } else if (player.currPos < game.levelBoxes) {
    if (game.gameTurn < game.players) {
      if (player.avatar === game.avatar[0]) {
        burgerAva.style.display = "none";
        createBurger(playerPos);
      } else if (player.avatar === game.avatar[1]) {
        friesAva.style.display = "none";
        createFries(playerPos);
      } else if (player.avatar === game.avatar[2]) {
        pizzaAva.style.display = "none";
        createPizza(playerPos);
      } else if (player.avatar === game.avatar[3]) {
        hotdogAva.style.display = "none";
        createHotdog(playerPos);
      }
    } else {
      currBox.appendChild(imgInBox);
    }
  }
};

const playerTurn = (curr) => {
  if (players[curr].currPos >= game.levelBoxes) {
    renderWin(curr);
  } else {
    let nextPlayer = game.gameTurn % game.players;
    game.message = "It's " + players[nextPlayer].name + " turn!";
    renderMessage();
  }
};

// generate position of rotten and chicken
const randomRotten = () => {
  let min = 10;
  let max = game.levelBoxes - 10;
  let rottenPos = Math.floor(Math.random() * (max - min + 1)) + min;
  game.rotten.push(rottenPos);
};
const randomChicken = () => {
  let min = 10;
  let max = game.levelBoxes - 10;
  let chickPos = Math.floor(Math.random() * (max - min + 1)) + min;
  game.chicken.push(chickPos);
};

const checkRottenPos = (rottenPos) => {
  for (let i = 0; i < game.rotten.length; i++) {
    if (rottenPos === game.rotten[i]) {
      return false;
    }
  }
  return true;
};
const checkChickenPos = (chickPos) => {
  for (let i = 0; i < game.rotten.length; i++) {
    if (chickPos === game.rotten[i]) {
      return false;
    }
  }
  for (let i = 0; i < game.chicken.length; i++) {
    if (chickPos === game.chicken[i]) {
      return false;
    }
  }
  return true;
};

const generateChicken = () => {
  for (let i = 0; i < game.renderOnBoard; i++) {
    let chickPos = 0;
    do {
      let min = 10;
      let max = game.levelBoxes - 10;
      chickPos = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (!checkChickenPos(chickPos));
    game.chicken.push(chickPos);
  }

  for (let i = 0; i < game.renderOnBoard; i++) {
    game.ladder[i] = game.chicken[i] + 8;
  }
  for (let i = 0; i < game.renderOnBoard; i++) {
    renderChick(game.chicken[i], game.ladder[i]);
  }
};

const generateRotten = () => {
  console.log("generate rotten", game.renderOnBoard);
  for (let i = 0; i < game.renderOnBoard; i++) {
    let rottenPos = 0;
    do {
      let min = 10;
      let max = game.levelBoxes - 10;
      rottenPos = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (!checkRottenPos(rottenPos));
    game.rotten.push(rottenPos);
  }

  for (let i = 0; i < game.renderOnBoard; i++) {
    game.toilet[i] = game.rotten[i] - 6;
  }
  for (let i = 0; i < game.renderOnBoard; i++) {
    renderRotten(game.rotten[i], game.toilet[i]);
  }
};

/*---------------------------- Render Functions --------------------------------*/

const renderRotten = (rottenPos, toiletPos) => {
  let rottenBox = document.getElementById(rottenPos);
  let rottenOnBoard = document.createElement("img");
  rottenOnBoard.setAttribute("src", "assets/rottenfood1.png");
  rottenOnBoard.setAttribute("alt", "Rottenfood");
  rottenOnBoard.classList.add("foods");
  rottenBox.appendChild(rottenOnBoard);

  let toiletBox = document.getElementById(toiletPos);
  let toiletOnBoard = document.createElement("img");
  toiletOnBoard.setAttribute("src", "assets/toiletbowl.png");
  toiletOnBoard.setAttribute("alt", "Toilet");
  toiletOnBoard.classList.add("foods");
  toiletBox.appendChild(toiletOnBoard);
};

const renderChick = (chickPos, ladderPos) => {
  let chickBox = document.getElementById(chickPos);
  let chickOnBoard = document.createElement("img");
  chickOnBoard.setAttribute("src", "assets/chicken.png");
  chickOnBoard.setAttribute("alt", "Chicken");
  chickOnBoard.setAttribute("id", "Chicken");
  chickOnBoard.classList.add("foods");
  chickBox.appendChild(chickOnBoard);

  let ladderBox = document.getElementById(ladderPos);
  let ladderOnBoard = document.createElement("img");
  ladderOnBoard.setAttribute("src", "assets/powerup.png");
  ladderOnBoard.setAttribute("alt", "Ladder");
  ladderOnBoard.setAttribute("id", "Ladder");
  ladderOnBoard.classList.add("foods");
  ladderBox.appendChild(ladderOnBoard);
};

const createBurger = (playerPos) => {
  console.log("gameboard", gameboard);
  console.log("playerPos", player);
  console.log("player.currPos", playerPos);

  let currBox = document.getElementById(playerPos);

  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "assets/burger.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[0]);
  currAvaOnBoard.setAttribute("id", game.avatar[0]);
  currAvaOnBoard.classList.add("avatar");
  console.log("currBox", currBox);

  console.log("playerPos", players);
  currBox.appendChild(currAvaOnBoard);
};
const createFries = (playerPos) => {
  let currBox = document.getElementById(playerPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "assets/fries_sunglass.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[1]);
  currAvaOnBoard.setAttribute("id", game.avatar[1]);
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};
const createPizza = (playerPos) => {
  let currBox = document.getElementById(playerPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "assets/pizzaman.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[2]);
  currAvaOnBoard.setAttribute("id", game.avatar[2]);
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};
const createHotdog = (playerPos) => {
  let currBox = document.getElementById(playerPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "assets/hotdogman.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[3]);
  currAvaOnBoard.setAttribute("id", game.avatar[3]);
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};

const renderMessage = () => {
  message.textContent = game.message;
};

const renderWin = (curr) => {
  game.message = players[curr].name + " WIN!!!";
  message.textContent = game.message;
  winPopup.style.display = "flex";
  diceroll.disabled = true;
  return;
};

/*----------------------------Add Event Listeners-------------------------*/

boardHomeBtn.addEventListener("click", backtoHome);
boardStartBtn.addEventListener("click", restartBtn);
diceroll.addEventListener("click", dice);

infoBtn.addEventListener("click", () => {
  infoBoard.style.display = "flex";
  Cover.style.display = "none";
  Board.style.display = "none";
});
exitBtn.addEventListener("click", () => {
  infoBoard.style.display = "none";
  Cover.style.display = "flex";
  Board.style.display = "none";
});
easy.addEventListener("click", () => {
  game.levelChosen = "Easy";
  console.log(game.levelChosen);
  gameboardStructure();
  coverStartBtn.disabled = false;
});
med.addEventListener("click", () => {
  game.levelChosen = "Medium";
  gameboardStructure();
  coverStartBtn.disabled = false;
});
hard.addEventListener("click", () => {
  game.levelChosen = "Hard";
  gameboardStructure();
  coverStartBtn.disabled = false;
});

const oopsEffect = new Audio("assets/sounds/oops.mp3");
oopsEffect.crossOrigin = "anonymous";
const yayEffect = new Audio("assets/sounds/yay.mp3");
yayEffect.crossOrigin = "anonymous";
const winEffect = new Audio("assets/sounds/win.mp3");
winEffect.crossOrigin = "anonymous";

// const playOops = oopsEffect.play();
soundEffect.addEventListener("click", () => {
  oopsEffect.volume = 0.5;
  oopsEffect.play();
  yayEffect.volume = 0.5;
  yayEffect.play();
  winEffect.volume = 0.5;
  winEffect.play();

  console.log("check");
});
/*-------------------------------- Functions --------------------------------*/
const cover = () => {
  playerNumber();
  coverStartBtn.addEventListener("click", toMain);
};
cover();

const generateboard = () => {
  rows();
  gameBoard();
  setTimeout(generateRotten(), 100);
  setTimeout(generateChicken(), 100);
};
