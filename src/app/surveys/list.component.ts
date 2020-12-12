import {Component, OnInit} from '@angular/core';

import {Survey} from '../models/survey/survey';
import {SurveyService} from '../services';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {

  surveys: Survey[];
  selectedSurvey: Survey;

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
  }
}
