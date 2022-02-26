import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chat } from '../models/chat.model';
import { AuthService } from '../services/auth.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy {
  //srvMessage: string[] = [];
  //webSocket: WebSocket | undefined;
  //serverUrl = 'ws://localhost:8080';
  constructor(public webSocketService: WebSocketService, public authService: AuthService) {  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessage = new Chat(this.authService.name, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessage);
    sendForm.controls['message'].reset();
  }

  ngOnDestroy(): void {
      this.webSocketService.closeWebSocket();
  }
  /*constructor (public wsService: WebSocketService, public authService: AuthService) {
    this.wsService.createObservableSocket(this.serverUrl).subscribe(data => {
      this.srvMessage.push(data);
    })
  }

  ngOnInit(): void {

  }

  onSend(sendForm: NgForm) {
    this.wsService.sendMessage(JSON.stringify(sendForm.value.message));
    sendForm.controls['message'].reset();
  }*/

}
