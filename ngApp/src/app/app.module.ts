import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

//import auth Service
import { AuthService } from "./auth.service";
//import event Service
import { EventService } from "./event.service";

//import AuthGuard
import { AuthGuard } from "./auth.guard";

// import token interceptor service
import { TokenInterceptorService } from "./token-interceptor.service";



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  //provide service and guard
  providers: [AuthService,EventService,AuthGuard,
    //provide token interceptor service as object
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,//which class
      multi : true //req. handle multiple interceptors
    
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
