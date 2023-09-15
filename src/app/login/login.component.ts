import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import { LoginService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicAuthenticationService } from '../service/basic-authentication.service ';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: BasicAuthenticationService,
    public snackBar: MatSnackBar
  ) {}
  userName = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    // Validators.pattern(
    //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
    // ),
  ]);

  matcher = new MyErrorStateMatcher();

  form!: FormGroup;
  loading = false;
  submitted = false;
  showPassword: boolean = false;
  showIcon: boolean = false;
  path: string = 'assets/images/auth/signInImage.gif';

  ngOnInit(): void {
    this.initForm();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFocusInput() {
    this.showIcon = true;
  }

  onFocusOutInput() {
    this.showIcon = false;
  }

  initForm() {
    this.form = this.formBuilder.group({
      userName: new FormControl('', [
        Validators.required,
        // Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(
        //   '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        // ),
      ]),
    });
  }
  // this.form.value.userName === 'sujeevan@gmail.com' &&
  // this.form.value.password === '123'
  handleBasicAuthLogin() {
    this.authenticationService
      .executeJWTAuthenticationService(this.form.value)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigateByUrl(`welcome/${this.form.value.userName}`);
        },
        (error) => {
          this.openSnackBar('Wrong User_name or Password', '!!Check');
        }
      );
    // this.router.navigateByUrl('/welcome');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  // username = '';
  // password = '';

  // error_msg = 'Invalid credentials';
  // valid = false;

  // submit() {
  //   if (this.username == 'sujeevan' && this.password == '123') {
  //     // this.router.navigateByUrl('/welcome');
  //     this.router.navigate(['welcome', this.username]);
  //     this.valid = false;
  //   } else this.valid = true;
  // }
}
