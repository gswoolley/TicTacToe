//setting up the gameBoard Module
let gameBoardModule = (() => {
  let gameBoard = [];
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [0, 4, 8],
  ];
  console.log(gameBoard);
  const markPosition = (position, playerMarker) => {
    gameBoard[position] = playerMarker;
  };
  return { markPosition, gameBoard, WINNING_COMBINATIONS };
})();

//setting up the display controller module

let displayController = (() => {
  const X_CLASS = "x";
  const CIRCLE_CLASS = "circle";
  let circleTurn;

  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });

  function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMarker(cell, currentClass);
    console.log("clicked");
    gameBoardModule.markPosition(cell.dataset.number, currentClass);
    console.log(gameBoardModule.gameBoard);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
    }
    //check for draw
  }

  function checkWin(currentClass) {
    return gameBoardModule.WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return gameBoardModule.gameBoard[index] == currentClass;
      });
    });
  }

  function endGame(draw) {
    if (draw) {
      console.log("Draw!");
    } else {
      console.log(circleTurn ? "O Wins" : "X Wins");
      //console.log(`${currentClass} won`);
    }
  }

  function isDraw() {
    return [...cells].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
      );
    });
  }

  function placeMarker(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    circleTurn = !circleTurn;
  }

  return {};
})();

let createPlayer = (playerName, playerNumber, assignedXO) => {
  let getPlayerName = () => {
    playerName;
    console.log("My name is " + playerName);
  };
  return { getPlayerName, playerName, playerNumber, assignedXO };
};

let Joe = createPlayer("Joe", 1, "X");
