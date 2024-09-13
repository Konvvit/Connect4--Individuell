import Board from './Board.js';
import makeMove from './MakeMove.js';


export default class Player {
  name: string;
  color: string;
  board: Board;
  isComputer: boolean;
  aiDifficulty: 'easy' | 'hard' | null; 

  constructor(name: string, color: string, board: Board, isComputer: boolean = false, aiDifficulty: 'easy' | 'hard' | null = null) {
    this.name = name;
    this.color = color;
    this.board = board;
    this.isComputer = isComputer;
    this.aiDifficulty = aiDifficulty;
  }



makeComputerMove(): number {
    if (this.aiDifficulty === 'easy') {
      return this.makeRandomMove();
    } else if (this.aiDifficulty === 'hard') {
      return this.makeStrategicMove();
    }
    throw new Error('AI difficulty not set.');
  }

  makeRandomMove(): number {
    const availableColumns = this.board.matrix[0].map((_, colIndex) => colIndex).filter(colIndex => this.board.matrix[0][colIndex] === ' ');
    return availableColumns[Math.floor(Math.random() * availableColumns.length)];
  }

  makeStrategicMove(): number {
    // Try to win
    const winningMove = this.findWinningMove(this.color);
    if (winningMove !== null) return winningMove;

    // Try to block opponent from winning
    const blockingMove = this.findWinningMove(this.color === 'X' ? 'O' : 'X');
    if (blockingMove !== null) return blockingMove;

    // If no immediate win or block, make a random move
    return this.makeRandomMove();
  }

  findWinningMove(color: string): number | null {
    for (let col = 0; col < this.board.matrix[0].length; col++) {
      if (this.board.matrix[0][col] === ' ') {
        // Temporarily make the move
        const tempBoard = this.cloneBoard();
        tempBoard.matrix[this.findAvailableRow(tempBoard, col)][col] = color;

        // Check if this move results in a win
        if (this.checkWin(tempBoard, color)) {
          return col;
        }
      }
    }
    return null;
  }

  findAvailableRow(board: Board, column: number): number {
    for (let row = board.matrix.length - 1; row >= 0; row--) {
      if (board.matrix[row][column] === ' ') {
        return row;
      }
    }
    throw new Error('Column is full');
  }

  checkWin(board: Board, color: string): boolean {
    // Check for horizontal, vertical, and diagonal wins
    return this.checkLines(board, color);
  }

  checkLines(board: Board, color: string): boolean {
    // Horizontal check
    for (let row = 0; row < board.matrix.length; row++) {
      for (let col = 0; col <= board.matrix[0].length - 4; col++) {
        if (board.matrix[row].slice(col, col + 4).every(cell => cell === color)) {
          return true;
        }
      }
    }

    // Vertical check
    for (let col = 0; col < board.matrix[0].length; col++) {
      for (let row = 0; row <= board.matrix.length - 4; row++) {
        if ([0, 1, 2, 3].every(offset => board.matrix[row + offset][col] === color)) {
          return true;
        }
      }
    }

    // Diagonal checks
    for (let row = 0; row <= board.matrix.length - 4; row++) {
      for (let col = 0; col <= board.matrix[0].length - 4; col++) {
        // Bottom-right diagonal
        if ([0, 1, 2, 3].every(offset => board.matrix[row + offset][col + offset] === color)) {
          return true;
        }
        // Bottom-left diagonal
        if ([0, 1, 2, 3].every(offset => board.matrix[row + offset][col - offset] === color)) {
          return true;
        }
      }
    }

    return false;
  }

  makeMove(column: number): boolean {
    return makeMove(this.board, column);
  }

  cloneBoard(): Board {
    const newBoard = new Board();
    newBoard.matrix = this.board.matrix.map(row => [...row]);
    newBoard.currentPlayerColor = this.board.currentPlayerColor;
    newBoard.gameOver = this.board.gameOver;
    newBoard.isADraw = this.board.isADraw;
    newBoard.winner = this.board.winner;
    return newBoard;
  }
}
