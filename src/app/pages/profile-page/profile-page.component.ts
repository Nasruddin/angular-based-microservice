import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { StudentCourseDto } from '../../models/student-course-dto';
import { Observable } from 'rxjs';
import { Student } from '../../models/student';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  
  private registeredCourseList$: Observable<StudentCourseDto[]>;
  private registeredStudent$: Observable<Student>;
  private errorObject: boolean;
  
  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.registeredCourseList$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.studentService.getAllRegisteredCourses(params.get('username')))
    ).pipe(
      catchError(() => {
        console.log('here')     
        this.errorObject = true;
        return Observable.throw('Error 404');
      })
    )

    this.registeredStudent$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.studentService.getUserDetails(params.get('username'))
    ))
  }

}
