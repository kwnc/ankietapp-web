import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {SurveysRoutingModule} from './surveys-routing.module';
import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {CreateComponent} from './create.component';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FillComponent } from './fill.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SurveysRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    CreateComponent,
    FillComponent
  ]
})
export class SurveysModule {
}
