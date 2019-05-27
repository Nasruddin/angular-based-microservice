import { Observable, throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ServiceUtils {
    static logError<T>(operation = 'Loading data...') {
        return (error: any): Observable<T> => {
            console.error(
                `Backend returned code ${error.status},
                body was: ${JSON.stringify(error.error)}`
            );
            return throwError(error.error)
        }
    }

    static logErrorAndReturnDummyResult<T>(operation = 'Loading', result?: T) {
        return (error: any): Observable<T> => {
            console.error(
                `Backend returned code ${error.status},
                body was: ${JSON.stringify(error.error)}`
            );
            return of(result as T);
        }
    }
}