import {Component, OnInit} from '@angular/core';

import {Survey} from '../models/survey/survey';
import {SurveyService, AlertService} from '../services';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {

  surveys: Survey[];
  selectedSurvey: Survey;

  constructor(
    private surveyService: SurveyService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getSurveys();
  }

  getSurveys(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
  }

  raport(id: number): void {
    this.surveyService.getRaport(id)
    .subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
        this.alertService.error(err);
      }
    );
  }
}
