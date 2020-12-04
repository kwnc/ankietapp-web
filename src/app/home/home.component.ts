import {Component} from '@angular/core';

import {AuthService} from '@app/services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  account = this.accountService.accountValue;

  constructor(private accountService: AuthService) {
  }
}
