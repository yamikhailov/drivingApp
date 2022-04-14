import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { EventData } from './event.class';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private sub = new Subject<EventData>();

  constructor() { }

  emit(event: EventData){
    this.sub.next(event);
  }
  
  on(name: string, action: any): Subscription{
    return this.sub.pipe(
      filter((ev: EventData) => ev.name === name),
      map((ev: EventData) => ev['value'])
    ).subscribe(action);
  }
}
