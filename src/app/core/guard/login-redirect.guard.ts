import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();
    console.log("LoginRedirectGuard token:", token);

    if (!token) {
        this.authService.removeToken();
        return of(true);
    }else {
        this.router.navigate(['/dashboard']);
        return of(false); // block login page
    }

    // return this.authService.validateToken(token).pipe(
    //   map(isValid => {
    //     if (isValid) {
    //       this.router.navigate(['/dashboard']);
    //       return false; // block login page
    //     }
    //     this.authService.removeToken();
    //     return true; // allow login page
    //   })
    // );
  }
}