import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
export class Bean {
  constructor(public msg: String) {}
}
@Injectable({
  providedIn: 'root',
})
export class WelcomeDataService {
  constructor(private Http: HttpClient) {}
  getResponseMsg() {
    // return this.Http.get('http://localhost:8080/haibean/');
    return this.Http.get<Bean>('http://localhost:8080/haibean');
  }
  getResponseMsgParamater(name: String) {
    // return this.Http.get('http://localhost:8080/haibean/');
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString,
    // });

    return this.Http.get<Bean>(
      `${API_URL}/haibean/path-variable/${name}`
      // { headers }
    );
  }
  // createBasicAuthenticationHttpHeader() {
  //   let username = 'admin';
  //   let password = 'password.123';
  //   let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeader;
  // }
}
