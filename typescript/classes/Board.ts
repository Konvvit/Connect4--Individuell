import makeMove from './MakeMove.js';

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

    // Render the board with visualization
  render(): void {
    let line = '\n' + '-'.repeat(29) + '\n';
    console.log(
      line +
      this.matrix.map(row =>
        row.map(column => `| ${column} `).join('')
        + '|').join(line) +
      line
    );
  }

   // Make a move in a specific column
  makeMove(column: number): boolean {
    return makeMove(this, column);
  }

}