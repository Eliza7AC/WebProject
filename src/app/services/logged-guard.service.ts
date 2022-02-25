import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from
    '@angular/router';
import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class LoggedGuardService implements CanActivate {

  constructor(private authService : AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    return !this.authService.isAuth;
  }
}
