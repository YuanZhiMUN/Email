import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { skipWhile, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router){

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.signIn$
      .pipe(
        skipWhile(value => value === null),
        take(1),
        tap( authenticate => {
          if(!authenticate){
            this.router.navigateByUrl('/');
          }
        })
      )
  }
}
