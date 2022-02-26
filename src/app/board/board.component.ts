import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {


  squares?: any[];
  xIsNext?: boolean;
  winner?: null;

  constructor() {
    // ?
    // this.squares = [];
    // this.xIsNext = true;
    // this.winner = null;
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(){
    return this.xIsNext ? 'X': 'O';
  }

  makeMove(idx: number){
    // @ts-ignore
    if (!this.squares[idx]){
      // @ts-ignore
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner(){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let i=0; i< lines.length; i++){
      const[a,b,c] = lines[i]
      if (
        // @ts-ignore
        this.squares[a] &&
        // @ts-ignore
        this.squares[a] === this.squares[b] &&
        // @ts-ignore
        this.squares[a] === this.squares[c]
      ) {
        // @ts-ignore
        return this.squares[a];
      }
    }
    return null;
  }

}
