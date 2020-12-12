import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../services';
import {Survey} from '../models/survey/survey';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserSurvey} from '../models/user-survey';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html'
})
export class FillComponent implements OnInit {

  userSurvey: UserSurvey;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getUserSurvey();
  }

  getUserSurvey(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.surveyService.getUserSurvey(id).subscribe(userSurvey => this.userSurvey = userSurvey);
  }

  goBack(): void {
    this.location.back();
  }
}
