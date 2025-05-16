// import assert from "node:assert";

/*---------------------------- Variables (state) ----------------------------*/
const game = {
  players: 2,
  avatar: ["Burgerman", "Friesman", "Pizzaman", "Hotdogman"],
  playerTurn: "",
  gameTurn: 0,
  difficultyLevel: ["Easy", "Medium", "Hard"],
  levelchosen: "",
  boxNumber: [30, 50, 100],
  levelboxes: "", // extract level here
  rotten: [],
  toilet: [], // do separate array for the badfood and toilet
  chicken: [],
  ladder: [], // do separate array for the goodfood and ladder
  message:
    "Game start! Please type your name and Player 1 to select your avatar~",
  isSound: true,
  isMusic: true,
  isWin: true,
};

const players = [];

/*------------------------ Cached Element References ------------------------*/
const boardEasy = document.getElementById("boardEasy");
const burgerAva = document.getElementById("burger");
const friesAva = document.getElementById("fries");
const pizzaAva = document.getElementById("pizza");
const hotdogAva = document.getElementById("hotdog");

const diceroll = document.getElementById("dice");
const message = document.getElementById("messagesplace");
const diceResult = document.getElementById("diceresult");
const playersName = document.getElementById("input");
const nameSubmit = document.getElementById("playersubmit");
const playersNo = document.getElementById("PNo");
const hideCover = document.getElementById("coverPage");
const showBoard = document.getElementById("boardBody");
const P3 = document.querySelector(".player3");
const P4 = document.querySelector(".player4");
const chsburger = document.getElementById("chsburger");
const chsfries = document.getElementById("chsfries");
const chspizza = document.getElementById("chspizza");
const chshotdog = document.getElementById("chshotdog");

/*----------------------------- Cover -----------------------------*/

const playerNumber = () => {
  playersNo.addEventListener("change", (e) => {
    game.players = Number(e.target.value);
    if (game.players === 3) {
      P3.style.display = "flex";
      chspizza.style.display = "inline-block";
      pizzaAva.style.display = "flex";
    }
    if (game.players === 4) {
      P4.style.display = "flex";
      chshotdog.style.display = "inline-block";
      hotdogAva.style.display = "flex";
    }
    // players.length = 0;
  });
};

const pushPlayerName = () => {
  for (let i = 0; i < game.players; i++) {
    let playerNo = i + 1;
    let playerID = "P" + playerNo;
    let playerName = document.getElementById(playerID).value;
    if (playerName === "") {
      players.push({
        player: "Player " + playerNo,
        avatar: game.avatar[i],
        currPos: 0,
      });
    } else {
      players.push({
        player: playerName,
        avatar: game.avatar[i],
        currPos: 0,
      });
    }
  }
};
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

// console.log(easy);
// console.log(med);

// console.log(hard);

// const easy = document.getElementById("easy");
// const med = document.getElementById("med");
// const hard = document.getElementById("hard");

// easy.addEventListener("click", () => {
//   game.levelchosen = "easy";
// });
// med.addEventListener("click", () => {
//   game.levelchosen = "med";
// });
// hard.addEventListener("click", () => {
//   game.levelchosen = "hard";
// });

const playerAvatar = () => {
  document.querySelector(".burger").textContent = players[0].player;
  document.querySelector(".fries").textContent = players[1].player;
  document.querySelector(".pizza").textContent = players[2].player;
  document.querySelector(".hotdog").textContent = players[3].player;
};

// game.message =
//     "Hey " +
//     players[i].player +
//     ", you are " +
//     players[i].avatar +
//     " . It's your turn.";
//   renderMessage();

// playerAvatar();

const cover = () => {
  playerNumber();
  // level();
};
cover();

const toMain = () => {
  pushPlayerName();
  hideCover.style.display = "none";
  showBoard.style.display = "block";
  game.playerTurn = players[0].player;

  generateboard();
};

const startBtn = document.getElementById("coverStart");
startBtn.addEventListener("click", toMain);
/*----------------------------- Board -----------------------------*/
// const gameBoard = () => {
//   for (let i = 0; i < game.difficultyLevel.length; i++) {
//     if ((game.levelchosen = game.difficultyLevel[i]))
//       game.levelboxes = game.boxNumber[i];
//   }
// };

game.levelboxes = 30;

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

// not affected by adding players
const dice = () => {
  diceroll.addEventListener("click", () => {
    let result = Math.floor(Math.random() * 6) + 1;
    let picDice = "./pictures/dice0" + result + ".jpg";
    let picDiceAlt = result + " dot";
    diceResult.setAttribute("src", picDice);
    diceResult.setAttribute("alt", picDiceAlt);

    posTurnUpdate(result);
    game.gameTurn += 1;
  });
};
const posUpdate = (player, result) => {
  player.currPos += result;

  if (player.currPos === game.rotten[0]) {
    player.currPos = game.toilet[0];
  } else if (player.currPos === game.chicken[0]) {
    player.currPos = game.ladder[0];
  }
};

// const avatarUpdate = (playerPos, playerAva) => {
//   renderAvatar(playerPos, playerAva);
//   console.log("avaUpdate", playerPos);
// };
const renderAvatar = (playerPos, playerAva) => {
  let currBox = document.getElementById(playerPos);
  let imgInBox = document.getElementById(playerAva);
  console.log("curr Ava", playerAva);
  if (playerPos < game.levelboxes) {
    if (game.gameTurn < game.players) {
      if (playerAva === game.avatar[0]) {
        burgerAva.style.display = "none";
        createBurger(playerPos);
      } else if (playerAva === game.avatar[1]) {
        friesAva.style.display = "none";
        createFries(playerPos);
      } else if (playerAva === game.avatar[2]) {
        pizzaAva.style.display = "none";
        createPizza(playerPos);
      } else if (playerAva === game.avatar[3]) {
        hotdogAva.style.display = "none";
        createHotdog(playerPos);
      }
    } else {
      currBox.appendChild(imgInBox);
    }
    console.log(players);
  } else if (playerPos >= game.levelboxes) {
    let currBox = document.getElementById(game.levelboxes);
    currBox.appendChild(imgInBox);
    renderWin();
  }
};
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

