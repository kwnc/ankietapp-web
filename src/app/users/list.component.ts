import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AuthService } from '@app/services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {

    users = null;

    constructor(private accountService: AuthService) {}

    ngOnInit(): void {
        this.accountService.getUsers()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string): void {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
}
