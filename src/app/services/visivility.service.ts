import {Injectable} from "@angular/core";

@Injectable()
export class VisivilityService {

  components? : any[] = [];

  constructor() {
  }

  add(component : any){
    this.components?.push(component);
  }

  toggleAll(component : any){
    // @ts-ignore
    for (let i = 0; i < this.components.length; i++) {
      // @ts-ignore
      if(component !== this.components[i]){
        // @ts-ignore
        this.components[i].isVisible = false;
      }
    }
  }


}
