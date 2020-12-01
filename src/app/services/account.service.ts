import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {finalize, map, mapTo, tap, catchError} from 'rxjs/operators';

import {environment} from '@environments/environment';
// import {Account} from '@app/models';
import { Account } from '../models/account';
import { Tokens } from '../models/tokens';

import {tokenize} from '@angular/compiler/src/ml_parser/lexer';

@Injectable({providedIn: 'root'})
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;
  private loggedUser: string;
  private readonly JWT_TOKEN = 'JWT_TOKEN';

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

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${​​​​​environment.backendUrl}/signIn`, {​​​​​ email, password })
      .pipe(
        tap(tokens => this.doLoginUser(email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }​​​​​

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    console.log(tokens)
    localStorage.setItem(this.JWT_TOKEN, tokens.idToken);
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }
  
//   login(email: string, password: string) {​​​​​
//     return this.http.post<any>(`${​​​​​environment.backendUrl}​​​​​/signin`, {​​​​​ email, password }​​​​​)
//       .pipe(map(account => {​​​​​
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('account', JSON.stringify(account));
//         // this.accountSubject.next(account);
//         // return account;
//       }​​​​​));
//   }​​​​​
  
  logout() {
    this.http.post<any>(`${environment.backendUrl}/revoke-token`, {}, {withCredentials: true}).subscribe();
    // this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
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
}
