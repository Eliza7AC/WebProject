import { Component, OnInit } from '@angular/core';
import {VisibilityService} from "../services/visibility.service";
import {AuthService} from "../services/auth.service";

function startBoard(): number[][] {
  return [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]
}

function delay(timeInMillis: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
}

const countOccurrences = (arr: any[], val: any) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrls: ['./connect-four.component.css']
})
export class ConnectFourComponent implements OnInit {

  isVisible?: boolean;

  //============================================================


  board: number[][] = [];
  colors: any[] = ["white", "blue", "red"];

  ROW_COUNT: number = 6;
  COLUMN_COUNT: number = 7;
  PLAYER: number = 0;
  AI: number = 1;
  EMPTY: number = 0;
  PLAYER_PIECE: number = 1;
  AI_PIECE: number = 2;
  WINDOW_LENGTH: number = 4;

  GAME_OVER: boolean | undefined;
  WINNER: string | undefined;
  TURN: boolean | undefined;

  //============================================================

  constructor(private visibilityService : VisibilityService, private authService : AuthService) { }

  ngOnInit(): void {
    this.resetBoard();
    this.isVisible = false;
    this.visibilityService.add(this);
  }

  resetBoard(): void {
    this.board = startBoard();
    this.GAME_OVER = false;
    this.WINNER = undefined;
    this.TURN = (Math.random() < 0.5);

    if(!this.TURN){
      this.AI_Play();
    }
  }

