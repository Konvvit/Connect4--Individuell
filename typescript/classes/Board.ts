export default class Board {

 matrix: Array<Array<string>>;
  currentPlayerColor: string;
  gameOver: boolean;
  isADraw: boolean;
  winner: string | boolean;

  constructor() {

     // Create connect 4 board 6x7 columns
    this.matrix = [...new Array(6)].map(_row =>
      [...new Array(7)].map(_column => ' ')
    );
      // currentPlayer, whose turn is it?
    this.currentPlayerColor = 'X';
    this.winner = false;
    this.isADraw = false;
    this.gameOver = false;
  
  }

}