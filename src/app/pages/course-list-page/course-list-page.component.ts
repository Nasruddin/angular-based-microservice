import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-course-list-page',
  templateUrl: './course-list-page.component.html',
  styleUrls: ['./course-list-page.component.scss']
})
export class CourseListPageComponent implements OnInit {

  private courseList$: Observable<Course[]>;
  private errorObject: boolean = false;

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.courseList$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.courseService.getAllCourseAvailable(params.get('username')))
    ).pipe(
      catchError(() => {        
        this.errorObject = true;
        return Observable.throw('Error 404');
      })
    )
  }

}
