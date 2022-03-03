import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Score } from "../models/score.model";
import { Message } from "../models/message.model";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class HttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private serverUrl = 'http://localhost:4200/';

  constructor (private http: HttpClient) { }

  public getNewScoreId(): number {
    let result = Math.floor(Math.random() * 5000);
    this.getScores().subscribe(
      (scores: Score[]) => {
        if (scores.length === 5000) {
          result = -1;
        }
        let existingIds = []
        for (let score of scores) {
           existingIds.push(score.scoreId)
        }
        while (existingIds.includes(result)) {
          result = Math.floor(Math.random() * 5000);
        }
      }
    )
    return result;
  }

  public getScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.serverUrl+'scores') ;
  }

  public createScore(score: Score): Observable<Score> {
    score.scoreId = this.getNewScoreId();
    return this.http.post<Score>(this.serverUrl+'scores', score, this.httpOptions
    );
  }

  public suppScore(id: number): Observable<any> {
    return this.http.delete<any>(this.serverUrl+'scores/'+id, {observe: 'response'});
  }

  public getNewMessageId(): number {
    let result = Math.floor(Math.random() * 5000);
    this.getMessages().subscribe(
      (messages: Message[]) => {
        if (messages.length === 5000) {
          result = -1;
        }
        let existingIds = []
        for (let message of messages) {
          existingIds.push(message.messageId)
        }
        while (existingIds.includes(result)) {
          result = Math.floor(Math.random() * 5000);
        }
      }
    )
    return result;
  }

  public getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.serverUrl+'messages') ;
  }

  public createMessage(message: Message): Observable<Message> {
    message.messageId = this.getNewScoreId();
    return this.http.post<Message>(this.serverUrl+'messages', message, this.httpOptions
    );
  }

  public suppMessage(id: number): Observable<any> {
    return this.http.delete<any>(this.serverUrl+'messages/'+id, {observe: 'response'});
  }
}


