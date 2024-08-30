import Board from './Board.js';

export default function makeMove(board: Board, column: number): boolean {
  // Don't make any move if the game is over
  if (board.gameOver) { return false; }

  // Make Move
   for (let row = board.matrix.length - 1; row >= 0; row--) {
    if (board.matrix[row][column] === ' ') {
      board.matrix[row][column] = board.currentPlayerColor;
      board.gameOver = !!(board.winner || board.isADraw);
      board.currentPlayerColor = board.currentPlayerColor === 'X' ? 'O' : 'X';

  
      return true;
    }
  }

 
  return false;
}
