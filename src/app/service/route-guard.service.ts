import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from './basic-authentication.service ';
@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(
    // private HardcodedAuthenticationService: HardcodedAuthenticationService,
    private route: Router,
    private basicAuthenticationService: BasicAuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.basicAuthenticationService.getAuthenticatedToken()) return true;
    this.route.navigateByUrl('');

    return false;
  }
}
