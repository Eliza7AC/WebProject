import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { ChatComponent } from './chat/chat.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path:'game', component:GameComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
