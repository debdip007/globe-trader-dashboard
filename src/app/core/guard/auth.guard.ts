import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();
    if (!token) {
        return of(this.redirect())
    }else{
       return of(true); 
    }

    // return of(true);
    // return this.authService.validateToken(token).pipe(
    //   map(isValid => isValid ? true : this.redirect())
    // );
  }

  private redirect(): boolean {
    this.authService.removeToken();
    this.router.navigate(['/login']);
    return false;
  }
}