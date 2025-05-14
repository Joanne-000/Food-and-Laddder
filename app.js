// import assert from "node:assert";

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
const game = {
  players: 2,
  avatar: ["Burgerman", "Friesman"],
  playerTurn: "",
  difficultyLevel: "", // extract level here
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

/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById("board");
const burgerAva = document.getElementById("burger");
const friesAva = document.getElementById("fries");
const diceroll = document.getElementById("dice");
const message = document.getElementById("messagesplace");
const diceResult = document.getElementById("diceresult");
const playersName = document.getElementById("input");
const nameSubmit = document.getElementById("playersubmit");

/*----------------------------- Event Listeners -----------------------------*/
// const playerNameInput = () => {
//   nameSubmit.addEventListener("click", () => {
//     for (let i = 0; i < game.players; i++) {
//       let playerNo = i + 1;
//       let playerID = "P" + playerNo;
//       let playerName = document.getElementById(playerID).value;
//       if (playerName != "") {
//         players[i].player = playerName;
//       } else {
//         players[i].player = "Player " + playerNo;
//       }
//     }
//     // return;
//   });
// };
const level = () => {
  const easy = document.getElementById("easy");
  const med = document.getElementById("med");
  const hard = document.getElementById("hard");

  easy.addEventListener("click", () => {
    game.difficultyLevel = "easy";
  });
};
level();

console.log(game.difficultyLevel);

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

const rows = () => {
  for (let i = 0; i < 6; i++) {
    let rowNum = "row" + i;
    let row = document.createElement("div");
    row.classList.add("row" + (i + 1));
    board.prepend(row);
  }
};
rows();

const gameBoardEasy = () => {
  for (let i = 0; i < 30; i++) {
    if (i < 5) {
      const newSqr = document.createElement("div");
      const row1 = document.querySelector(".row1");
      row1.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i > 4 && i < 10) {
      const newSqr = document.createElement("div");
      const row2 = document.querySelector(".row2");
      row2.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i > 9 && i < 15) {
      const newSqr = document.createElement("div");
      const row3 = document.querySelector(".row3");
      row3.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i > 14 && i < 20) {
      const newSqr = document.createElement("div");
      const row4 = document.querySelector(".row4");
      row4.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else if (i > 19 && i < 25) {
      const newSqr = document.createElement("div");
      const row5 = document.querySelector(".row5");
      row5.appendChild(newSqr);
      const boxName = i + 1;
      newSqr.classList.add("square");
      newSqr.setAttribute("id", boxName);
      newSqr.textContent = boxName;
    } else {
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
gameBoardEasy();
playerNameInput();

const playerAvatar = () => {
  const chsburger = document.getElementById("chsburger");
  const chsfries = document.getElementById("chsfries");

  chsburger.addEventListener("click", () => {
    chsburger.style.width = "80px";
    chsfries.style.width = "40px";
    // game.playerName = playerNameInput;
    players[0].avatar = "Burgerman";
    players[1].avatar = "Friesman";

    document.querySelector(".burger").textContent = players[0].player;
    document.querySelector(".fries").textContent = players[1].player;

    game.playerTurn = players[0].player;
    game.message =
      "Hey " + players[0].player + ", you choose Burger Man. You roll first.";
    renderMessage();
    return;
  });

  chsfries.addEventListener("click", () => {
    chsfries.style.width = "80px";
    chsburger.style.width = "40px";
    // game.playerName = playerNameInput;
    players[0].avatar = "Friesman";
    players[1].avatar = "Burgerman";

    document.querySelector(".fries").textContent = players[0].player;
    document.querySelector(".burger").textContent = players[1].player;

    game.playerTurn = players[0].player;
    game.message =
      "Hey " + players[0].player + ", you choose Fries Man. You roll first.";
    renderMessage();
    return;
  });
};
playerAvatar();

const posTurnUpdate = (result) => {
  const player1 = players[0];
  const player2 = players[1];

  if (game.playerTurn === player1.player) {
    player1.currPos += result;
    game.playerTurn = player2.player;
    game.message = "It's " + game.playerTurn + " turn!";
    // let currBox = document.getElementById(players[0].currPos)

    let currentPos = player1.currPos;
    if (player1.avatar === "Burgerman") {
      burgerAva.style.display = "none";
      renderBurger(currentPos);
    } else if (player1.avatar === "Friesman") {
      renderFries(currentPos);
    }
    renderMessage();

    // console.log(players[0].currPos);
    // console.log(game.playerTurn);
    // console.log(game.message);
    // console.log(game, players);
  } else if (game.playerTurn === player2.player) {
    player2.currPos = player2.currPos + result;
    game.playerTurn = player1.player;
    game.message = "It's " + game.playerTurn + " turn!";

    let currentPos = player2.currPos;
    if (player2.avatar === "Burgerman") {
      burgerAva.style.display = "none";
      renderBurger(currentPos);
    } else if (player1.avatar === "Friesman") {
      friesAva.style.display = "none";
      renderFries(currentPos);
    }

    renderMessage();

    // console.log(players[1].currPos);
    // console.log(game.playerTurn);
    // console.log(game.message);
    // console.log(game, players);
  }
};

//   //   }

const dice = () => {
  diceroll.addEventListener("click", () => {
    let result = Math.floor(Math.random() * 6) + 1;

    let picDice = "./pictures/dice0" + result + ".jpg";
    let picDiceAlt = result + " dot";

    diceResult.setAttribute("src", picDice);
    diceResult.setAttribute("alt", picDiceAlt);

    // let currPos = player[i].currPos
    posTurnUpdate(result);
  });
};

dice();
/*---------------------------- Render Functions --------------------------------*/
const renderRotten = () => {
  winPopup.setAttribute("src", "");
  winPopup.setAttribute("alt", "Rotten food");
};
if (players[0].avatar === "Burgerman") {
}
const renderBurger = (currentPos) => {
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "pictures/burger.png");
  currAvaOnBoard.setAttribute("alt", "Burgerman");
  currAvaOnBoard.classList.add("avatar");
  let currBox = document.getElementById(currentPos);
  currBox.appendChild(currAvaOnBoard);
};
const renderFries = (currentPos) => {
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "pictures/fries_sunglass.png");
  currAvaOnBoard.setAttribute("alt", "Friesman");
  currAvaOnBoard.classList.add("avatar");
  let currBox = document.getElementById(currentPos);
  currBox.appendChild(currAvaOnBoard);
};
// renderRotten();
let boardBoxes = document.querySelectorAll(".square");

// const currAva = () => {
//   //   if (game.difficultyLevel === "easy") {
//   // let currBox = document.getElementById(players[j].currPos);
//   for (let i = 0; i < 30; i++) {
//     if (Number(boardBoxes[i].textContent) === players[j].currPos) {
//       // boardBoxes[i].textContent = "testing";
//       // if (players[j].currPos !== 0) {
//       //     players[j].prevPos = players[j].currPos
//       // }
//       if (players[0].avatar === "Burgerman") {
//         burgerAva.style.display = "none";
//         renderBurger(j);
//         break;
//       } else if (players[0].avatar === "Friesman") {
//         friesAva.style.display = "none";
//         renderFries(j);
//         break;
//       }
//     }
//   }

//   //   }
// };
// console.log(game.difficultyLevel);
// console.log(game.players);

// console.log(players);
console.log(boardBoxes);

// console.log(players[0].currPos);
// console.log(players[1].currPos);

//   const currAvatar = () => {
//     let boardBox = document.querySelector(".board");

//     if (boardBox.textContent === player[0].currPos) {
//       let currAvatarOnBoard = document.createElement("img");
//       currAvatarOnBoard.classList.add("boardAvatar");
//       newSqr.appendChild(currAvatarOnBoard);
//       if (player[0].avatar === "Friesman") {
//         currAvatarOnBoard.setAttribute("src", "pictures\fries_sunglass.png");
//       } else {
//         currAvatarOnBoard.setAttribute("src", "pictures/burger.png");
//       }
//     }
//   };
//   currAvatar();

//   const renderAvatar = () => {
//     const boardBox = document.getElementById("board");
//   };

//   winPopup.setAttribute("src", "");
//   winPopup.setAttribute("alt", "Rotten food");
// };

const renderWin = () => {
  const winPopup = document.getElementById("winpic");
  game.message = game.playerTurn + " WIN!!!";
  message.textContent = game.message;

  winPopup.setAttribute("src", "./pictureswin2.png");
  winPopup.setAttribute("alt", "You win!");
};

// renderWin();

const renderMessage = () => {
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
