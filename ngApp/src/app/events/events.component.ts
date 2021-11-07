import { Component, OnInit } from '@angular/core';

import { EventService } from "../event.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  events : any = [];

  constructor(private _event:EventService) { }

  ngOnInit(): void {

    this._event.getEvents(this.events)
    .subscribe(
      res=> this.events=res,
      err=>console.log(err)
    )
  }

}
