import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {LayoutComponent} from './layout.component';
import {AccountsComponent} from './accounts.component';
import {AddEditComponent} from './add-edit.component';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialModule
  ],
  declarations: [
    LayoutComponent,
    AccountsComponent,
    AddEditComponent
  ]
})
export class UsersModule {
}
