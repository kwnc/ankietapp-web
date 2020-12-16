import {Component, OnInit} from '@angular/core';
import {AlertService, AuthService, SurveyService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserSurvey} from '../models/user-survey';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SurveyResponse} from '../models/survey-response';
import {Answer} from '../models/answer';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html'
})

export class FillComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  submitted = false;

  userSurvey: UserSurvey;
  surveyResponse: SurveyResponse;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private authService: AuthService,
    private alertService: AlertService,
    private location: Location
  ) {
  }

  get f() {
    return this.formGroup.controls;
  }

  getAnswers(): FormArray {
    return this.formGroup.get('answers') as FormArray;
  }

  addAnswer(): void {
    (this.formGroup.get('answers') as FormArray).push(new FormGroup({
      value: new FormControl('', [Validators.required])
    }));
  }

  ngOnInit(): void {
    this.getUserSurvey();
    this.formGroup = this.formBuilder.group({
      answers: new FormArray([])
    });
    this.addAnswer();
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    // if (this.formGroup.invalid) {
    //   return;
    // }

    this.loading = true;

    this.surveyResponse.answers = [];

    let answersArray = this.formGroup.get('answers') as FormArray;
    for (let i = 0; i < answersArray.length; i++) {
      const answerGroup = answersArray.at(i);
      let answer = new Answer();
      answer.value = answersArray.get('value').value;

      this.surveyResponse.answers.push(answer);
    }

    this.surveyService.sendSurveyResponse(this.userSurvey, this.surveyResponse)
      .subscribe(
        data => {
          console.log(data);
          const returnUrl = '/home';
          this.router.navigateByUrl(returnUrl);
        },
        err => {
          console.log(err);
          this.alertService.error(err);
          this.loading = false;
        }
      );
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
}
