import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'   // makes it globally available
})
export class CommonService {
    private CATEGORY_URL = 'common/category';
    private SUB_CATEGORY_URL = 'common/sub-category/';
  
    constructor(private apiService: ApiService) {}

    getCategories(): Observable<any> {
        return this.apiService.get<any>(`${this.CATEGORY_URL}`);
    }

    getSubCategories(categoryId : any): Observable<any> {
        return this.apiService.get<any>(`${this.SUB_CATEGORY_URL}`+categoryId);
    }
}