import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../services';
import {Survey} from '../models/survey/survey';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html'
})
export class FillComponent implements OnInit {

  survey: Survey;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getSurvey();
  }

  getSurvey(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.surveyService.getSurvey(id).subscribe(survey => this.survey = survey);
  }

  goBack(): void {
    this.location.back();
  }
}
