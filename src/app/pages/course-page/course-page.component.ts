import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { AuthenticationService } from '../../services/authentication.service';
import { StudentCourse } from '../../models/student-course';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  @Input()
  private course: Course;
  private courseType: string;
  private disableRegister: boolean;
  private showRegisterLoader: boolean;

  constructor(private courseService: CourseService, private authentication: AuthenticationService) { }

  ngOnInit() {
  
  }

  registerForACourse(courseId: string): void {
    this.disableRegister = true;
    this.showRegisterLoader = true;
    const studentCourse: StudentCourse = {courseId, username: this.authentication.currentUserValue.username};
    this.courseService.register(studentCourse)
      .subscribe(registeredData => {
        this.showRegisterLoader = false;
      },
      error => {
        this.disableRegister = false;
        this.showRegisterLoader = false;
      });
  }

  getCourseType(): string {
    
    if (this.course && this.course.featured === true) {
      return this.courseType = 'FEATURED'
    } else if (this.course && this.course.trending === true) {
      return this.courseType = 'TRENDING'
    } else {
      return this.courseType = 'NORMAL';
    }
  }

}
