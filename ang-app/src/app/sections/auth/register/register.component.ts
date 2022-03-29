import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  test : Date = new Date();
  focus: any;
  focus1: any;
  focus2: any;

  form: any = {
    username: null,
    email: null,
    password: null
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit(): void{
    const {username, email, password} = this.form;
    console.log(this.form);
    this.authService.register(username,email,password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true; 
      }
    )
  }
}
