import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '../models/user.model';
import { HttpService } from "../services/http.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  userSubscription!: Subscription;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.userSubscription = this.http.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }

  onSuppress(name: string) {
    if(confirm('Are you sure you want to delete user ' + name + '?')) {
      this.suppressUser(name);
    }
  }

  suppressUser(name: string) {
    this.http.suppUser(name).subscribe((result)=>{
      if(result.status === 200) {
        this.ngOnInit();
      } else {
        alert('User doesn\'t exist!');
      }
    })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
