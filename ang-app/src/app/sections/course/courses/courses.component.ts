import { Component, OnInit } from '@angular/core';

// event logout
import { EventBusService } from 'src/app/services/events/event-bus.service';
import { EventData } from 'src/app/services/events/event.class';

import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

// popup
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {


  user: User = this.tokenStorage.getUser(); 
  courses: any;
  instructors: any;
  form: any = {
    full_name: this.user.full_name,
    username: this.user.username,
    email: this.user.email,
    image_url: this.user.image_url
  }
  // popup
  fromDate: NgbDate | undefined;
  toDate: NgbDate | undefined;
  hoveredDate: NgbDate | undefined;
  closeResult: string | undefined;
  model1 : NgbDate | undefined;
  model2 : NgbDate | undefined;
 
  // course
  selected_course: any;



  isInstructor = false;
  isStudent = false;
  isAdmin = false;

  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private userService: UserService,
              private modalService: NgbModal, 
              private calendar: NgbCalendar,
              private busService: EventBusService) { }

  ngOnInit(): void {
    this.setBadges();
    this.updateCourses();
    this.userService.getInstructors().subscribe(res => {
      this.instructors = res;
    })
  }

  updateCourses(){
    this.userService.getCourses().subscribe(res => {
      console.log(res);
      this.courses = res;
    },
    err => {
      console.error(err);
      if(err.status == 401){
        // example of auth control with event bus (*now using authGuard)
        //this.busService.emit(new EventData('logout',null));
      }
    });
  }
  activateCourse(course: any){
    this.selected_course = course;
  }

  setInstructor(inst: any){
    this.userService.setInstructor(inst,this.selected_course).subscribe(res => {
      this.updateCourses();
      console.log(res);
    })
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


  
  open(content: any, type: any, modalDimension: any) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}
isRangeStart(date: NgbDate){
  return this.model1 && this.model2 && date.equals(this.model1);
}
isRangeEnd(date: NgbDate){
  return this.model1 && this.model2 && date.equals(this.model2);
}
isInRange(date: NgbDate){
  return date.after(this.model1) && date.before(this.model2);
}
isActive(date: NgbDate){
  return date.equals(this.model1) || date.equals(this.model2);
}
endDateChanged(date: any){
  if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
    this.model1 = this.model2;
  }
}
startDateChanged(date: any){
  if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
    this.model2 = this.model1;
  }
}

}
