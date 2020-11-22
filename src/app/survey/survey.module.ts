import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyCreationComponent } from './survey-creation/survey-creation.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [SurveyCreationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveyRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SurveyModule { }
