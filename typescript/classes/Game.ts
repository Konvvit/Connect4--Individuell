import prompt from "../helpers/prompt.js";
import Board from './Board.js';
import Player from './Player.js';



export default class Game {
  board: Board;
  // Added compilerOptions: "strictPropertyInitialization": false to tsconfig.json to get rid of player error.
  playerX: Player;
  playerO: Player;



 constructor() {
        // When a new game is created, start the game    
    this.playGame();   
  }
    // Initialize a new game
    playGame(): void {
    this.board = new Board();
    this.createPlayers();
    this.startGameLoop(() => {
      console.log('');
      const playAgain: string = prompt('Do you want to play again? (yes/no)? ');
          if (playAgain.toLowerCase() === 'yes') {
               this.playGame(); // Restart the game loop choose yes
            }
        });
    }


  //handle players creations base on selected game mode
   createPlayers(): void {
        console.clear();
        console.log('CONNECT 4\n');
        const gameMode = prompt('Choose game mode: (1) Player vs Player or (2) Player vs AI: ');

        if (gameMode === '1') {
            this.playerX = new Player(prompt('Player X\'s name: '), 'X', this.board);
            this.playerO = new Player(prompt('Player O\'s name: '), 'O', this.board);
        } else if (gameMode === '2') {
            this.playerX = new Player(prompt('Player name: '), 'X', this.board);
            const aiMode = prompt('Choose AI mode: (1) Easy or (2) Hard: ');
            this.playerO = new Player('AI', 'O', this.board, true, aiMode === '1' ? 'easy' : 'hard');
        } else {
            console.log('Invalid game mode selected.');
            this.createPlayers(); 
        }
    }
  

  // Main game loop, handle players movements until the game is over.

     startGameLoop(onGameOver: () => void): void {
        const processTurn = (): void => {
            console.clear();
            this.board.render();
            const currentPlayer: Player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;

            if (currentPlayer.isComputer) {
                // 0.4 sec delay before Ai makes a move
                setTimeout(() => {
                    const aiMove = currentPlayer.makeComputerMove();
                    if (this.board.makeMove(aiMove)) {
                        this.checkGameState(processTurn, onGameOver);  
                    } else {
                        console.log('AI made an invalid move. This should not happen.');
                        this.checkGameState(processTurn, onGameOver);  // Ensure the game state is checked
                    }
                }, 400); // 0.4-second delay
            } else {
                let moveValid = false;

                // Handle valid and invalid move console log error message
                while (!moveValid) {
                    const moveInput: string = prompt(`Hey ${currentPlayer.name}, make your move (${currentPlayer.color}): `);
                    const columnIndex: number = +moveInput.trim() - 1;

                    if (isNaN(columnIndex)) {
                        console.log('Invalid input. Please enter a number between 1 and 7.');
                        prompt('Hit enter to try again.');
                        continue;
                    }

                    if (columnIndex < 0 || columnIndex >= 7) {
                        console.log('Out of range. Choose a number from 1 to 7.');
                        prompt('Press enter to retry.');
                        continue;
                    }

                    moveValid = this.board.makeMove(columnIndex);

                    if (!moveValid) {
                        console.log('This column is full. Please pick another one.');
                        prompt('Press enter to select a different column.');
                        continue;
                    }

                    this.checkGameState(processTurn, onGameOver);  // Proceed to the next turn after player move
                }
            }
        };

        processTurn(); // Start the game loop
  }
   // Check if the game is over and handle the end of the game
    checkGameState(callback: () => void, onGameOver: () => void): void {
        if (this.board.gameOver) {
            console.clear();
            this.board.render();
            this.whoHasWonOnGameOver();
            onGameOver(); 
        } else {
            callback(); 
        }
    }

   // The Game is over, annouce the result wincheck/drawcheck. 
    whoHasWonOnGameOver(): void {
        console.clear();
        this.board.render();
        if (this.board.winner) {
            const winningPlayer: Player = this.board.winner === 'X' ? this.playerX : this.playerO;
            console.log(`Congratulations ${winningPlayer.color}: ${winningPlayer.name} you won!`);
        } else {
            console.log('Unfortunately it was a draw...');
        }
    }
}


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

