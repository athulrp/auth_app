import { Component, OnInit } from '@angular/core';

import { AuthService } from "../auth.service";

import { Router } from "@angular/router"; //import router for authentication(;;)

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeredUser : any  ={
    
    // email : "",
    // password : ""
    
  };

  constructor(private _auth : AuthService ,private _router : Router) { } //object of 'router(;;' and 'service'

  registerUser(){

    // console.log(this.registeredUser);

    this._auth.registerUser(this.registeredUser) //'registerUser'=fun. in the service file
    .subscribe(
      // res=>console.log(res),
      res=>{
        localStorage.setItem('token',res.token)//store token in to localstorage
        this._router.navigate(['/special'])//after successful response , navigate it(;;)
      },
      err=>console.log(err)
    )
  }

  ngOnInit(): void {
  }

}
