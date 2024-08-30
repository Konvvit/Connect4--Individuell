import prompt from "../helpers/prompt.js";
import Board from './Board.js';
import Player from './Player.js';



export default class Game {
  board: Board;

  playerX: Player;
  playerO: Player;



constructor() {

  while (true) {
    this.createPlayers();
    this.board = new Board();
    this.startGame();
    this.WhoHasWonOnGameOver();
      console.log('');
      const playAgain: string = prompt('Do you want to play again? (yes/no)? ');
      if (playAgain !== 'yes') { break; }
  }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

}