import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private http:HttpClient) { }

  registerUser(user){
    return this.http.post<any>(this._registerUrl,user);//<any> used for get token
  }
  loginUser(user){
    return this.http.post<any>(this._loginUrl,user);
  }

  //route Guard
  loggedIn(){
    return !!localStorage.getItem('token')  //getItem = read LS token value ,'!!' = checking where or not
    //fun return true(if there is a token value) , else false
  }

  //token-interceptor
  //reading the value of token in the localstorage
  getToken(){
    return localStorage.getItem('token')
  }
}
