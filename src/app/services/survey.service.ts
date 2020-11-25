import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {NewSurvey} from '../models/survey-creation/new-survey';
import {environment} from '@environments/environment';
import {Observable, of} from 'rxjs';
import {Survey} from '@app/models/survey';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) {
  }

  // tslint:disable-next-line:typedef
  create(newSurvey: NewSurvey) {
    return this.http.post<NewSurvey>(`${environment.backendUrl}/surveys`, newSurvey);
  }

  // /** GET surveys from the servers */
  // getSurveys(): Observable<Survey[]> {
  //   return this.http.get<Survey[]>(`${environment.backendUrl}/surveys`)
  //     .pipe(
  //       catchError(this.handleError<Survey[]>('getSurveys', []))
  //     );
  // }

  /** GET surveys from the server */
  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${environment.backendUrl}/surveys`)
      .pipe(catchError(this.handleError<Survey[]>('getSurveys', [])));
  }

  // /** GET survey by id. Return `undefined` when id not found */
  // getSurveyNo404<Data>(id: number): Observable<Survey> {
  //   const url = `${environment.backendUrl}/?id=${id}`;
  //   return this.http.get<Survey[]>(url)
  //     .pipe(
  //       map(surveys => survey[0]), // returns a {0|1} element array
  //       tap(h => {const outcome = h ? `fetched` : `did not find`;}),
  //       catchError(this.handleError<Survey>(`getHero id=${id}`))
  //     );
  // }

  /** GET survey by id. Will 404 if id not found */
  getSurvey(id: number): Observable<Survey> {
    const url = `${environment.backendUrl}/${id}`;
    return this.http.get<Survey>(url).pipe(catchError(this.handleError<Survey>(`getSurvey id=${id}`)));
  }

  /* GET surveys whose name contains search term */
  searchSurveys(term: string): Observable<Survey[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Survey[]>(`${environment.backendUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Survey[]>('searchSurveys', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // // tslint:disable-next-line:typedef
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
