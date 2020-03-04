import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApplicationUserModel } from '../_models/application-user-model';
import { LoginModel } from '../_models/login-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controller = 'ApplicationUser/';
  headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  register(applicationUserModel: ApplicationUserModel) {
    return this.http.post(
      environment.baseUrl + this.controller + 'Register', applicationUserModel, {headers: this.headers});
  }

  login (loginModel: LoginModel) {
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    console.log(environment.baseUrl + this.controller + 'Login');
    return this.http.post(
      environment.baseUrl + this.controller + 'Login', loginModel, {headers: this.headers});
  }

  getUserProfile() {
    // we are going to use httpinterceptor from angular to take care of the token throughout the entire applcation
    // const tokenHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(environment.baseUrl + 'UserProfile', {headers: this.headers});
  }
}
