import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DashboardCount, Details } from '../models/dashboard-count.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  private dataSubject = new BehaviorSubject<any>(null);
  public sharedData$ = this.dataSubject.asObservable();

  dashboardCount?: DashboardCount;
  dashboardDetails?: Details;

  private dataLoaded = false; // cache flag

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {}

  getDashboardCount(userType:any, date:any) {
      console.log("getDashboardCount call");
      if (!this.dataLoaded) {
        let requestData = {
            "user_type" : userType,
            "date" : date
        };
        
        this.apiService.post<DashboardCount>('backend/dashboard-details', requestData)
            .subscribe({
            next: (res) => {  
                this.dataSubject.next(res);
                this.dataLoaded = true;        
                // this.dashboardCount = res;
                // this.dashboardDetails = res.details; 
                // this.total_request = res.details.total_request;
            },
            error: (err) => {
                console.error(err);
            },
            });
      }
      
      return this.sharedData$;
    }

//   loadData(): Observable<any> {
//     if (!this.dataLoaded) {
//       return this.http.get('YOUR_API_URL').pipe(
//         tap((response: any) => {
//           this.dataSubject.next(response);
//           this.dataLoaded = true;
//         })
//       );
//     }

//     // If data already loaded, return existing observable
//     return this.sharedData$;
//   }
}