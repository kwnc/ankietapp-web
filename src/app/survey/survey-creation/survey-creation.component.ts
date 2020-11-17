import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SurveyService, AlertService } from '@app/services';

@Component({
  selector: 'app-survey-creation',
  templateUrl: './survey-creation.component.html',
  styleUrls: ['./survey-creation.component.less']
})
export class SurveyCreationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private surveyService: SurveyService,
      private alertService: AlertService
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.surveyService.create(this.f.name.value, this.f.description.value, this.f.dueDate.value)
      .subscribe({
      next: () => {
        const returnUrl = '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        this.alertService.error(error);
        this.loading = false;
      }
    });
  }
}
