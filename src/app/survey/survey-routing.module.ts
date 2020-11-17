import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SurveyCreationComponent} from './survey-creation/survey-creation.component';

const routes: Routes = [
  {
    path: '', component: SurveyCreationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
