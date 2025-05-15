// import assert from "node:assert";

/*---------------------------- Variables (state) ----------------------------*/
const game = {
  players: 2,
  diceRoll: 0,
  avatar: ["Burgerman", "Friesman"],
  playerTurn: "",
  difficultyLevel: "easy",
  boxNumber: 30, // extract level here
  dice: [1, 2, 3, 4, 5, 6],
  badFood: [14],
  toilet: [], // do separate array for the badfood and toilet
  goodFood: [18],
  ladder: [], // do separate array for the goodfood and ladder
  message:
    "Game start! Please type your name and Player 1 to select your avatar~",
  isSound: true,
  isMusic: true,
  isWin: true,
};

const players = [
  { player: "Player 1", avatar: "", prevPos: 0, currPos: 0 },
  { player: "Player 2", avatar: "", prevPos: 0, currPos: 0 },
];
/*-------------
------------------- Constants --------------------------------*/
const player1 = players[0];
const player2 = players[1];

/*------------------------ Cached Element References ------------------------*/
const boardEasy = document.getElementById("boardEasy");
const burgerAva = document.getElementById("burger");
const friesAva = document.getElementById("fries");
const diceroll = document.getElementById("dice");
const message = document.getElementById("messagesplace");
const diceResult = document.getElementById("diceresult");
const playersName = document.getElementById("input");
const nameSubmit = document.getElementById("playersubmit");

/*----------------------------- Event Listeners -----------------------------*/
const level = () => {
  const easy = document.getElementById("easy");
  const med = document.getElementById("med");
  const hard = document.getElementById("hard");

  easy.addEventListener("click", () => {
    game.difficultyLevel = "easy";

    //add disabled
  });
};
level();

const playerNumber = () => {
  for (let i = 2; i < game.players; i++) {
    if ((i = 3)) {
      game.avatar.push("Pizzaman");
      players.push({ player: "Player " + i, avatar: "", currPos: 0 });
    }

    if ((i = 4)) {
      game.avatar.push("Pizzaman");
      players.push({ player: "Player " + i, avatar: "", currPos: 0 });
    }
  }
};

const playerNameInput = () => {
  for (let i = 0; i < game.players; i++) {
    let playerNo = i + 1;
    let playerID = "P" + playerNo;
    let playerName = document.getElementById(playerID);
    playerName.addEventListener("change", (event) => {
      players[i].player = event.target.value;
    });
  }
};

const rows6 = () => {
  for (let i = 0; i < 6; i++) {
    let rowNum = "row" + i;
    let row = document.createElement("div");
    row.classList.add("row" + (i + 1));
    boardEasy.prepend(row);
  }
};

const gameBoardEasy = () => {
  let boardNo = 30;
  let row = 6;

  for (let i = 0; i < boardNo; i++) {
    if (i < boardNo / 6) {
      const newSqr = document.createElement("div");
      const row1 = document.querySelector(".row1");
      row1.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i < (boardNo / 6) * 2) {
      const newSqr = document.createElement("div");
      const row2 = document.querySelector(".row2");
      row2.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i < (boardNo / 6) * 3) {
      const newSqr = document.createElement("div");
      const row3 = document.querySelector(".row3");
      row3.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i < (boardNo / 6) * 4) {
      const newSqr = document.createElement("div");
      const row4 = document.querySelector(".row4");
      row4.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i < (boardNo / 6) * 5) {
      const newSqr = document.createElement("div");
      const row5 = document.querySelector(".row5");
      row5.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i < (boardNo / 6) * 6) {
      const newSqr = document.createElement("div");
      const row6 = document.querySelector(".row6");
      row6.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    }
  }
};
rows6();
gameBoardEasy();
playerNameInput();

