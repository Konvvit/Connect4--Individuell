import prompt from "../helpers/prompt.js";
import Board from './Board.js';
import Player from './Player.js';



export default class Game {
  board: Board;


  // Added compilerOptions: "strictPropertyInitialization": false to tsconfig.json to get rid of player error.
  playerX: Player;
  playerO: Player;



constructor() {

  while (true) {
    this.createPlayers();
    this.board = new Board();
    this.startGameLoop();
    this.whoHasWonOnGameOver();
      console.log('');
      const playAgain: string = prompt('Do you want to play again? (yes/no)? ');
      if (playAgain !== 'yes') { break; }
    }
  }


  //handle players creations
  createPlayers(): void {
    console.clear();
    console.log('CONNECT 4\n');
    this.playerX = new Player(prompt('Spelare X:s namn: '), 'X', this.board);
    this.playerO = new Player(prompt('Spelare O:s namn: '), 'O', this.board);
  }
  

  // Main game loop, handle players movements until the game is over.

      startGameLoop(): void {
    while (!this.board.gameOver) {
        console.clear();
        this.board.render();
        const currentPlayer: Player = this.board.currentPlayerColor === 'X' ? this.playerX : this.playerO;

        let moveValid = false;
         
      //Handle valid moves 
      
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
        }
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


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

