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
    //this.startGame();
    //this.WhoHasWonOnGameOver();
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
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

}