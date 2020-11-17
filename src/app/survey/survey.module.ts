import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyCreationComponent } from './survey-creation/survey-creation.component';


@NgModule({
  declarations: [SurveyCreationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
