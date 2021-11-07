import { Injectable } from '@angular/core';
// import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

import { CanActivate,Router } from "@angular/router";//import router

import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private _auth : AuthService ,private _router : Router) { }

  canActivate():boolean{ //canActivate method return a boolean

    if(this._auth.loggedIn())
    {
      console.log('true');
      return true;

    }
    else{
      //if the token is not present navigate login
      this._router.navigate(['/login']);
      return false;

    }


    
  }


  
}


// AuthGuard will be activated 
// through which the loggedIn() will be called 
// and return true/false value based on the 
// presence/absence of token value