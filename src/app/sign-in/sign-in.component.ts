import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router : Router, private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm) {
    const name = form.value['name']

    if(name.length > 2 && name.length < 15){
      this.authService.signIn(name);
      this.router.navigate(['game']);
    }
  }

  handleKeyUp(form : NgForm, event: any){
    if(event.keyCode === 13){
      this.onSubmit(form);
    }
  }

}
