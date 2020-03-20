import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Credientials {
  username: String,
  password: String,
  passwordConfirmation: String
}

interface AuthResponse {
  username: String,
  authenticated: boolean
}

interface ResultResponse {
  username: String
}

interface CredientialsDetails {
  username: String,
  password: String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signIn$ = new BehaviorSubject(null);
  rootUrl='https://api.angular-email.com';
  constructor(private http: HttpClient) {

  }

  uniqueUserName(value: string){
    return this.http.post<{available: boolean}>(`${this.rootUrl}/auth/username`, {
      username: value
    });
  }

  signup(credientials: Credientials){
    return this.http.post<ResultResponse>(`${this.rootUrl}/auth/signup`, credientials)
            .pipe(
              tap(() => {
                this.signIn$.next(true);
              })
            );
  }

  authCheck(){
    return this.http.get<AuthResponse>(`${this.rootUrl}/auth/signedin`)
            .pipe(
              tap(({ authenticated })  => {this.signIn$.next(authenticated);})
            )
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signIn$.next(false)
        })
      )
  }

  signIn(credientialsDetails: CredientialsDetails) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credientialsDetails)
      .pipe(
        tap(() => {
          this.signIn$.next(true)
        })
      )
  }
}
