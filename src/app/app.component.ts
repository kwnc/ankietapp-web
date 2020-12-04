import { Component } from '@angular/core';

import { AuthService } from './services';
import { Account } from './models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: Account;

    constructor(private accountService: AuthService) {
        this.accountService.account.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}
