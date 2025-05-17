// import assert from "node:assert";
/*-------------------------------- Constants --------------------------------*/
const avatars = {
  Burgerman: { src: "pictures/burger.png", alt: "Burgerman", id: "burger" },
  Friesman: {
    src: "pictures/fries_sunglass.png",
    alt: "Friesman",
    id: "fries",
  },
  Pizzaman: { src: "pictures/pizzaman.png", alt: "Pizzaman", id: "pizza" },
  Hotdogman: { src: "pictures/hotdogman.png", alt: "Hotdogman", id: "hotdog" },
};

const difficultyMode = {
  Easy: { boardBox: 30, row: 6, numRotten: 1, numChicken: 1 },
  Medium: { boardBox: 60, row: 6, numRotten: 3, numChicken: 3 },
  Hard: { boardBox: 100, row: 10, numRotten: 5, numChicken: 5 },
};
/*---------------------------- Variables (state) ----------------------------*/
const game = {
  players: 2, // revert to default
  avatar: ["Burgerman", "Friesman", "Pizzaman", "Hotdogman"],
  difficultyLevel: ["Easy", "Medium", "Hard"],
  boxNumber: [30, 60, 100],
  boardRow: [6, 6, 10],
  isSound: true,
  isMusic: true,
  isWin: true,
  message: "", // revert to default
  levelChosen: "", // revert to default
  levelBoxes: "", // revert to default
  rowOnBoard: "", // revert to default
  gameTurn: 0, // revert to default
  rotten: [], // revert to default
  toilet: [], // revert to default
  chicken: [], // revert to default
  ladder: [], // revert to default
};

const players = [];

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
const playersName = document.getElementById("input");
// const nameSubmit = document.getElementById("playersubmit");
const playersNo = document.getElementById("PNo");
const easy = document.getElementById("easy");
const med = document.getElementById("med");
const hard = document.getElementById("hard");

const gameboard = document.getElementById("board");
const boardchild = gameboard.children;
const Board = document.getElementById("boardBody");
const boardStartBtn = document.getElementById("start");
const boardHomeBtn = document.getElementById("home");
const message = document.getElementById("messagesplace");
const diceResult = document.getElementById("diceresult");
const diceroll = document.getElementById("dice");
const winPopup = document.getElementById("winpic");

/*----------------------------- Cover -----------------------------*/
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

const pushPlayerName = () => {
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
      document.querySelector(".burger").textContent = players[i].player;
      burgerAva.style.display = "flex";
    }
    if (players[i].avatar === game.avatar[1]) {
      document.querySelector(".fries").textContent = players[i].player;
      friesAva.style.display = "flex";
    }
    if (players[i].avatar === game.avatar[2]) {
      document.querySelector(".pizza").textContent = players[i].player;
      pizzaAva.style.display = "flex";
    }
    if (players[i].avatar === game.avatar[3]) {
      document.querySelector(".hotdog").textContent = players[i].player;
      hotdogAva.style.display = "flex";
    }
  }
};

const toMain = () => {
  //push info and data
  pushPlayerName();
  Cover.style.display = "none";
  Board.style.display = "block";
  //generate new board
  generateboard();
  playerAvatar();
  game.message = "Game start! " + players[0].name + ", your turn.";
  renderMessage();
};

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

const startRestartData = () => {
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

const StartBtn = () => {
  //reset prev data and board
  startRestartData();
  //generate new board
  generateboard();
  playerAvatar();
  game.message = "Game start! " + players[0].name + ", your turn.";
  renderMessage();
};

/*----------------------------- Board -----------------------------*/

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
    }
  }
};
// not affected by adding players
const dice = () => {
  let result = Math.floor(Math.random() * 6) + 1;
  let picDice = "./pictures/dice0" + result + ".jpg";
  let picDiceAlt = result + " dot";
  diceResult.setAttribute("src", picDice);
  diceResult.setAttribute("alt", picDiceAlt);
  console.log("result", result);

  updatePlayer(result);
  let curr = game.gameTurn % game.players;
  game.gameTurn += 1;
  playerTurn(curr);
};

