import { Component, OnInit } from '@angular/core';
import {VisivilityService} from "../services/visivility.service";

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrls: ['./connect-four.component.css']
})
export class ConnectFourComponent implements OnInit {

  isVisible?: boolean;

  constructor(private visibilityService : VisivilityService) { }

  ngOnInit(): void {
    this.isVisible = false;
    this.visibilityService.add(this);
  }

  toggle(){
    this.isVisible = !this.isVisible;
    if(this.isVisible){
      this.visibilityService.toggleAll(this);
    }
  }

}
