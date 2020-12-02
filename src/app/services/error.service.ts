import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line:typedef
  public handleError<T>(operation = 'operation', result?: T) {
    return (): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
