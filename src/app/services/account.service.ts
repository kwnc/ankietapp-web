import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {Account} from '@app/models';

@Injectable({providedIn: 'root'})
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.backendUrl}/authenticate`, {email, password}, {withCredentials: true})
      .pipe(map(user => {
        this.accountSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  logout() {
    this.http.post<any>(`${environment.backendUrl}/revoke-token`, {}, {withCredentials: true}).subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  refreshToken() {
    return this.http.post<any>(`${environment.backendUrl}/refresh-token`, {}, {withCredentials: true})
      .pipe(map((account) => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }));
  }

  register(account: Account) {
    return this.http.post(`${environment.backendUrl}/signup`, account);
  }

  verifyEmail(token: string) {
    return this.http.post(`${environment.backendUrl}/verify-email`, {token});
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.backendUrl}/forgot-password`, {email});
  }

  validateResetToken(token: string) {
    return this.http.post(`${environment.backendUrl}/validate-reset-token`, {token});
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post(`${environment.backendUrl}/reset-password`, {token, password, confirmPassword});
  }

  getAll() {
    return this.http.get<Account[]>(`${environment.backendUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<Account>(`${environment.backendUrl}/users/${id}`);
  }

  create(params) {
    return this.http.post(environment.backendUrl, params);
  }

  update(id, params) {
    return this.http.put(`${environment.backendUrl}/${id}`, params)
      .pipe(map((account: any) => {
        // update the current account if it was updated
        if (account.id === this.accountValue.id) {
          // publish updated account to subscribers
          account = {...this.accountValue, ...account};
          this.accountSubject.next(account);
        }
        return account;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.backendUrl}/${id}`)
      .pipe(finalize(() => {
        // auto logout if the logged in account was deleted
        if (id === this.accountValue.id) {
          this.logout();
        }
      }));
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
