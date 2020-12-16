import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, mapTo, tap, catchError} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {Account} from '@app/models';
import {Tokens} from '@app/models';
import {ErrorService} from '@app/services/error.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;
  private loggedUser: string;
  private JWT_TOKEN = 'JWT_TOKEN';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.backendUrl}/signin`, {email, password})
      .pipe(
        tap(tokens => this.doLoginUser(email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  public logout(): void {
    localStorage.clear();
    this.JWT_TOKEN = null;
    this.loggedUser = null;
    this.router.navigate(['/account/login']);
  }

  private doLoginUser(username: string, tokens: any): void {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens): void {
    console.log(tokens);
    localStorage.setItem(this.JWT_TOKEN, tokens.idToken);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
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

  getUsers(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.backendUrl}/users`)
      .pipe(catchError(this.errorService.handleError<Account[]>('getUsers()', [])));
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

  /** DELETE: delete the account from the server */
  deleteAccount(account: Account): Observable<Account> {
    const id = typeof account === 'number' ? account : account.id;

    return this.http.delete<Account>(`${environment.backendUrl}/users/${id}`, this.httpOptions).pipe(
      catchError(this.errorService.handleError<Account>('deleteAccount'))
    );
  }
}
