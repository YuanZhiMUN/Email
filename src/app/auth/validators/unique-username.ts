import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{
    constructor(private authService: AuthService){}

    validate = (control: FormControl) => {
        const {value} = control;
    
        return this.authService.uniqueUserName(value)
        .pipe(
            map(() => {
                return null;
            }),
            catchError((err) => {
                if(err.error.username){
                    return of({ nonUniqueUsername: true});
                } else {
                    return of({ nonConnection: true})
                }
            })
        )
    };

}
