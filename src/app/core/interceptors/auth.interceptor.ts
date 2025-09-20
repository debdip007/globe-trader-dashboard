import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from localStorage or any auth service
    const token = this.authService.getToken(); 
    console.log("Intercepted request, token:", token);
    
    if (token) {
      const headers: Record<string, string> = {
        'x-access-token': token,
        'device_type': 'Web'
      };

      const cloned = req.clone({ setHeaders: headers });
      // Clone the request and add the authorization header
      // const cloned = req.clone({
      //   headers: req.headers.set('x-access-token', `${token}`)
      // });
      return next.handle(cloned);
    }

    // If no token, continue without modifying
    return next.handle(req);
  }
}