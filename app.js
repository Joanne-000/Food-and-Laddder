/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
const game = {
  playerTurn: "A",
  dice: [1, 2, 3, 4, 5, 6],
  badFood: [14, 8],
  goodFood: [28, 18],
  message: "Game start! Please select your avatar~",
  isSound: true,
  isMusic: true,
  isWin: true,
};

const players = [
  { player1: "", avatar: "", currPos: 0 },
  { player2: "Player Comp", avatar: "", currPos: 0 },
];

/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById("board");
const burgerAva = document.getElementById("burger");
const friesAva = document.getElementById("fries");

/*----------------------------- Event Listeners -----------------------------*/

/*---------------------------- Render Functions --------------------------------*/
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

/*-------------------------------- Functions --------------------------------*/
const main = () => {
  gameBoard();
};

// main();
