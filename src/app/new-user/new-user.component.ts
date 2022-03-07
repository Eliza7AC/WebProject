import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";
import { User } from "../models/user.model";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;
  createUserSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private httpService: HttpService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      favoriteGames: this.formBuilder.array([])
    });
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['name'],
      formValue['email'],
      formValue['favoriteGames'] ? formValue['favoriteGames'] : [],
    );
    this.createUserSubscription =  this.httpService.createUser(newUser).subscribe({
      next: (response) => {
        if(response && response.name) {
          console.log(response);
          alert('User created!');
        } else {
          alert('An user with this name already exists!');
        }
      },
      error: (err) => {
        console.log('erreur',err);
      },
      complete: () => {
        this.router.navigate(['/users']);
      }
    });
  }

  getFavoriteGames(): FormArray {
    return this.userForm.get('favoriteGames') as FormArray;
  }

  onAddFavoriteGame() {
    const newFavoriteGamesControl = this.formBuilder.control(null, Validators.required);
    this.getFavoriteGames().push(newFavoriteGamesControl);
  }

  ngOnDestroy() {
    this.createUserSubscription?.unsubscribe();
  }

}
