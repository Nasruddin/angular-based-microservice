import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { config } from 'process';

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private apiUrl: string = environment.apiUrl;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}/auth`, { username, password })
            .pipe(map(user => {                
                if (user && user.token) {                    
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);                    
                }
                return user;
            }));
    }

    logout() {        
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}