const posTurnUpdate = (result) => {
  console.log("bef", game.playerTurn);
  if (game.playerTurn === players[0].player) {
    posUpdate(players[0], result);
    game.playerTurn = players[1].player;
    game.message = "It's " + game.playerTurn + " turn!";

    let playerPos = players[0].currPos;
    let playerAva = players[0].avatar;

    renderAvatar(playerPos, playerAva);
    renderMessage();
    console.log("aft BG", game.playerTurn);
    return;
  }
  if (game.playerTurn === players[1].player) {
    posUpdate(players[1], result);
    game.playerTurn = players[2].player;
    game.message = "It's " + game.playerTurn + " turn!";

    let playerPos = players[1].currPos;
    let playerAva = players[1].avatar;

    renderAvatar(playerPos, playerAva);
    renderMessage();
    console.log("aft Fries", game.playerTurn);
    return;
  }
  if (game.playerTurn === players[2].player) {
    posUpdate(players[2], result);
    game.playerTurn = players[3].player;
    game.message = "It's " + game.playerTurn + " turn!";

    let playerPos = players[2].currPos;
    let playerAva = players[2].avatar;

    renderAvatar(playerPos, playerAva);
    renderMessage();
    console.log("aft Pizza", game.playerTurn);
    return;
  }
  if (game.playerTurn === players[3].player) {
    posUpdate(players[3], result);
    game.playerTurn = players[0].player;
    game.message = "It's " + game.playerTurn + " turn!";

    let playerPos = players[3].currPos;
    let playerAva = players[3].avatar;

    renderAvatar(playerPos, playerAva);
    renderMessage();
    console.log("aft HD", game.playerTurn);
    return;
  }
};
/*---------------------------- Render Functions --------------------------------*/

const renderRotten = () => {
  let min = 10;
  let max = game.levelboxes - 10;
  let rottenPos = Math.floor(Math.random() * (max - min + 1)) + min;
  game.rotten.push(rottenPos);
  let rottenBox = document.getElementById(rottenPos);
  let rottenOnBoard = document.createElement("img");
  rottenOnBoard.setAttribute("src", "pictures/rottenfood1.jpg");
  rottenOnBoard.setAttribute("alt", "Rottenfood");
  rottenOnBoard.setAttribute("id", "Rottenfood");
  rottenOnBoard.classList.add("foods");
  rottenBox.appendChild(rottenOnBoard);

  let toiletPos = rottenPos - 6;
  game.toilet.push(toiletPos);
  let toiletBox = document.getElementById(toiletPos);
  let toiletOnBoard = document.createElement("img");
  toiletOnBoard.setAttribute("src", "pictures/toiletbowl.png");
  toiletOnBoard.setAttribute("alt", "Toilet");
  toiletOnBoard.setAttribute("id", "Toilet");
  toiletOnBoard.classList.add("foods");
  toiletBox.appendChild(toiletOnBoard);
};

const renderChick = () => {
  let min = 10;
  let max = game.levelboxes - 10;
  let chickPos = Math.floor(Math.random() * (max - min + 1)) + min;
  game.chicken.push(chickPos);
  let chickBox = document.getElementById(chickPos);
  let chickOnBoard = document.createElement("img");
  chickOnBoard.setAttribute("src", "pictures/chicken.png");
  chickOnBoard.setAttribute("alt", "Chicken");
  chickOnBoard.setAttribute("id", "Chicken");
  chickOnBoard.classList.add("foods");
  chickBox.appendChild(chickOnBoard);

  let ladderPos = chickPos + 6;
  game.ladder.push(ladderPos);
  let ladderBox = document.getElementById(ladderPos);
  let ladderOnBoard = document.createElement("img");
  ladderOnBoard.setAttribute("src", "pictures/powerup.png");
  ladderOnBoard.setAttribute("alt", "Ladder");
  ladderOnBoard.setAttribute("id", "Ladder");
  ladderOnBoard.classList.add("foods");
  ladderBox.appendChild(ladderOnBoard);
};

const createBurger = (playerPos) => {
  let currBox = document.getElementById(playerPos);
  let currAvaOnBoard = document.createElement("img");
  currAvaOnBoard.setAttribute("src", "pictures/burger.png");
  currAvaOnBoard.setAttribute("alt", game.avatar[0]);
  currAvaOnBoard.setAttribute("id", game.avatar[0]);
  currAvaOnBoard.classList.add("avatar");
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
  currAvaOnBoard.setAttribute("src", "pictures/hotdogman.jpg");
  currAvaOnBoard.setAttribute("alt", game.avatar[3]);
  currAvaOnBoard.setAttribute("id", game.avatar[3]);
  currAvaOnBoard.classList.add("avatar");
  currBox.appendChild(currAvaOnBoard);
};

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
const renderMessage = () => {
  message.textContent = game.message;
};

const renderWin = () => {
  const winPopup = document.getElementById("winpic");
  game.message = game.playerTurn + " WIN!!!";
  message.textContent = game.message;
  winPopup.setAttribute("src", "pictures/win2.png");
  winPopup.setAttribute("alt", "You win!");

  diceroll.disabled = true;
};

/*-------------------------------- Functions --------------------------------*/
const generateboard = () => {
  rows6();
  gameBoardEasy();

  setTimeout(renderRotten(), 300);
  setTimeout(renderChick(), 300);
  dice();
};

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
