import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventUrl = "http://localhost:3000/api/events";
  private _SpecialEventUrl = "http://localhost:3000/api/special";

  constructor(private http:HttpClient) { }

  getEvents(user){
    return this.http.get(this._eventUrl,user)
  }
  getSpecialEvents(user){
    return this.http.get(this._SpecialEventUrl,user)
  }
}

