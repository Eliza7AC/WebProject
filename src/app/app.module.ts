import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ChatComponent } from './chat/chat.component';
import {RouterModule, Routes} from "@angular/router";
import { SignInComponent } from './sign-in/sign-in.component';
import {AuthGuard} from "./services/auth-guard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {LoggedGuardService} from "./services/logged-guard.service";
import { WebSocketService } from './services/web-socket.service';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbButtonModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ConnectFourComponent } from './connect-four/connect-four.component';
import {VisibilityService} from "./services/visibility.service";
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HttpService } from "./services/http.service";
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';

const appRoutes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path:'sign-in', canActivate: [LoggedGuardService], component:SignInComponent },

  // { path:'home', canActivate: [AuthGuard], component:GameComponent },
  { path:'game', canActivate: [AuthGuard], component:GameComponent },
  { path:'chat', canActivate: [AuthGuard], component:ChatComponent },
  { path:'leaderboard', canActivate: [AuthGuard], component:LeaderboardComponent},
  { path:'users', canActivate: [AuthGuard], component:UserListComponent },
  { path: 'new-user', canActivate: [AuthGuard], component: NewUserComponent},
  { path: '**', redirectTo: 'sign-in'}
]

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ChatComponent,
    SignInComponent,
    SquareComponent,
    BoardComponent,
    ConnectFourComponent,
    LeaderboardComponent,
    UserListComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    HttpClientModule,
  ],
  providers: [LoggedGuardService, AuthGuard, AuthService, WebSocketService, VisibilityService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
