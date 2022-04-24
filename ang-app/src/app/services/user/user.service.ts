import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const API_URL = "http://localhost:3000/api/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getUser(username: string): Observable<any> {
    return this.http.get(API_URL + "getUser",{params: {username: username}});
  }

  getCourses(){
    return this.http.get(API_URL + "course/getCourses");
  }

  getInstructors(){
    return this.http.get(API_URL + "getInstructors");
  }

  setInstructor(inst: Object, course: Object){
    return this.http.post(API_URL + "setInstructor",{inst: inst,course: course},this.httpOptions);
  }
}
