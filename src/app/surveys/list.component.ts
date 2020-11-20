import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService} from '@app/services';
import {SURVEYS} from '../mock-survey';
import {Survey} from '../models/survey';

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {

  surveys = SURVEYS;
  selectedSurvey: Survey;

  ngOnInit(): void {
  }

  // constructor(private accountService: AccountService) {
  // }
  //
  // ngOnInit(): void {
  //   this.accountService.getAll()
  //     .pipe(first())
  //     .subscribe(users => this.users = users);
  // }
  //
  // deleteUser(id: string) {
  //   const user = this.users.find(x => x.id === id);
  //   user.isDeleting = true;
  //   this.accountService.delete(id)
  //     .pipe(first())
  //     .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  // }
}
