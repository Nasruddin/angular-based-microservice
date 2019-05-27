import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentCourseDto } from '../models/student-course-dto';
import { environment } from '../../environments/environment';
import { retry, tap, shareReplay, catchError } from 'rxjs/operators';
import { ServiceUtils } from '../helpers/service.utils';
import { Student } from '../models/student';

@Injectable({providedIn: 'root'})
export class StudentService {
    private apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }
    
    getAllRegisteredCourses(username: string): Observable<StudentCourseDto[]> {
        return this.httpClient.get<StudentCourseDto[]>(`${this.apiUrl}/course/v1/students/${username}/courses`)
            .pipe(
                retry(2),
                tap(
                    course => console.log(course)
                ),
                shareReplay(),
                catchError(ServiceUtils.logError<StudentCourseDto[]>(`
                    Trying to fetch list of all courses registered`
                ))
            );
    }

    getUserDetails(username: String): Observable<Student> {
        return this.httpClient.get<Student>(`${this.apiUrl}/course/v1/students/${username}`)
            .pipe(
                retry(2),
                tap(
                    course => console.log(course)
                ),
                shareReplay(),
                catchError(ServiceUtils.logError<Student>(`
                    Trying to fetch student details`
                ))
            );
    }
}