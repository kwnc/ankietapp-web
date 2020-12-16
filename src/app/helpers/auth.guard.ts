import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {AuthService} from '@app/services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AuthService
  ) {
  }

  canActivate(): boolean {
    if (this.accountService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
    return !this.accountService.isLoggedIn();
  }
}
