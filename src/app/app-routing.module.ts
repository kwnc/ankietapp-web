import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const surveysModule = () => import('./surveys/surveys.module').then(x => x.SurveysModule);

// , canActivate: [AuthGuard]
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'surveys', loadChildren: surveysModule},
  {path: 'users', loadChildren: usersModule},
  {path: 'account', loadChildren: accountModule},

  // otherwise redirect to home
  {path: '**', redirectTo: ''},
  {path: '', pathMatch: 'full', redirectTo: '/account/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
