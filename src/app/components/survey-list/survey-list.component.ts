import {Component, OnInit} from '@angular/core';

import {SURVEYS} from '@app/mock-survey';
import {Survey} from '@app/models/survey';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.less']
})
export class SurveyListComponent implements OnInit {

  surveys = SURVEYS;
  selectedSurvey: Survey;

  constructor() {
  }

  ngOnInit(): void {
  }

}
