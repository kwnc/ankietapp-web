import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LayoutComponent} from './layout.component';
import {ListComponent} from './list.component';
import {CreateComponent} from './create.component';
import {FillComponent} from './fill.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', component: ListComponent},
      {path: 'create', component: CreateComponent},
      {path: 'fill/:id', component: FillComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule {
}
