import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: User | undefined;
  isInstructor = false;
  isStudent = false;
  isAdmin = false;
  roles: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    //this.router.navigate(['/']);
    // console.log(this.router.snapshotparamMap.get("butcher"));
    //this.getUser().then((dat: any) => {console.log(dat)});
    //console.log(this.user);
    this.getUser();
  }


  getUser(): void{
    const uname = String(this.route.snapshot.paramMap.get('username'));
    this.userService.getUser(uname).subscribe(
      data => {
        this.user = data;
        this.setBadges();
        console.log(this.user);
      },
      err => {
        this.router.navigate(['/'])
        console.log(err)
      }
    )
  }

  setBadges(){
    this.user?.roles.forEach((role: any) => {this.roles.push(role.name)});
    this.isInstructor = this.roles.includes("instructor");
    this.isStudent = this.roles.includes("student");
    this.isAdmin = this.roles.includes("admin");
  }
}
