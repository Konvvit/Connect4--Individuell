import Board from './Board.js';



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



}