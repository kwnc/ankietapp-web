import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Survey} from '../models/survey';
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
  create(name, description, dueDate) {
    return this.http.post<Survey>(`${environment.apiUrl}/surveys`, {name, description, dueDate});
  }
}
