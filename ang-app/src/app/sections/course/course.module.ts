import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { CourseRoutingModule } from './course-routing.module';
import { CourseBookingComponent } from './course-booking/course-booking.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseBookingComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
  ]
})
export class CourseModule {
  

}
