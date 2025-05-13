// import assert from "node:assert";

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
const game = {
  players: 2,
  playerTurn: "",
  difficultyLevel: [0, 1, 2], // extract level here
  dice: [1, 2, 3, 4, 5, 6],
  badFood: [14],
  toilet: [], // do separate array for the badfood and toilet
  goodFood: [18],
  ladder: [], // do separate array for the goodfood and ladder
  message: "Game start! Please type your name and select your avatar~",
  isSound: true,
  isMusic: true,
  isWin: true,
};

const players = [
  { player: "Your name", avatar: "", currPos: 0 },
  { player: "Computer", avatar: "", currPos: 0 },
];

/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById("board");
const burgerAva = document.getElementById("burger");
const friesAva = document.getElementById("fries");
const diceroll = document.getElementById("dice");
const diceResult = document.getElementById("diceresult");
const winPopup = document.getElementById("winpic");

// input couldnt work
const playerNameInput = document.querySelector("#playername");
playerNameInput.addEventListener("blur", () => {
  players[0].player = playerNameInput.value;
});
// console.log(playerNameInput.value);

/*----------------------------- Event Listeners -----------------------------*/
const rows = () => {
  for (let i = 0; i < 6; i++) {
    let rowNum = "row" + i;
    let row = document.createElement("div");
    row.classList.add("row" + (i + 1));
    board.prepend(row);
  }
};
rows();

const gameBoard = () => {
  for (let i = 0; i < 30; i++) {
    if (i < 5) {
      const newSqr = document.createElement("div");
      const row1 = document.querySelector(".row1");
      row1.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.textContent = boxName;
    } else if (i > 4 && i < 10) {
      const newSqr = document.createElement("div");
      const row2 = document.querySelector(".row2");
      row2.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.textContent = boxName;
    } else if (i > 9 && i < 15) {
      const newSqr = document.createElement("div");
      const row3 = document.querySelector(".row3");
      row3.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.textContent = boxName;
    } else if (i > 14 && i < 20) {
      const newSqr = document.createElement("div");
      const row4 = document.querySelector(".row4");
      row4.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.textContent = boxName;
    } else if (i > 19 && i < 25) {
      const newSqr = document.createElement("div");
      const row5 = document.querySelector(".row5");
      row5.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.textContent = boxName;
    } else {
      const newSqr = document.createElement("div");
      const row6 = document.querySelector(".row6");

      row6.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.textContent = boxName;
    }
  }
};
gameBoard();

const playerAvatar = () => {
  const chsburger = document.getElementById("chsburger");
  const chsfries = document.getElementById("chsfries");

  chsburger.addEventListener("click", () => {
    chsburger.style.width = "80px";
    chsfries.style.width = "40px";
    // game.playerName = playerNameInput;
    players[0].avatar = "Burgerman";
    players[1].avatar = "Friesman";

    game.message =
      "Hey " + players[0].player + ", you choose Burger Man. You go first.";
    game.playerTurn = players[0].player;
    renderMessage();
  });
  chsfries.addEventListener("click", () => {
    chsfries.style.width = "80px";
    chsburger.style.width = "40px";
    // game.playerName = playerNameInput;
    players[0].avatar = "Friesman";
    players[1].avatar = "Burgerman";
    game.message =
      "Hey " + players[0].player + ", you choose Fries Man. You go first.";
    game.playerTurn = players[0].player;
    renderMessage();
  });
};
playerAvatar();

const dice = () => {
  diceroll.addEventListener("click", () => {
    let result = Math.floor(Math.random() * 6) + 1;

    let picDice = "./pictures/dice0" + result + ".jpg";
    let picDiceAlt = result + " dot";

    diceResult.setAttribute("src", picDice);
    diceResult.setAttribute("alt", picDiceAlt);
    // console.log(game.playerTurn);
    // console.log(players[0].player);

    if (game.playerTurn === players[0].player) {
      game.playerTurn = players[1].player;
      console.log(game.playerTurn);
      game.message = "It's " + game.playerTurn + " turn!";
      renderWin();
    } else if (game.playerTurn === players[1].player) {
      game.playerTurn = players[0].player;
      console.log(game.playerTurn);
      game.message = "It's " + game.playerTurn + " turn!";
      renderWin();
      console.log("player2", game.message);
      return game.playerTurn;
    }
  });
};

dice();
/*---------------------------- Render Functions --------------------------------*/
const renderRotten = () => {
  const message = document.getElementById("messagesplace");
  message.textContent = game.message;
  console.log(winPopup);

  winPopup.setAttribute("src", "/_bun/asset/0fda551cd5770e0a.png");
  winPopup.setAttribute("alt", "You win!");
};

// renderWin();

const renderWin = () => {
  const message = document.getElementById("messagesplace");
  message.textContent = game.message;
  console.log(winPopup);

  winPopup.setAttribute("src", "./pictureswin2.png");
  winPopup.setAttribute("alt", "You win!");
};

renderWin();

const renderMessage = () => {
  const message = document.getElementById("messagesplace");
  message.textContent = game.message;
};

renderMessage();
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