const playerAvatar = () => {
  const chsburger = document.getElementById("chsburger");
  const chsfries = document.getElementById("chsfries");
  chsburger.addEventListener("click", () => {
    chsburger.style.width = "80px";
    chsfries.style.width = "40px";
    player1.avatar = "Burgerman";
    player2.avatar = "Friesman";
    document.querySelector(".burger").textContent = player1.player;
    document.querySelector(".fries").textContent = player2.player;
    game.playerTurn = player1.player;
    game.message =
      "Hey " + player1.player + ", you choose Burger Man. You roll first.";
    renderMessage();
    return;
  });

  chsfries.addEventListener("click", () => {
    chsfries.style.width = "80px";
    chsburger.style.width = "40px";
    player1.avatar = "Friesman";
    player2.avatar = "Burgerman";
    document.querySelector(".fries").textContent = player1.player;
    document.querySelector(".burger").textContent = player2.player;
    game.playerTurn = player1.player;
    game.message =
      "Hey " + player1.player + ", you choose Fries Man. You roll first.";
    renderMessage();
    return;
  });
};
playerAvatar();

// not affected by adding players
const dice = () => {
  diceroll.addEventListener("click", () => {
    let result = Math.floor(Math.random() * 6) + 1;
    let picDice = "./pictures/dice0" + result + ".jpg";
    let picDiceAlt = result + " dot";
    diceResult.setAttribute("src", picDice);
    diceResult.setAttribute("alt", picDiceAlt);
    posTurnUpdate(result);
    game.diceRoll += 1;
  });
};
dice();

const posTurnUpdate = (result) => {
  if (game.playerTurn === player1.player) {
    player1.currPos += result;
    game.playerTurn = player2.player;
    game.message = "It's " + game.playerTurn + " turn!";
    let currentPos = player1.currPos;
    let prevAva = player1.avatar;
    if (player1.avatar === "Burgerman") {
      renderBurger(currentPos, prevAva);
    } else if (player1.avatar === "Friesman") {
      renderFries(currentPos, prevAva);
    }

    renderMessage();
  } else if (game.playerTurn === player2.player) {
    player2.currPos = player2.currPos + result;
    game.playerTurn = player1.player;
    game.message = "It's " + game.playerTurn + " turn!";
    let currentPos = player2.currPos;
    let prevAva = player2.avatar;
    if (player2.avatar === "Burgerman") {
      renderBurger(currentPos, prevAva);
    } else if (player1.avatar === "Friesman") {
      renderFries(currentPos, prevAva);
    }
    renderMessage();
  }
};
/*---------------------------- Render Functions --------------------------------*/
const renderRotten = () => {
  let min = 10;
  let max = game.boxNumber - 10;
  let rottenPos = Math.floor(Math.random() * (max - min + 1)) + min;
  let rottenBox = document.getElementById(rottenPos);
  let rottenOnBoard = document.createElement("img");
  rottenOnBoard.setAttribute("src", "pictures/rottenfood1.jpg");
  rottenOnBoard.setAttribute("alt", "Rottenfood");
  rottenOnBoard.setAttribute("id", "Rottenfood");
  rottenOnBoard.classList.add("foods");
  rottenBox.appendChild(rottenOnBoard);

  let toiletPos = rottenPos - 6;
  let toiletBox = document.getElementById(toiletPos);
  let toiletOnBoard = document.createElement("img");
  toiletOnBoard.setAttribute("src", "pictures/rottenfood1.jpg");
  toiletOnBoard.setAttribute("alt", "Toilet");
  toiletOnBoard.setAttribute("id", "Toilet");
  toiletOnBoard.classList.add("foods");
  toiletBox.appendChild(toiletOnBoard);
};
renderRotten();

