import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseBookingComponent } from './course-booking/course-booking.component';
import { AuthGuardService as AuthGuard} from 'src/app/services/auth/auth-guard.service';


const routes: Routes = [
  {path: '', component: CoursesComponent, canActivate: [AuthGuard]},
  {path: ':id', component: CourseBookingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