const updatePlayer = (result) => {
  console.log("game.gameTurn", game.gameTurn);

  let curr = game.gameTurn % game.players;
  console.log("curr", curr);

  players[curr].currPos += result;
  console.log("players", players);

  for (let i = 0; i < game.chicken.length; i++) {
    if (players[curr].currPos === game.rotten[i]) {
      players[curr].currPos = game.toilet[i];
    } else if (players[curr].currPos === game.chicken[i]) {
      players[curr].currPos = game.ladder[i];
    }
  }
  console.log("players", players);
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
    renderWin();
  } else {
    let nextPlayer = game.gameTurn % game.players;
    game.message = "It's " + players[nextPlayer].name + " turn!";
    renderMessage();
  }
};
// const posUpdate = (player, result) => {
//   player.currPos += result;
//   for (let i = 0; i < game.chicken.length; i++) {
//     if (player.currPos === game.rotten[i]) {
//       player.currPos = game.toilet[i];
//     } else if (player.currPos === game.chicken[i]) {
//       player.currPos = game.ladder[i];
//     }
//   }
// };

// const renderAvatar = (player) => {
//   let currBox = document.getElementById(player.currPos);
//   let imgInBox = document.getElementById(player.avatar);

//   if (player.currPos >= game.levelBoxes) {
//     let currBox = document.getElementById(game.levelBoxes);
//     currBox.appendChild(imgInBox);
//   } else if (player.currPos < game.levelBoxes) {
//     if (game.gameTurn < game.players) {
//       if (player.avatar === game.avatar[0]) {
//         burgerAva.style.display = "none";
//         createBurger(player.currPos);
//       } else if (player.avatar === game.avatar[1]) {
//         friesAva.style.display = "none";
//         createFries(player.currPos);
//       } else if (player.avatar === game.avatar[2]) {
//         pizzaAva.style.display = "none";
//         createPizza(player.currPos);
//       } else if (player.avatar === game.avatar[3]) {
//         hotdogAva.style.display = "none";
//         createHotdog(player.currPos);
//       }
//     } else {
//       currBox.appendChild(imgInBox);
//     }
//   }
// };

// const posTurnUpdate = (result) => {
//   for (let i = 0; i < game.players; i++) {
//     console.log("players", players);
//     let currPlayer;
//     if (game.gameTurn < game.players) {
//       currPlayer = game.gameTurn;
//     } else {
//       currPlayer = game.gameTurn % game.players;
//     }

//     posUpdate(players[currPlayer], result);
//     renderAvatar(players[currPlayer], players[currPlayer]);
//   }
// };

/*---------------------------- Render Functions --------------------------------*/
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

const generateRottenNChicken = () => {
  randomRotten();
  randomChicken();
  if (game.levelChosen === game.difficultyLevel[1]) {
    randomRotten();
    randomChicken();
  }
  if (game.levelChosen === game.difficultyLevel[2]) {
    randomRotten();
    randomRotten();
    randomChicken();
    randomChicken();
  }

  for (let i = 0; i < game.rotten.length; i++) {
    for (let j = 0; j < game.rotten.length; j++) {
      if (game.rotten[i] === game.rotten[j]) {
        game.rotten[j] = game.rotten[j] + 1;
      }
      if (game.chicken[i] === game.chicken[j]) {
        game.chicken[j] = game.chicken[j] + 1;
      }
      if (game.chicken[i] === game.rotten[j]) {
        game.chicken[i] = game.chicken[j] + 1;
      }
    }
  }

  for (let i = 0; i < game.chicken.length; i++) {
    game.toilet[i] = game.rotten[i] - 6;
    game.ladder[i] = game.chicken[i] + 8;
  }
  for (let i = 0; i < game.chicken.length; i++) {
    renderRotten(game.rotten[i], game.toilet[i]);
    renderChick(game.chicken[i], game.ladder[i]);
  }
};

const renderRotten = (rottenPos, toiletPos) => {
  let rottenBox = document.getElementById(rottenPos);
  let rottenOnBoard = document.createElement("img");
  rottenOnBoard.setAttribute("src", "pictures/rottenfood1.jpg");
  rottenOnBoard.setAttribute("alt", "Rottenfood");
  // rottenOnBoard.setAttribute("id", "Rottenfood");
  rottenOnBoard.classList.add("foods");
  rottenBox.appendChild(rottenOnBoard);

  let toiletBox = document.getElementById(toiletPos);
  let toiletOnBoard = document.createElement("img");
  toiletOnBoard.setAttribute("src", "pictures/toiletbowl.png");
  toiletOnBoard.setAttribute("alt", "Toilet");
  // toiletOnBoard.setAttribute("id", "Toilet");
  toiletOnBoard.classList.add("foods");
  toiletBox.appendChild(toiletOnBoard);
};

