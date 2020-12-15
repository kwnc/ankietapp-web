import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserSurvey} from '../models/user-survey';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html'
})

export class FillComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;

  userSurvey: UserSurvey;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private location: Location
  ) {
  }

  get f() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.getUserSurvey();
  }

  getUserSurvey(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.surveyService.getUserSurvey(id).subscribe(userSurvey => {
      console.log(userSurvey);
      return this.userSurvey = userSurvey;
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {

  }
}
