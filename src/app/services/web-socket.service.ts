import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  webSocket!: WebSocket;
  chatMessages: Chat[] = [];

  constructor(public authService: AuthService) { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };
    this.webSocket.onmessage = (event) => {
      const reader = new FileReader();
      reader.readAsText(event.data);
      event.data.text().then((resolve: string, reject: any) => {
        const chatMessage = resolve;
        this.chatMessages.push(JSON.parse(chatMessage));
      })
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    }
  }

  public sendMessage(chatMessage: Chat) {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
  /*webSocket!: WebSocket;

  constructor() {}

  public createObservableSocket(url:string): Observable<string> {
    this.webSocket = new WebSocket(url);
    return new Observable(result => {
      this.webSocket.onmessage = (message) => result.next(message.data);
      this.webSocket.onerror = (message) => result.error(message);
      this.webSocket.onclose = (message) => result.complete();
    })
  }

  public sendMessage(message:any) {
    this.webSocket.send(message);
  }*/
}
