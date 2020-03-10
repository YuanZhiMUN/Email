import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  uniqueUserName(value: string){
    return this.http.post<{available: boolean}>("https://api.angular-email.com/auth/username", {
      username: value
    })
  }
}
