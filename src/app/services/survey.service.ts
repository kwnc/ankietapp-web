import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Survey } from '../models/survey';

@Injectable({ providedIn: 'root' })
export class SurveyService {

    constructor(
        private http: HttpClient
    ) {}

    create(name, description, dueDate) {
        return this.http.post<Survey>(`${environment.apiUrl}/surveys`, {name, description, dueDate});
    }
}
