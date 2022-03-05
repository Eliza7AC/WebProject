import { Component, OnInit, OnDestroy } from '@angular/core';
import { Score } from '../models/score.model';
import { Subscription } from "rxjs";
import { HttpService } from "../services/http.service";


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  scoreboard: Score[] = [];
  scoreSubscription!: Subscription;
  testInt: number = 0;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.scoreSubscription = this.http.getScores().subscribe({
      next: scores  => {
        this.scoreboard = scores;
      },
      error: err => {
        console.log('erreur ', err)
      },
      complete: () => {
        this.scoreboard.sort((a, b) => (a.points < b.points)? 1 : -1);
      }
    });
  }

  onSuppress(username: string) {
    if (confirm('Voulez-vous vraiment supprimer le score de ' + username + ' ?')) {
      this.suppressScore(username);
    }
  }

  suppressScore(username: string) {
    this.http.suppScore(username).subscribe( (result) => {
      if (result.status === 200) {
        this.ngOnInit();
      } else {
        alert('Ce score n\'existe pas !');
      }
    })
  }

  // Pour tester : ajoute un score au username et score aléatoires
  onTest() {
    this.http.createScore(new Score(this.makeUsername(10), Math.floor(Math.random() * 20))).subscribe({
      next: response => {
        if (response && response.username) {
          alert('Score créé');
        } else {
          alert('Le score pour ce joueur existe déjà !')
        }
      },
      error: err => {
        console.log('erreur ', err)
      },
      complete: () => {
        this.ngOnInit();
      }
    })
  }

  // Pour tester : génère un username aléatoire
  makeUsername(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  // Pour tester : remplace un score par le même avec 1 point de plus
  increment(score: Score): void {
    score.points++;
    this.http.modifyScore(score).subscribe({
      next: response => response,
      error: err => {
        console.log('erreur ', err)
      }
    });
  }

  ngOnDestroy(): void {
    this.scoreSubscription?.unsubscribe();
  }
}
