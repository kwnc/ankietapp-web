import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {finalize, map, mapTo, tap, catchError} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {Account} from '@app/models';
import {Tokens} from '@app/models';

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

  login(user: {email: string, password: string}): Observable<boolean> {
    return this.http.post<any>(`${environment.backendUrl}/signin`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  private doLoginUser(username: string, tokens: any): void {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens): void {
    console.log(tokens);
    localStorage.setItem(this.JWT_TOKEN, tokens.idToken);
  }

  logout(): void {
    this.http.post<any>(`${environment.backendUrl}/revoke-token`, {}, {withCredentials: true}).subscribe();
    // this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(account: Account): Observable<object> {
    return this.http.post(`${environment.backendUrl}/signup`, account);
  }

  verifyEmail(token: string): Observable<object> {
    return this.http.post(`${environment.backendUrl}/verify-email`, {token});
  }

  forgotPassword(email: string): Observable<object> {
    return this.http.post(`${environment.backendUrl}/forgot-password`, {email});
  }

  resetPassword(token: string, password: string, confirmPassword: string): Observable<object> {
    return this.http.post(`${environment.backendUrl}/reset-password`, {token, password, confirmPassword});
  }

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.backendUrl}/users`);
  }

  getById(id: string): Observable<Account> {
    return this.http.get<Account>(`${environment.backendUrl}/users/${id}`);
  }

  create(params): Observable<object> {
    return this.http.post(environment.backendUrl, params);
  }

  update(id, params): Observable<any> {
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

  delete(id: string): Observable<object> {
    return this.http.delete(`${environment.backendUrl}/${id}`)
      .pipe(finalize(() => {
        // auto logout if the logged in account was deleted
        if (id === this.accountValue.id) {
          this.logout();
        }
      }));
  }
}