const renderChick = (chickPos, ladderPos) => {
  let chickBox = document.getElementById(chickPos);
  let chickOnBoard = document.createElement("img");
  chickOnBoard.setAttribute("src", "pictures/chicken.png");
  chickOnBoard.setAttribute("alt", "Chicken");
  chickOnBoard.setAttribute("id", "Chicken");
  chickOnBoard.classList.add("foods");
  chickBox.appendChild(chickOnBoard);

  let ladderBox = document.getElementById(ladderPos);
  let ladderOnBoard = document.createElement("img");
  ladderOnBoard.setAttribute("src", "pictures/powerup.png");
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
  currAvaOnBoard.setAttribute("src", "pictures/burger.png");
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
  currAvaOnBoard.setAttribute("src", "pictures/fries_sunglass.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[1]);
  currAvaOnBoard.setAttribute("id", game.avatar[1]);
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};
const createPizza = (playerPos) => {
  let currBox = document.getElementById(playerPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "pictures/pizzaman.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[2]);
  currAvaOnBoard.setAttribute("id", game.avatar[2]);
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};
const createHotdog = (playerPos) => {
  let currBox = document.getElementById(playerPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "pictures/hotdogman.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[3]);
  currAvaOnBoard.setAttribute("id", game.avatar[3]);
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};

const renderMessage = () => {
  message.textContent = game.message;
};

const renderWin = () => {
  game.message = game.playerTurn + " WIN!!!";
  message.textContent = game.message;
  winPopup.style.display = "flex";

  diceroll.disabled = true;
  return;
};

/*----------------------------Add Event Listeners-------------------------*/

boardHomeBtn.addEventListener("click", backtoHome);
boardStartBtn.addEventListener("click", StartBtn);
diceroll.addEventListener("click", dice);

easy.addEventListener("click", () => {
  game.levelChosen = "Easy";
  gameboardStructure();
});
med.addEventListener("click", () => {
  game.levelChosen = "Medium";
  gameboardStructure();
});
hard.addEventListener("click", () => {
  game.levelChosen = "Hard";
  gameboardStructure();
});

/*-------------------------------- Functions --------------------------------*/
const cover = () => {
  playerNumber();
  // level();

  coverStartBtn.addEventListener("click", toMain);
};
cover();

const generateboard = () => {
  // rows6();
  // gameBoardEasy();
  rows();
  gameBoard();

  setTimeout(generateRottenNChicken, 100);
};
// const checkDuplicate = () => {
//   for (let i = 0; i < game.rotten.length; i++) {
//     for (let j = 0; j < game.rotten.length; j++) {
//       if (game.rotten[i] === game.rotten[j]) {
//         return false;
//       }
//       return true;
//     }
//   }
// };
// do {
//   let min = 10;
//   let max = game.levelBoxes - 10;
//   let chickPos = Math.floor(Math.random() * (max - min + 1)) + min;
// } while (!checkDuplicate(chickPos));
// game.rotten.push(rottenPos);

// const renderRotten = () => {
//   let min = 10;
//   let max = game.levelBoxes - 10;
//   let rottenPos = Math.floor(Math.random() * (max - min + 1)) + min;
//   game.rotten.push(rottenPos);

//   for (let i = 0; i < game.rotten.length; i++) {
//     for (let j = i + 1; j < game.rotten.length; j++) {
//       if (game.rotten[i] === game.rotten[j]) {
//         game.rotten[j] = j + 1;
//       }
//     }
//   }

//   let rottenBox = document.getElementById(rottenPos);
//   let rottenOnBoard = document.createElement("img");
//   rottenOnBoard.setAttribute("src", "pictures/rottenfood1.jpg");
//   rottenOnBoard.setAttribute("alt", "Rottenfood");
//   rottenOnBoard.setAttribute("id", "Rottenfood");
//   rottenOnBoard.classList.add("foods");
//   rottenBox.appendChild(rottenOnBoard);

//   let toiletPos = rottenPos - 6;
//   game.toilet.push(toiletPos);
//   let toiletBox = document.getElementById(toiletPos);
//   let toiletOnBoard = document.createElement("img");
//   toiletOnBoard.setAttribute("src", "pictures/toiletbowl.png");
//   toiletOnBoard.setAttribute("alt", "Toilet");
//   toiletOnBoard.setAttribute("id", "Toilet");
//   toiletOnBoard.classList.add("foods");
//   toiletBox.appendChild(toiletOnBoard);
// };

// const renderChick = () => {
//   let min = 10;
//   let max = game.levelBoxes - 10;
//   let chickPos = Math.floor(Math.random() * (max - min + 1)) + min;
//   game.chicken.push(chickPos);

//   for (let i = 0; i < game.chicken.length; i++) {
//     for (let j = i + 1; j < game.chicken.length; j++) {
//       if (game.chicken[i] === game.chicken[j]) {
//         game.chicken[j] = j + 1;
//       }
//     }
//   }

//   for (let i = 0; i < game.chicken.length; i++) {
//     for (let j = 0; j < game.rotten.length; j++) {
//       if (game.chicken[i] === game.rotten[j]) {
//         game.chicken[i] + 1;
//       }
//     }
//   }

//   let chickBox = document.getElementById(chickPos);
//   let chickOnBoard = document.createElement("img");
//   chickOnBoard.setAttribute("src", "pictures/chicken.png");
//   chickOnBoard.setAttribute("alt", "Chicken");
//   chickOnBoard.setAttribute("id", "Chicken");
//   chickOnBoard.classList.add("foods");
//   chickBox.appendChild(chickOnBoard);

//   let ladderPos = chickPos + 8;
//   game.ladder.push(ladderPos);
//   let ladderBox = document.getElementById(ladderPos);
//   let ladderOnBoard = document.createElement("img");
//   ladderOnBoard.setAttribute("src", "pictures/powerup.png");
//   ladderOnBoard.setAttribute("alt", "Ladder");
//   ladderOnBoard.setAttribute("id", "Ladder");
//   ladderOnBoard.classList.add("foods");
//   ladderBox.appendChild(ladderOnBoard);
// };

// for (let i = 0; i < game.rotten.length; i++) {
//   for (let j = 0; j < game.rotten.length; j++) {
//     if (game.rotten[i] === game.rotten[j]) {
//       game.rotten[j] = j + 1;
//     }
//   }
// }

// for (let i = 0; i < game.chicken.length; i++) {
//   for (let j = 0; j < game.chicken.length; j++) {
//     if (game.chicken[i] === game.chicken[j]) {
//       game.chicken[j] = j + 1;
//     }
//   }
// }

// for (let i = 0; i < game.chicken.length; i++) {
//   for (let j = 0; j < game.rotten.length; j++) {
//     if (game.chicken[i] === game.rotten[j]) {
//       game.chicken[i] + 1;
//     }
//   }
// }
// const playerNameInput = () => {
//   for (let i = 0; i < game.players; i++) {
//     let playerNo = i + 1;
//     let playerID = "P" + playerNo;

//     players[i].player = document.getElementById(playerID);
//   }
// };
// console.log("aft", players);

// const playerNameInput = () => {
//   console.log("bef", game.players);

//   for (let i = 0; i < game.players; i++) {
//     let playerNo = i + 1;
//     let playerID = "P" + playerNo;
//     let playerName = document.getElementById(playerID);

//     playerName.addEventListener("change", (event) => {
//       players[i].player = event.target.value;
//       console.log("aft", players);
//     });
//   }
// };
// playerNameInput();

// const gameBoardEasy = () => {
//   let boardNo = 30;
//   let row = 6;

//   for (let i = 0; i < boardNo; i++) {
//     if (i < boardNo / 6) {
//       const newSqr = document.createElement("div");
//       const row1 = document.querySelector(".row1");
//       row1.appendChild(newSqr);
//       const boxName = i + 1;
//       newSqr.classList.add("square");
//       newSqr.setAttribute("id", boxName);
//       newSqr.textContent = boxName;
//     } else if (i < (boardNo / 6) * 2) {
//       const newSqr = document.createElement("div");
//       const row2 = document.querySelector(".row2");
//       row2.appendChild(newSqr);
//       const boxName = i + 1;
//       newSqr.classList.add("square");
//       newSqr.setAttribute("id", boxName);
//       newSqr.textContent = boxName;
//     } else if (i < (boardNo / 6) * 3) {
//       const newSqr = document.createElement("div");
//       const row3 = document.querySelector(".row3");
//       row3.appendChild(newSqr);
//       const boxName = i + 1;
//       newSqr.classList.add("square");
//       newSqr.setAttribute("id", boxName);
//       newSqr.textContent = boxName;
//     } else if (i < (boardNo / 6) * 4) {
//       const newSqr = document.createElement("div");
//       const row4 = document.querySelector(".row4");
//       row4.appendChild(newSqr);
//       const boxName = i + 1;
//       newSqr.classList.add("square");
//       newSqr.setAttribute("id", boxName);
//       newSqr.textContent = boxName;
//     } else if (i < (boardNo / 6) * 5) {
//       const newSqr = document.createElement("div");
//       const row5 = document.querySelector(".row5");
//       row5.appendChild(newSqr);
//       const boxName = i + 1;
//       newSqr.classList.add("square");
//       newSqr.setAttribute("id", boxName);
//       newSqr.textContent = boxName;
//     } else if (i < (boardNo / 6) * 6) {
//       const newSqr = document.createElement("div");
//       const row6 = document.querySelector(".row6");
//       row6.appendChild(newSqr);
//       const boxName = i + 1;
//       newSqr.classList.add("square");
//       newSqr.setAttribute("id", boxName);
//       newSqr.textContent = boxName;
//     }
//   }
// };

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

// const avatarUpdate = (playerAva, playerPos) => {
//   if (playerAva === "Burgerman") {
//     renderBurger(playerPos, playerAva);
//   } else if (playerAva === "Friesman") {
//     renderFries(playerPos, playerAva);
//   } else if (playerAva === "Pizzaman") {
//     renderPizza(playerPos, playerAva);
//   } else if (playerAva === "Hotdogmanman") {
//     renderHotdog(playerPos, playerAva);
//   }
//   console.log("avaUpdate", playerPos);
// };

// const posTurnUpdate = (result) => {
//   console.log("bef", game.playerTurn);
//   if (game.playerTurn === players[0].player) {
//     posUpdate(players[0], result);

//     let playerPos = players[0].currPos;
//     let playerAva = players[0].avatar;
//     renderAvatar(playerPos, playerAva);

//     game.playerTurn = players[1].player;

//     console.log("aft BG", game.playerTurn);
//     return;
//   }
//   if (game.playerTurn === players[1].player) {
//     posUpdate(players[1], result);

//     let playerPos = players[1].currPos;
//     let playerAva = players[1].avatar;
//     renderAvatar(playerPos, playerAva);

//     game.playerTurn = players[2].player;

//     console.log("aft Fries", game.playerTurn);
//     return;
//   }
//   if (game.playerTurn === players[2].player) {
//     posUpdate(players[2], result);

//     let playerPos = players[2].currPos;
//     let playerAva = players[2].avatar;
//     renderAvatar(playerPos, playerAva);

//     game.playerTurn = players[3].player;

//     console.log("aft Pizza", game.playerTurn);
//     return;
//   }
//   if (game.playerTurn === players[3].player) {
//     posUpdate(players[3], result);

//     let playerPos = players[3].currPos;
//     let playerAva = players[3].avatar;
//     renderAvatar(playerPos, playerAva);

//     game.playerTurn = players[0].player;

//     console.log("aft HD", game.playerTurn);
//     return;
//   }
// };

// const renderBurger = (playerPos, playerAva) => {
//   burgerAva.style.display = "none";
//   let currBox = document.getElementById(playerPos);
//   let imgInBox = document.getElementById(playerAva);

//   if (playerPos <= game.levelchosen) {
//     if (game.gameTurn < 2) {
//       createBurger(playerPos);
//     } else {
//       currBox.appendChild(imgInBox);
//     }
//   } else if (playerPos > game.levelchosen) {
//     let currBox = document.getElementById("30");
//     currBox.appendChild(imgInBox);
//     renderWin();
//   }
// };

// const renderFries = (playerPos, playerAva) => {
//   friesAva.style.display = "none";
//   let currBox = document.getElementById(playerPos);
//   let imgInBox = document.getElementById(playerAva);
//   if (playerPos <= game.levelchosen) {
//     if (game.gameTurn < 2) {
//       createFries(playerPos);
//     } else {
//       currBox.appendChild(imgInBox);
//     }
//   } else if (playerPos > game.levelchosen) {
//     let currBox = document.getElementById("30");
//     currBox.appendChild(imgInBox);
//     renderWin();
//   }
// };
// const renderPizza = (playerPos, playerAva) => {
//   burgerAva.style.display = "none";
//   let currBox = document.getElementById(playerPos);
//   let imgInBox = document.getElementById(playerAva);

//   if (playerPos <= game.levelchosen) {
//     if (game.gameTurn < 2) {
//       createBurger(playerPos);
//     } else {
//       currBox.appendChild(imgInBox);
//     }
//   } else if (playerPos > game.levelchosen) {
//     let currBox = document.getElementById("30");
//     currBox.appendChild(imgInBox);
//     renderWin();
//   }
// };

// const renderHotdog = (playerPos, playerAva) => {
//   friesAva.style.display = "none";
//   let currBox = document.getElementById(playerPos);
//   let imgInBox = document.getElementById(playerAva);
//   if (playerPos <= game.levelchosen) {
//     if (game.gameTurn < 2) {
//       createFries(playerPos);
//     } else {
//       currBox.appendChild(imgInBox);
//     }
//   } else if (playerPos > game.levelchosen) {
//     let currBox = document.getElementById("30");
//     currBox.appendChild(imgInBox);
//     renderWin();
//   }
// };
