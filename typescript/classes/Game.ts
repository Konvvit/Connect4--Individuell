import prompt from "../helpers/prompt.js";
import Board from './Board.js';
import Player from './Player.js';



export default class Game {
  board: Board;
  // Added compilerOptions: "strictPropertyInitialization": false to tsconfig.json to get rid of player error.
  playerX: Player;
  playerO: Player;



constructor() {
  this.createPlayers();
  
  while (true) {
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
            this.createPlayers(); // Re-prompt for valid mode
        }
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


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

