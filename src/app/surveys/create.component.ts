import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

import { SurveyService, AlertService } from '@app/services';

import { Survey } from '../models/survey/survey';
import { Question } from '../models/survey/question';

@Component({templateUrl: 'create.component.html'})
export class CreateComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  submitted = false;

  survey: Survey;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private surveyService: SurveyService,
      private alertService: AlertService
  ) { }

  textType = 'Pytanie otwarte';
  dateType = 'Data';
  multipleChoiceType = 'Wielokrotnego wyboru';
  singleChoice = 'Jednokrotnego wyboru';
  types = [
    this.singleChoice,
    this.multipleChoiceType,
    this.textType,
    this.dateType,
  ];

  get f() {
    return this.formGroup.controls;
  }

  getQuestions(): FormArray {
    return this.formGroup.get('questions') as FormArray;
  }

  addQuestion(): void {
    (this.formGroup.get('questions') as FormArray).push(new FormGroup({
      description: new FormControl('', [Validators.required]),
      type: new FormControl(this.singleChoice, [Validators.required]),
      choices: new FormArray([new FormControl('', [Validators.required])])
    }));
  }

  deleteQuestion(questionIndex: number): void {
    this.getQuestions().removeAt(questionIndex);
  }

  isClosedQuestion(index: number): boolean {
    return this.getQuestions().at(index).get('type').value === this.multipleChoiceType ||
    this.getQuestions().at(index).get('type').value === this.singleChoice;
  }

  onTypeChange(index: number, type: string): void {
    this.getQuestions().at(index).get('type').setValue(type);
    if (type === this.multipleChoiceType || type === this.singleChoice) {
      if (this.getChoices(index).length === 0) {
        this.addChoice(index);
      }
    }
    else {
      if (this.getChoices(index).length > 0) {
        this.getChoices(index).clear();
      }
    }
  }

  getChoices(questionIndex: number): FormArray {
    return (this.formGroup.get('questions') as FormArray).at(questionIndex).get('choices') as FormArray;
  }

  addChoice(questionIndex: number): void {
    this.getChoices(questionIndex).push(new FormControl('', [Validators.required]));
  }

  deleteChoice(questionIndex: number, choiceIndex: number): void {
    this.getChoices(questionIndex).removeAt(choiceIndex);
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        public: [false, Validators.required],
        users: new FormControl('', [Validators.nullValidator]),
        dueDate: ['', Validators.required],
        questions: new FormArray([])
    });
    this.addQuestion();
  }

  onSubmit(): void {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }

    this.loading = true;

    const newSurvey = new Survey();
    newSurvey.name = this.formGroup.get('name').value;
    newSurvey.description = this.formGroup.get('description').value;
    newSurvey.dueDate = this.formGroup.get('dueDate').value;
    newSurvey.public = this.formGroup.get('public').value;
    if (!newSurvey.public) {
      newSurvey.users = this.formGroup.get('users').value.split(';');
    } else {
      newSurvey.users = [];
    }
    newSurvey.questions = [];

    const questionsArray = this.formGroup.get('questions') as FormArray;
    for (let i = 0; i < questionsArray.length; i++) {
      const questionGroup = questionsArray.at(i);
      const newSurveyQuestion = new Question();
      newSurveyQuestion.description = questionGroup.get('description').value;
      const typeDescription = questionGroup.get('type');
      if (typeDescription.value === this.textType) {
        newSurveyQuestion.type = 'text';
      } else if (typeDescription.value === this.multipleChoiceType) {
        newSurveyQuestion.type = 'multipleChoice';
      } else if (typeDescription.value === this.dateType) {
        newSurveyQuestion.type = 'date';
      } else if (typeDescription.value === this.singleChoice) {
        newSurveyQuestion.type = 'singleChoice';
      }
      newSurveyQuestion.choices = [];
      const choicesArray = questionGroup.get('choices') as FormArray;
      for (const choice of choicesArray.controls) {
        newSurveyQuestion.choices.push(choice.value);
      }
      newSurveyQuestion.sortOrder = i + 1;
      newSurvey.questions.push(newSurveyQuestion);
    }

    this.surveyService.create(newSurvey)
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
}
