import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const API_URL = "http://localhost:3000/api/";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(API_URL + "getUser",{params: {username: username}});
  }
}