const renderChick = () => {
  let min = 10;
  let max = game.boxNumber - 10;
  let chickPos = Math.floor(Math.random() * (max - min + 1)) + min;
  let chickBox = document.getElementById(chickPos);
  let chickOnBoard = document.createElement("img");
  chickOnBoard.setAttribute("src", "pictures/chicken.png");
  chickOnBoard.setAttribute("alt", "Chicken");
  chickOnBoard.setAttribute("id", "Chicken");
  chickOnBoard.classList.add("foods");
  chickBox.appendChild(chickOnBoard);

  let ladderPos = chickPos + 6;
  let ladderBox = document.getElementById(ladderPos);
  let ladderOnBoard = document.createElement("img");
  ladderOnBoard.setAttribute("src", "pictures/rottenfood1.jpg");
  ladderOnBoard.setAttribute("alt", "Ladder");
  ladderOnBoard.setAttribute("id", "Ladder");
  ladderOnBoard.classList.add("foods");
  ladderBox.appendChild(ladderOnBoard);
};
renderChick();

const createBurger = (currentPos) => {
  let currBox = document.getElementById(currentPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "pictures/burger.png");
  currAvaOnBoard.setAttribute("alt", "Burgerman");
  currAvaOnBoard.setAttribute("id", "Burgerman");
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};
const createFries = (currentPos) => {
  let currBox = document.getElementById(currentPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "pictures/fries_sunglass.png");
  currAvaOnBoard.setAttribute("alt", "Friesman");
  currAvaOnBoard.setAttribute("id", "Friesman");
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};

const renderBurger = (currentPos, prevAva) => {
  burgerAva.style.display = "none";
  let currBox = document.getElementById(currentPos);
  let imgInBox = document.getElementById(prevAva);
  if (currentPos <= 30) {
    if (game.diceRoll < 2) {
      createBurger(currentPos);
    } else {
      currBox.appendChild(imgInBox);
    }
  } else if (currentPos > 30) {
    let currBox = document.getElementById("30");
    currBox.appendChild(imgInBox);
    renderWin();
  }
};

const renderFries = (currentPos, prevAva) => {
  friesAva.style.display = "none";
  let currBox = document.getElementById(currentPos);
  let imgInBox = document.getElementById(prevAva);
  if (currentPos <= 30) {
    if (game.diceRoll < 2) {
      createFries(currentPos);
    } else {
      currBox.appendChild(imgInBox);
    }
  } else if (currentPos > 30) {
    let currBox = document.getElementById("30");
    currBox.appendChild(imgInBox);
    renderWin();
  }
};

const renderMessage = () => {
  message.textContent = game.message;
};

renderMessage();

const renderWin = () => {
  const winPopup = document.getElementById("winpic");
  game.message = game.playerTurn + " WIN!!!";
  message.textContent = game.message;
  winPopup.setAttribute("src", "pictures/win2.png");
  winPopup.setAttribute("alt", "You win!");
};

/*-------------------------------- Functions --------------------------------*/

// if (result === 1) {
//   dice1();
// }
// if (result === 2) {
//   dice2();
// }
// if (result === 3) {
//   dice3();
// }
// if (result === 4) {
//   dice4();
// }
// if (result === 5) {
//   dice5();
// }
// if (result === 6) {
//   dice6();
// }

// const dice1 = () => {
//   diceresult.setAttribute("src", "pictures/dice01.jpg");
//   diceresult.setAttribute("alt", "1 dot");
// };
// const dice2 = () => {
//   diceresult.setAttribute("src", "pictures/dice02.jpg");
//   diceresult.setAttribute("alt", "2 dot");
// };
// const dice3 = () => {
//   diceresult.setAttribute("src", "pictures/dice03.jpg");
//   diceresult.setAttribute("alt", "3 dot");
// };
// const dice4 = () => {
//   diceresult.setAttribute("src", "pictures/dice04.jpg");
//   diceresult.setAttribute("alt", "4 dot");
// };
// const dice5 = () => {
//   diceresult.setAttribute("src", "pictures/dice05.jpg");
//   diceresult.setAttribute("alt", "5 dot");
// };
// const dice6 = () => {
//   diceresult.setAttribute("src", "pictures/dice06.jpg");
//   diceresult.setAttribute("alt", "6 dot");
// };

const main = () => {};
