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
