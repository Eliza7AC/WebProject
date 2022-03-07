import { Component, OnInit } from '@angular/core';
import {VisibilityService} from "../services/visibility.service";
import {AuthService} from "../services/auth.service";
import { HttpService } from "../services/http.service";
import { Score } from "../models/score.model";
import {mergeMap} from "rxjs";

function delay(timeInMillis: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  isVisible?: boolean;

  squares?: any[];
  xIsNext?: boolean;
  winner?: string;
  gainButtonClicked: boolean = false;

  constructor(private visibilityService : VisibilityService, public auth: AuthService, private http: HttpService) {
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
    this.squares = Array(9).fill(undefined);
    this.winner = undefined;
    this.gainButtonClicked = false;
    // this.xIsNext = true;
    this.xIsNext = (Math.random() < 0.5);
    if(!this.xIsNext){
      this.autoMakeMove();
    }
  }

  get player(){
    return this.xIsNext ? 'X': 'O';
  }

  makeMove(idx: number){
    if(this.winner === undefined){
      if (!this.squares![idx]){
        this.squares!.splice(idx, 1, "X");
        this.xIsNext = false;
      }
      this.winner = this.calculateWinner();

      this.autoMakeMove();
    }

  }

  async autoMakeMove(){
    if(this.winner === undefined){
      await delay(200);

      let array = Array();
      for(let i = 0; i < 9; i++){
        if(!this.squares![i]){
          array.push(i);
        }
      }

      let index = array[Math.floor(Math.random() * array.length)];
      this.squares!.splice(index, 1, "O");

      this.xIsNext = true;

      this.winner = this.calculateWinner();
    }
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
    return undefined;
  }
  addScore(name: string) {
    this.http.getScores().pipe(
      mergeMap((result) => {
       let s = 0;
       for (let score of result) {
         if (score.username == this.auth.name) {
           s = score.points;
         }
       }
       s++;
       return this.http.modifyScore(new Score(this.auth.name, s));
      })
    ).subscribe({
      next: result => { return true },
      error: err => {
        console.log(err);
      }
    })
  }
}
