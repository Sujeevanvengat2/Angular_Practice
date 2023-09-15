import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service ';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  constructor(public basicAuthenticationService: BasicAuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'admin';
    // let password = 'password.123';
    //  let basicAuthHeader= 'Basic ' + window.btoa(username + ':' + password);

    let basicAuthHeader =
      this.basicAuthenticationService.getAuthenticatedToken();
    let username = this.basicAuthenticationService.getAuthenticatedUser();

    if (basicAuthHeader && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeader,
        },
      });
    }
    return next.handle(request);
  }
}
