import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User = this.tokenStorage.getUser();

  form: any = {
    full_name: this.user.full_name,
    username: this.user.username,
    email: this.user.email,
    image_url: this.user.image_url
  }


  isInstructor = false;
  isStudent = false;
  isAdmin = false;

  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.setBadges();
  }


  setBadges(){
    this.isInstructor = this.user.roles.includes("instructor")!;
    this.isStudent = this.user.roles.includes("student")!;
    this.isAdmin = this.user.roles.includes("admin")!;
  }

  onSubmit(){
    console.log("log herer");
    let out: any = new Object();
    if(this.user!.email != this.form.email){
      out.email = this.form.email;
    }
    if(this.user!.username != this.form.username){
      out.username = this.form.username;
    }
    out.full_name = this.form.full_name;
    out.image_url = this.form.image_url;
    this.authService.updateUser(out).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveUser(Object.assign(this.user,out));
      },
      err => {
        console.error(err);
      }
    );
  }
}
