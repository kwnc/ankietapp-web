import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';
import {LayoutComponent} from './layout.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {MaterialModule} from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AccountModule {
}
