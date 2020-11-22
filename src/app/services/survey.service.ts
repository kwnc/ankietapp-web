import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import { NewSurvey } from '../models/survey-creation/new-survey';

@Injectable({ providedIn: 'root' })
export class SurveyService {

    constructor(
        private http: HttpClient
    ) {}

    create(newSurvey: NewSurvey) {
        return this.http.post(`${environment.apiUrl}/surveys`, newSurvey);
    }
}
