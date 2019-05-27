import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from '../../environments/environment';
import { retry, tap, catchError, shareReplay } from 'rxjs/operators';
import { ServiceUtils } from '../helpers/service.utils';
import { StudentCourse } from '../models/student-course';

@Injectable({providedIn: 'root'})
export class CourseService {
    private apiUrl: string = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }
    
    getAllCourseAvailable(username: string) : Observable<Course[]>{
        return this.httpClient.get<Course[]>(`${this.apiUrl}/course/v1/courses/${username}`)
            .pipe(
                retry(2),
                tap(
                    course => console.log(course)
                ),
                shareReplay(),
                catchError(ServiceUtils.logError<Course[]>(`
                    Trying to fetch list of all courses available`
                ))
            );
    }

    register(studentCourse: StudentCourse): Observable<any> {        
        const url = `${this.apiUrl}/course/v1/courses/register`;
        return this.httpClient.post(url, studentCourse);
    }
}