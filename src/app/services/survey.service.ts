import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewSurvey} from '../models/survey-creation/new-survey';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private http: HttpClient
  ) {
  }

  // tslint:disable-next-line:typedef
  create(newSurvey: NewSurvey) {
    return this.http.post<NewSurvey>(`${environment.backendUrl}/surveys`, newSurvey);
  }
}
