import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_shared/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApplicationUserModel } from 'src/app/_models/application-user-model';
import { LoginModel } from 'src/app/_models/login-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../user.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required, this.newUser.bind(this)]}),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(environment.passwordMinLenth)]),
    confirmPassword: new FormControl(
      '', [Validators.required, Validators.minLength(environment.passwordMinLenth)]
      )
  }, {validators: this.passwordsMatch.bind(this)});
  usernames: string[] = [];

  constructor(public userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm.reset();
  }

  onSubmit() {
    const applicationUserModel = new ApplicationUserModel(
      this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password
      );
    this.userService.register(applicationUserModel).subscribe(
      (result: any) => {
        this.loginAfterRegister(new LoginModel(applicationUserModel.username, applicationUserModel.password));
      },
      error => {
        alert('Error registering new user');
      }
    );
  }

  private loginAfterRegister(loginModel: LoginModel) {
    localStorage.clear();
    this.userService.login(loginModel).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['dashboard']);
      },
      error => {
        if (error.status === 400) {
          console.log('Invalid credentials!');
        } else {
          console.log(error);
        }
      }
    );
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if (password !== confirmPassword) {
      return {passwordsNotSame: true};
    }
    return null; // TODO: come back and fix this, currently get error if return null
  }

  newUser(control: FormControl) {
    if (this.usernames && this.getIndexOfString(this.usernames, control.value) >= 0) {
      return {existingUser: true};
    }
    return null;
  }

  private getIndexOfString(array: string[], value: string) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].toLowerCase() === value.toLowerCase()) {
        return i;
      }
    }
    return -1;
  }

}
