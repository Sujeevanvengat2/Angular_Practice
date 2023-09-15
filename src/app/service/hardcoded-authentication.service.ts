import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenticate(obj: any) {
    // console.log('User trying to login-> ' + this.isUserLoggedin());
    if (obj.userName == 'sujeevan@gmail.com' && obj.password == '123') {
      sessionStorage.setItem('authenticaterUser', obj.userName);
      // console.log('user loged in or not-> ' + this.isUserLoggedin());
      return true;
    }
    return false;
  }
  isUserLoggedin() {
    const user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }
  isUserLogout() {
    console.log(sessionStorage.removeItem('authenticaterUser'));
    sessionStorage.removeItem('authenticaterUser');
  }
}
