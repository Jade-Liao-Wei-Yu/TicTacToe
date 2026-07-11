/*
Game Flow

1. Start the game
2. Player clicks a cell
3. Place X or O in the selected cell
4. Check for a winner
   - If a winner is found, end the game

5. Check for a draw
   - If the board is full and there is no winner, end the game as a draw

6. If there is no winner and no draw
   - Switch to the next player
   - Continue playing
*/


const cells = document.querySelectorAll(".cell"); //<button class="cell"></button>
// get NodeList(9)
// 0 ->first cell
// 1 -> 2nd cell
// 2 -> 3rd cell
// 3 -> 4th cell
// 4 -> 5th cell
// 5 -> 6th cell
// 6 -> 7th cell
// 7 -> 8th cell
// 8 -> 9th cell

const currentPlayerText = document.querySelector("#current-player");//<p id="current-player">Current Player: X</p>
const statusText = document.querySelector("#status");//<p id="status">Game in Progress</p>
const newGameButton = document.querySelector("#new-game");//<button id="new-game">New Game</button>

let currentPlayer = "X"; 
// currentPlayer variable is used to keep track of whose turn it is.
// X always starts the game.

let board = ["", "", "", "", "", "", "", "", ""];
// The game board is stored in a JavaScript array with 9 elements. 
// Each element represents one square and stores either "X", "O", or an empty string.
// Empty string = empty square
// "X" = occupied by player X
// "O" = occupied by player O
// Board Layout:
// 0 | 1 | 2
// ---------
// 3 | 4 | 5
// ---------
// 6 | 7 | 8

let gameActive = true;


/* ========================================================================
AI prompt:

My game board is stored in an array with 9 positions.

The winning index combinations are:

(0,1,2)
(3,4,5)
(6,7,8)
(0,3,6)
(1,4,7)
(2,5,8)
(0,4,8)
(2,4,6)

How can I store these winning combinations in JavaScript and use them to check if a player has won the game?
==================================================================================== */


const winningCombinations = 
  [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal
    [2, 4, 6]  // diagonal
  ];
// const winningCombinations represents all possible winning patterns.
// Each number represents an index
// in the board array.
// Example:
// [0,1,2] = top row
// [0,4,8] = diagonal
// The game checks these combinations
// after every move to determine if
// a player has won.


function handleCellClick(event) 
// Handle player clicks on a board cell.
// This function:
// 1. Determines which cell was clicked
// 2. Prevents moves on occupied cells
// 3. Places the current player's symbol
// 4. Checks for a winner or draw
// 5. Switches to the next player
  {
    const cell = event.target;
    // event.target refers to the HTML element that triggered the event. In this game, it is the cell button that the player clicked.


    // AI prompt: how can I get the index of the clicked cell in the board array if I have a NodeList of cells?
    // since const cells = document.querySelectorAll(".cell"); returns a NodeList, we can use Array.from() to convert it into an array.
    // Thus, we have [cell0,cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8]

    const index = Array.from(cells).indexOf(cell);
    // Find the board position that corresponds
    // to the clicked cell.
    // Example:
    // Top-left cell = index 0
    // Center cell = index 4
    // Bottom-right cell = index 8

    if (board[index] !== "" || gameActive === false) {
      return;
    }
    // check if the clicked cell is already occupied or if the game is over?
    // if so, stop the move and return early from the function.


    board[index] = currentPlayer;
    // Save the current player's symbol
    // into the board array.

    cell.textContent = currentPlayer;
    // Update the visual board.

    checkResult();
    // Check all winning combinations
    // to determine whether a player
    // has won the game.
  
    if (gameActive) 
    // if the game is still active, then we do the following to switch to the next player and update the current player text on the screen
    {
      currentPlayer = currentPlayer === "X" ? "O" : "X";//switch to the next player
      // If the current player is "X", set currentPlayer to "O"; otherwise, set it to "X"
      // Equivalent to: if (currentPlayer === "X") { currentPlayer = "O" } else { currentPlayer = "X" }

      currentPlayerText.textContent = `Current Player: ${currentPlayer}`;//update the current player text on the screen
    }
  }

  function checkResult() 
  // define a function checkResult() appears previously, it is used to check if a player has won the game or if the game is a draw
    {
      for (let combination of winningCombinations) 
      // for(let combination of winningCombinations) is equivalent to for(let i = 0; i < winningCombinations.length; i++) 
      // { const combination = winningCombinations[i]; } 
        {
          const [a, b, c] = combination;
          // Extract the three board indexes
          // from the current winning combination.
          // we are going to check if the values in the board array at these indexes are the same and not empty.

            if (
              board[a] !== "" &&
              board[a] === board[b] &&
              board[b] === board[c]) 
            // A player wins when:
            // 1. The positions are not empty
            // 2. All three positions contain the same symbol (X or O)
            // if the conditions are met, we do the following
              {
                statusText.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                return;
              }
          }

      if (!board.includes(""))
      // If there are no empty spaces left
      // and no winner was found,which we have checked previously, then
      // the game is a draw.  
        {
          statusText.textContent = "It's a draw!";
          gameActive = false;
        }
    }

function resetGame() 
// define a function resetGame() appears previously, it is used to reset the game state and start a new game
  {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    currentPlayerText.textContent = "Current Player: X";
    statusText.textContent = "Game in Progress";

    cells.forEach(function(cell) {
      cell.textContent = "";
    });
  }


cells.forEach(function(cell) 
  {
    cell.addEventListener("click", handleCellClick);
  });
// Add click event listeners to each cell in the game board.

newGameButton.addEventListener("click", resetGame);
// Add click event listener to the "New Game" button to reset the game when clicked.
