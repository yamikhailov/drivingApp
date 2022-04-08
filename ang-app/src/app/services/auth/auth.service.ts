import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  readonly AUTH_API = 'http://localhost:3000/api/auth/';
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any>{
    return this.http.post(this.AUTH_API + 'signin',{username,password},this.httpOptions);
  }

  register(username:string, email: string, password: string): Observable<any>{
    return this.http.post(this.AUTH_API + "signup",{username,email,password},this.httpOptions);
  }


}
