import { Injectable, Injector } from '@angular/core';

import { HttpInterceptor } from "@angular/common/http";//import http interceptor

import { AuthService } from './auth.service';// import auth service

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  // initialize injector(injector is a instance of injector class)
  constructor(private injector : Injector) { }
  //intercept is a default method
  intercept(req,nxt)
  {
    //define authservice and injector
    let authService = this.injector.get(AuthService)
    // clone the request
    let tokenizedReq = req.clone({

      // include autherisation
      //set headers using 'setHeaders' method with the autherization details
      setHeaders:{
        //autherisation with the help of token
        //autherisation : 'Bearer xx.yy.zz' //use any values seperated by two dots resembling a valid token
        autherization : `Bearer ${authService.getToken()}`

      }

    })
    return nxt.handle(tokenizedReq);
  }
}
