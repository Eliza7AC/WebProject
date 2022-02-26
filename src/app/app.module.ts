import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ChatComponent } from './chat/chat.component';
import {RouterModule, Routes} from "@angular/router";
import { SignInComponent } from './sign-in/sign-in.component';
import {AuthGuard} from "./services/auth-guard.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {LoggedGuardService} from "./services/logged-guard.service";
import { WebSocketService } from './services/web-socket.service';

const appRoutes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path:'sign-in', canActivate: [LoggedGuardService], component:SignInComponent },

  { path:'home', canActivate: [AuthGuard], component:GameComponent },
  { path:'game', canActivate: [AuthGuard], component:GameComponent },
  { path:'chat', canActivate: [AuthGuard], component:ChatComponent },

  { path: '**', redirectTo: 'sign-in'}
]

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ChatComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule
  ],
  providers: [LoggedGuardService, AuthGuard, AuthService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
