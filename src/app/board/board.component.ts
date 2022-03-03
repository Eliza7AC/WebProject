import { Component, OnInit } from '@angular/core';
import {VisivilityService} from "../services/visivility.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  isVisible?: boolean;

  squares?: any[];
  xIsNext?: boolean;
  winner?: null;

  constructor(private visibilityService : VisivilityService) {
    // ?
    // this.squares = [];
    // this.xIsNext = true;
    // this.winner = null;
  }

  ngOnInit(): void {
    this.isVisible = false;
    this.visibilityService.add(this);
    this.newGame();
  }

  toggle(){
    this.isVisible = !this.isVisible;
    if(this.isVisible){
      this.visibilityService.toggleAll(this);
    }
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
    if (!this.squares![idx]){
      this.squares!.splice(idx, 1, this.player);
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
        this.squares![a] && this.squares![a] === this.squares![b] &&
        this.squares![a] === this.squares![c]
      ) {
        return this.squares![a];
      }
    }
    return null;
  }

}