  toggle(){
    this.isVisible = !this.isVisible;
    if(this.isVisible){
      this.visibilityService.toggleAll(this);
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  //============================================================

  drop_piece(c_board : number[][], row : number, col : number, piece : number): void {
    c_board[row][col] = piece;
  }

  isValidLocation(c_board : number[][], col : number): boolean {
    return this.board[this.ROW_COUNT-1][col] === 0;
  }

  getNextOpenRow(c_board : number[][], col : number): number {
    for(let row=0; row < this.ROW_COUNT; row++){
      if(c_board[row][col] === 0){
        return row;
      }
    }
    return 0;
  }

  winningMove(c_board : number[][], piece : number) : boolean {
    // Horizontal
    for(let col=0; col < this.COLUMN_COUNT-3; col++){
      for(let row=0; row < this.ROW_COUNT; row++){
        if(this.board[row][col] == piece && this.board[row][col+1] == piece
          && this.board[row][col+2] == piece && this.board[row][col+3] == piece){
          return true;
        }
      }
    }

    // Vertical
    for(let col=0; col < this.COLUMN_COUNT; col++){
      for(let row=0; row < this.ROW_COUNT-3; row++){
        if(this.board[row][col] == piece && this.board[row+1][col] == piece
          && this.board[row+2][col] == piece && this.board[row+3][col] == piece){
          return true;
        }
      }
    }

    // Diagonale /
    for(let col=0; col < this.COLUMN_COUNT-3; col++){
      for(let row=0; row < this.ROW_COUNT-3; row++){
        if(this.board[row][col] == piece && this.board[row+1][col+1] == piece
          && this.board[row+2][col+2] == piece && this.board[row+3][col+3] == piece){
          return true;
        }
      }
    }

    // Diagonale \
    for(let col=0; col < this.COLUMN_COUNT-3; col++){
      for(let row=3; row < this.ROW_COUNT; row++){
        if(this.board[row][col] == piece && this.board[row-1][col+1] == piece
          && this.board[row-2][col+2] == piece && this.board[row-3][col+3] == piece){
          return true;
        }
      }
    }

    return false;
  }

  evaluate(window : number[], piece : number) : number {
    let score = 0;
    let opp_piece = this.PLAYER_PIECE;
    if(piece === this.PLAYER_PIECE){
      opp_piece = this.AI_PIECE
    }

    if(countOccurrences(window, piece) == 4){
      score += 100;
    }

    else if(countOccurrences(window, piece) === 3 && countOccurrences(window, this.EMPTY) === 1){
      score += 5;
    }

    else if(countOccurrences(window, piece) === 2 && countOccurrences(window, this.EMPTY) === 2){
      score += 2;
    }

    if(countOccurrences(window, opp_piece) === 3 && countOccurrences(window, this.EMPTY) === 1){
      score -= 4;
    }

    return score;
  }

  scorePosition(c_board : number[][], piece : number) : number {
    let score = 0;

    let center_array : number[] = []
    for(let i=0; i < this.ROW_COUNT; i++){
      center_array.push(c_board[i][Math.floor(this.COLUMN_COUNT/2)])
    }

    let center_count = countOccurrences(center_array, piece);
    score += center_count * 3;

    // Horizontal
    for(let row=0; row < this.ROW_COUNT; row++){
      let row_array : number[] = c_board[row];

      for(let col=0; col < this.COLUMN_COUNT-3; col++){
        let slice = row_array.slice(col, col+this.WINDOW_LENGTH);
        score += this.evaluate(slice, piece);
      }
    }

    // Vertical
    for(let col=0; col < this.COLUMN_COUNT; col++){

      let col_array : number[] = []
      for(let i=0; i < this.ROW_COUNT; i++){
        col_array.push(c_board[i][col])
      }

      for(let row=0; row < this.ROW_COUNT-3; row++){
        let slice =  col_array.slice(row, row+this.WINDOW_LENGTH);
        score += this.evaluate(slice, piece);
      }
    }

    // Diagonale /
    for(let row=0; row < this.ROW_COUNT-3; row++){
      for(let col=0; col < this.COLUMN_COUNT-3; col++){
        let slice : number[] = [];

        for (let i = 0; i < this.WINDOW_LENGTH; i++){
          slice.push(c_board[row+i][col+i]);
        }

        score += this.evaluate(slice, piece);
      }
    }

    // Diagonale \
    for(let row=0; row < this.ROW_COUNT-3; row++){
      for(let col=0; col < this.COLUMN_COUNT-3; col++){
        let slice : number[] = [];

        for (let i = 0; i < this.WINDOW_LENGTH; i++){
          slice.push(c_board[row+3+-1][col+i-1]);
        }

        score += this.evaluate(slice, piece);
      }
    }

    return score;
  }

  getValidLocations(c_board : number[][]): number[]{
    let validLocations : number[] = [];

    for(let col = 0; col < this.COLUMN_COUNT; col++){
      if(this.isValidLocation(c_board, col)){
        validLocations.push(col);
      }
    }
    return validLocations;
  }

  // isTerminalNode(c_board : number[][]) : boolean {
  //   return (this.winningMove(c_board, this.PLAYER_PIECE) || this.winningMove(c_board, this.AI_PIECE) ||
  //     this.getValidLocations(c_board).length == 0);
  // }

  // minimax(c_board : number[][], depth : number, alpha : number, beta : number, maximizingPlayer : boolean) : number[] {
  //   let validLocations = this.getValidLocations(c_board);
  //   let isTerminal = this.isTerminalNode(c_board);
  //
  //   if((depth === 0) || isTerminal){
  //     if (isTerminal){
  //       if(this.winningMove(c_board, this.AI_PIECE)){
  //         return [0, 100000000000000];
  //       }
  //       else if(this.winningMove(c_board, this.PLAYER_PIECE)){
  //         return [0, -100000000000000];
  //       }
  //       else {
  //         return [0, 0];
  //       }
  //     }
  //     else {
  //       return [0, this.scorePosition(c_board, this.AI_PIECE)];
  //     }
  //   }
  //
  //   if(maximizingPlayer){
  //     let value = Number.MAX_VALUE;
  //     let column = validLocations[Math.floor(Math.random() * validLocations.length)];
  //
  //     for(let col=0; col < validLocations.length; col++){
  //       let row = this.getNextOpenRow(c_board, col);
  //       let board_copy = [];
  //
  //       for (let i = 0; i < c_board.length; i++){
  //         board_copy[i] = c_board[i].slice();
  //       }
  //
  //       this.drop_piece(board_copy, row, col, this.AI_PIECE);
  //       let new_score = this.minimax(board_copy, depth-1, alpha, beta, false)[1];
  //
  //       if(new_score > value){
  //         value = new_score;
  //         column = col;
  //       }
  //       alpha = Math.max(alpha, value);
  //
  //       if(alpha >= beta){
  //         break;
  //       }
  //     }
  //     return [column, value];
  //   }
  //
  //   else {
  //     let value = Number.MIN_VALUE;
  //     let column = validLocations[Math.floor(Math.random() * validLocations.length)];
  //
  //     for(let col=0; col < validLocations.length; col++){
  //
  //       let row = this.getNextOpenRow(c_board, col);
  //       let board_copy = [];
  //
  //       for (let i = 0; i < c_board.length; i++){
  //         board_copy[i] = c_board[i].slice();
  //       }
  //
  //       this.drop_piece(board_copy, row, col, this.PLAYER_PIECE);
  //       let new_score = this.minimax(board_copy, depth-1, alpha, beta, true)[1];
  //
  //       if(new_score < value){
  //         value = new_score;
  //         column = col;
  //       }
  //       beta = Math.min(beta, value);
  //
  //       if(alpha >= beta){
  //         break;
  //       }
  //     }
  //     return [column, value];
  //   }
  // }

  pickBestMove(c_board : number[][], piece : number) : number {
    let validLocations = this.getValidLocations(c_board);
    let best_score = -10000

    let best_col = validLocations[Math.floor(Math.random() * validLocations.length)];

    for(let col=0; col < validLocations.length; col++){
      let row = this.getNextOpenRow(c_board, col);
      let board_copy = [];

      for (let i = 0; i < c_board.length; i++){
        board_copy[i] = c_board[i].slice();
      }

      this.drop_piece(board_copy, row, col, piece);
      let score = this.scorePosition(board_copy, piece);

      if(score > best_score){
        best_score = score;
        best_col = col;
      }
    }
    return best_col;
  }

  async AI_Play(){
    // let col = this.minimax(this.board, 5, Number.MIN_VALUE, Number.MAX_VALUE, true)[0];
    let col = this.pickBestMove(this.board, this.AI_PIECE);

    await delay(200);

    if(this.isValidLocation(this.board, col)){
      let row = this.getNextOpenRow(this.board, col);
      this.drop_piece(this.board, row, col, this.AI_PIECE);

      if(this.winningMove(this.board, this.AI_PIECE)){
        this.WINNER = "AI";
        this.GAME_OVER = true;
      }
    }
    else {
      let array : number[] = [];
      for (let i = 0; i < this.COLUMN_COUNT; i++) {
        if(this.isValidLocation(this.board, i)){
          array.push(i);
        }
      }

      let col = array[Math.floor(Math.random() * array.length)];
      let row = this.getNextOpenRow(this.board, col);
      this.drop_piece(this.board, row, col, this.AI_PIECE);

      if(this.winningMove(this.board, this.AI_PIECE)){
        this.WINNER = "AI";
        this.GAME_OVER = true;
      }
    }
  }

  play(i : number){
    let row = this.getNextOpenRow(this.board, i);
    this.drop_piece(this.board, row, i, this.PLAYER_PIECE);

    if(this.winningMove(this.board, this.PLAYER_PIECE)){
      this.WINNER = this.authService.name;
      this.GAME_OVER = true;
    }

    else {
      this.AI_Play();
    }

  }

}
