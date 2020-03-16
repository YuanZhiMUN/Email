import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signIn: Boolean = false;
  constructor(private authService: AuthService){

  }
  title = 'email';

  ngOnInit(){
    this.authService.signIn$.subscribe(res => this.signIn = res);
    this.authService.authCheck().subscribe(() => {});
  }
}
