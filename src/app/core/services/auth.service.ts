import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, timer } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../models/user-response.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public TOKEN_KEY = 'access_token';
    public USER_KEY  = 'auth_user';

    private validateUrl = `${environment.apiBaseUrl}/validate-token`;
    private refreshUrl = `${environment.apiBaseUrl}/api/auth/get-token`;

    private userSubject = new BehaviorSubject<UserResponse | null>(null);
    user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadUserFromStorage();
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string) {
        console.log("Setting token:", token);
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    validateToken(token: string): Observable<boolean> {
        if (!token) return of(false);
        return this.http.post<{ valid: boolean }>(this.validateUrl, { token }).pipe(
        switchMap(res => of(res.valid)),
        catchError(() => of(false))
        );
    }

    refreshToken(): Observable<string | null> {
        const token = this.getToken();
        if (!token) return of(null);
            
        return this.http.post<UserResponse>(this.refreshUrl, { email : "s.seller@gmail.com" }).pipe(
        tap(res => this.setToken(res.details.accessToken)),
        switchMap(res => of(res.details.accessToken)),
        catchError(() => {
            this.removeToken();
            return of(null);
        })
        );
    }

    startTokenAutoRefresh(intervalMs: number = 5 * 60 * 1000) {
        return timer(0, intervalMs).pipe(
        switchMap(() => this.refreshToken())
        );
    }

    private loadUserFromStorage(): void {
        const storedUser = localStorage.getItem(this.USER_KEY);
        if (storedUser) {
            this.userSubject.next(JSON.parse(storedUser));
        } else if (this.getToken()) {
            // ✅ Token exists but user not in localStorage → fetch from API
            this.fetchLoggedInUser();
        }
    }

    fetchLoggedInUser() {
        this.http.post<UserResponse>(this.refreshUrl, { email : "s.seller@gmail.com" })
        .subscribe(user => {
            this.userSubject.next(user);
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        });
    }

    clearUser() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.userSubject.next(null);
    }
}
