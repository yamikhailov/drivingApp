import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs"
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../token-storage/token-storage.service';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  readonly AUTH_API = 'http://localhost:3000/api/auth/';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private tokenService: TokenStorageService) { }


  isAuthenticated(): boolean{
   // console.log("we are inside");
    const token = this.tokenService.getToken();
    //console.log(this.jwtHelper.isTokenExpired(token || ''))
    return this.jwtHelper.isTokenExpired(token || '');
  }
  
  login(username: string, password: string): Observable<any>{
    return this.http.post(this.AUTH_API + 'signin',{username,password},this.httpOptions);
  }

  register(username:string, email: string,  full_name: string, password: string, roles: string[]): Observable<any>{
    console.log({roles});
    return this.http.post(this.AUTH_API + "signup",{username,email,full_name,password,roles},this.httpOptions);
  }

  updateUser(params: {}){
    console.log("params: ", params);
    return this.http.post(this.AUTH_API + "updateUser",params,this.httpOptions);
  }

  logout(){
    this.tokenService.signOut();
    window.location.reload();
  }

}
