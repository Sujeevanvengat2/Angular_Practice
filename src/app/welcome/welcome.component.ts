import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  msg = 'some one come to website';
  msgWelcomeService: String = '';
  msgWelcomeError: String = '';
  username = '';

  constructor(
    private router: ActivatedRoute,
    private getRestApiResponse: WelcomeDataService
  ) {}

  ngOnInit(): void {
    console.log(this.msg);
    this.username = this.router.snapshot.params['name'];
    console.log(this.router.snapshot.params['name']);
  }
  getWelcomeMessage() {
    // console.log(this.getRestApiResponse.getResponseMsg());
    this.getRestApiResponse.getResponseMsg().subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleErrorResponse(error)
    );
  }
  getWelcomeMessageWithParam() {
    this.getRestApiResponse.getResponseMsgParamater(this.username).subscribe(
      (response) => this.handleSuccess(response),
      (error) => this.handleErrorResponse(error)
    );
  }

  handleSuccess(response: any) {
    this.msgWelcomeService = response.msg;
  }
  handleErrorResponse(error: any) {
    // console.log(error);
    // console.log(error.error);
    // console.log('3' + error.error.message);
    this.msgWelcomeService = error.error.message;
  }
}
