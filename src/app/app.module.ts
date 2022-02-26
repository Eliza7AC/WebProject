import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ChatComponent } from './chat/chat.component';
import {RouterModule, Routes} from "@angular/router";
import { SignInComponent } from './sign-in/sign-in.component';
import {AuthGuard} from "./services/auth-guard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {LoggedGuardService} from "./services/logged-guard.service";
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const appRoutes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  { path:'sign-in', canActivate: [LoggedGuardService], component:SignInComponent },

  { path:'home', canActivate: [AuthGuard], component:GameComponent },
  { path:'game', canActivate: [AuthGuard], component:BoardComponent },
  { path:'chat', canActivate: [AuthGuard], component:ChatComponent },

  { path: '**', redirectTo: 'sign-in'}
]

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ChatComponent,
    SignInComponent,
    SquareComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [LoggedGuardService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
