import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AuthService} from '@app/services';
import {Account} from '../models';

@Component({templateUrl: 'accounts.component.html'})
export class AccountsComponent implements OnInit {

  accounts: Account[];

  constructor(
    private accountService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.accountService.getUsers()
      .pipe(first())
      .subscribe(accounts => this.accounts = accounts);
  }

  delete(account: Account): void {
    this.accounts = this.accounts.filter(a => a !== account);
    this.accountService.deleteAccount(account).subscribe();
  }
}
