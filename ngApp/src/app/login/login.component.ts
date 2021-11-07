import { Component, OnInit } from '@angular/core';

import { AuthService } from "../auth.service";

import { Router } from "@angular/router"; //import router for authentication(;;)


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginedUser : any ={};


  constructor(private _auth:AuthService ,private _router : Router) { }//(;;)

  loginUser(){
    // console.log(this.loginedUser)
    this._auth.loginUser(this.loginedUser)
    .subscribe(
      // res=>console.log(res),
      res=>{
        localStorage.setItem('token' , res.token)
        this._router.navigate(['/special'])//(;;)

      },
      err=>console.log(err)
    )

  }

  ngOnInit(): void {
  }

}
