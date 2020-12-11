import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../services';
import {Survey} from '../models/survey';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html'
})
export class FillComponent implements OnInit {

  survey: Survey;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {
  }

  ngOnInit(): void {
    this.getSurvey();
  }

  getSurvey(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.surveyService.getSurvey(id).subscribe(survey => this.survey = survey);
  }

}
