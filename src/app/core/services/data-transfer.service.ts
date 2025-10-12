import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataTransferService {
  private data: any;

  setData(data: any) {
    this.data = data;
    localStorage.setItem('detailsData', JSON.stringify(data)); // optional persistence
  }

  getData() {
    // fallback to localStorage if memory lost
    if (!this.data) {
      const stored = localStorage.getItem('detailsData');
      this.data = stored ? JSON.parse(stored) : null;
    }
    return this.data;
  }

  clearData() {
    this.data = null;
    localStorage.removeItem('detailsData');
  }
}