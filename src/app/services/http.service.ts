import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Score } from "../models/score.model";
import { Chat } from "../models/chat.model";
import { User } from "../models/user.model";
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

  public getScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.serverUrl+'scores');
  }

  public createScore(score: Score): Observable<Score> {
    return this.http.post<Score>(this.serverUrl+'scores', score, this.httpOptions
    );
  }

  public modifyScore(score: Score): Observable<Score> {
    return this.http.put<Score>(this.serverUrl+'scores', score, this.httpOptions
    );
  }

  public suppScore(username: string): Observable<any> {
    return this.http.delete<any>(this.serverUrl+'scores/'+username, {observe: 'response'});
  }

  public getNewMessageId(): number {
    let result = Math.floor(Math.random() * 5000);
    this.getChatMessages().subscribe(
      (messages: Chat[]) => {
        if (messages.length === 5000) {
          result = -1;
        }
        let existingIds = []
        for (let message of messages) {
          existingIds.push(message.id)
        }
        while (existingIds.includes(result)) {
          result = Math.floor(Math.random() * 5000);
        }
      }
    )
    return result;
  }

  public getChatMessages(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.serverUrl+'messages') ;
  }

  public createChatMessage(message: Chat): Observable<Chat> {
    message.id = this.getNewMessageId();
    return this.http.post<Chat>(this.serverUrl+'messages', message, this.httpOptions
    );
  }

  public suppChatMessage(id: number): Observable<any> {
    return this.http.delete<any>(this.serverUrl+'messages/'+id, {observe: 'response'});
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl+'users') ;
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.serverUrl+'users', user, this.httpOptions
    );
  }

  public suppUser(firstName: string): Observable<any> {
    return this.http.delete<any>(this.serverUrl+'users/'+firstName, {observe: 'response'});
  }
}
