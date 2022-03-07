import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import { HttpService } from "../services/http.service";
import {Score} from "../models/score.model";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router : Router, private authService : AuthService, private http: HttpService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm) {
    const name = form.value['name']

    if(name.length > 2 && name.length < 15){
      this.authService.signIn(name);
      this.http.createScore(new Score(name, 0)).subscribe( {
        next : response => {
          this.router.navigate(['game']);
        },
        error: err => {
          console.log('error ', err)
        }
      })
    }
  }

  handleKeyUp(form : NgForm, event: any){
    if(event.keyCode === 13){
      this.onSubmit(form);
    }
  }

}
