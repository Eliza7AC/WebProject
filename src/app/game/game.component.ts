import {Component, Input, OnInit} from '@angular/core';

declare var name: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  random?: number;
  current_color_name?: String;
  current_color_visual?: String;
  score;

  chosen_color_name?: String;
  chosen_color_visual?: String;

  public colors:Array<String> = [
    "rouge",
    "vert",
    "bleu",
    "jaune",
    "orange"
  ]

  public colors_visual:Array<String> = [
    "#ff0000", //rouge
    "#04fe0c", //vert
    "#0490fe", //bleu
    "#fee004", //jaune
    "#fe9f04", //orange
  ]

  public colors_association:Array<any> = [
    {
      name: "rouge",
      visual: "#ff0000"
    },
    {
      name: "vert",
      visual: "##04fe0c"
    },
    {
      name: "bleu",
      visual: "#0490fe"
    },
    {
      name: "jaune",
      visual: "#fee004"
    },
    {
      name: "orange",
      visual: "#fe9f04"
    }

  ]

  public colors_visual_already_used: Array<String> = [

  ]



  constructor() {
    this.random = this.get_random()
    this.current_color_name = this.colors[this.get_color_name()];
    this.current_color_visual = this.colors_visual[this.get_color_visual()];
    this.score = 0;
    this.chosen_color_name = "";
  }

  ngOnInit(): void {
    this.current_color_name = this.colors[this.get_color_name()];
    new name();
  }

  get_color_name(this: any){
    return Math.floor(Math.random() * (this.colors.length + 1))
  }

  get_color_visual(){
    return Math.floor(Math.random() * (this.colors.length + 1))
  }



  get_random(){
    let random = Math.floor(Math.random() * (this.colors.length + 1))

    while(this.colors_visual_already_used.includes(this.colors[random])){
      random = Math.floor(Math.random() * (this.colors.length + 1))
    }
    this.colors_visual_already_used.push(this.colors[random])
    return random
  }


  check(color: String){
    this.score = this.score+1;
    alert("couleur choisie: " + color + " | " + this.colors_association[0])
    alert(this.score)

  }

  includes(color: String){

  }







  title = 'app-js'
}
