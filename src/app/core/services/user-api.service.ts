import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RequestedUserResponse } from '../models/requested-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
    private requestedBuyer = `${environment.apiBaseUrl}/api/user/request/product/list`;
    
    constructor(private http: HttpClient) {
    }

    getRequestedUsers(): void {
        this.http.post<RequestedUserResponse>(this.requestedBuyer, { user_type : "" })
        .subscribe(user => {
            console.log("Requested Users:", user);
        });
    }
}