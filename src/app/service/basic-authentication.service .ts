import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {}
  executeJWTAuthenticationService(obj: any) {
    let username = obj.userName;
    let password = obj.password;
    return this.http
      .post<any>(`${API_URL}/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((data: any) => {
          sessionStorage.setItem(AUTHENTICATED_USER, obj.userName);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        })
      );
  }
  executeAuthenticationService(obj: any) {
    let basicAuthHeader =
      'Basic ' + window.btoa(obj.userName + ':' + obj.password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeader,
    });

    return this.http
      .get<AuthenticationBean>(`${API_URL}/basicauth`, { headers })
      .pipe(
        map((data: any) => {
          sessionStorage.setItem(AUTHENTICATED_USER, obj.userName);
          sessionStorage.setItem(TOKEN, basicAuthHeader);
          return data;
        })
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }
  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) return sessionStorage.getItem(TOKEN);
    else return null;
  }

  isUserLoggedin() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }
  isUserLogout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}
// export class AuthenticationBean {
//   constructor(public authenticationResponse: String) {}
// }
interface AuthenticationBean {
  authenticationResponse: String;
}
