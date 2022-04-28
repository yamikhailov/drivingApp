import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

const open_time = 8;
const closing_time = 19;

const URL = "http://localhost:3000/api/booking/";
@Injectable({
  providedIn: 'root'
})



export class BookingService {

  constructor(private http: HttpClient) { }
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  BookingFindByDay(year: string,month: string,day: string){
    return this.http.get(URL + "findByDay",{params: {year,month,day}});
  }

  setBooking(year: string, month: string, day: string, hour: string, course_id: string){
    return this.http.post(URL + "setBooking", {year, month, day, hour, course_id}, this.httpOptions);
  }

}
