import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  BadgeComponent
} from '@coreui/angular';
import { ApiService } from '../../../core/services/api.service';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RequestedUserResponse, Product } from '../../../core/models/requested-user.model';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../shared/notification/notification.service';
import { RequestStatusModalComponent } from './request-status-modal.component';

@Component({
  selector: 'app-request',
  imports: [TextColorDirective,
    ButtonDirective,    
    BadgeComponent,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,    
    CardBodyComponent,
    CardComponent,        
    RowComponent,
    ColComponent
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})

export class RequestComponent {
  loading = true;
  products: Product[] = [];
  constructor(
      private apiService: ApiService,
      private authService: AuthService,
      private dialog: MatDialog,
      private notify: NotificationService,
      private router: Router        
  ) {
    // this.getProducts();
  }

  // dataSource = new MatTableDataSource<User>(USER_DATA);
  searchValue: string = '';
  searchValue1: string = '';
  displayedColumns: string[] = ['company_name','user_role', 'createdAt', 'accept', 'status', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  dataSourceBuyer = new MatTableDataSource<Product>([]);

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;

  ngOnInit(): void {
    const storedUser = localStorage.getItem(this.authService.USER_KEY);
    const user = JSON.parse(localStorage.getItem(this.authService.USER_KEY) || '{}');

    if(user) {
      let userType = user.details?.user_type;
      if(userType == "SUPER_ADMIN" || userType == "ADMIN") {
        this.getRequestedSeller("SELLER");
        this.getRequestedBuyer("BUYER");
      }else{
        this.getRequestedBuyer(userType);
      }
      
    }
  }

  getRequestedSeller(userType:any) {
    let requestData = {
      "user_type": userType
    };
    this.apiService.post<RequestedUserResponse>('backend/request-list', requestData)
      .subscribe({
        next: (res) => {
          console.log('Requested Seller Response:', res);
          // this.products = res.products;   
          this.loading = false;
          this.dataSource.data = res.products;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  getRequestedBuyer(userType:any) {
    let requestData = {
      "user_type": userType
    };
    this.apiService.post<RequestedUserResponse>('backend/request-list', requestData)
      .subscribe({
        next: (res) => {
          console.log('Requested Buyer Response:', res);
          // this.products = res.products;   
          this.loading = false;
          this.dataSourceBuyer.data = res.products;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }

  viewProduct(id: number): void {
    // Implement view product logic here
    console.log('View product with ID:', id);
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator1;
    this.dataSource.sort = this.sort1;
    this.dataSourceBuyer.paginator = this.paginator2;
    this.dataSourceBuyer.sort = this.sort2;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue1 = filterValue;
    this.dataSourceBuyer.filter = filterValue.trim().toLowerCase();
  }

  editProduct(id: number): void {
    // Implement edit product logic here
    console.log('Edit product with ID:', id);
  }

  deleteProduct(id: number): void {
    // Implement delete product logic here
    console.log('Delete product with ID:', id);
  } 

  clearFilter() {
    this.searchValue = '';
    this.dataSource.filter = '';
  }

  updateStatus(id: any): void {
      console.log('Update status for request with ID:', id);
      const dialogRef = this.dialog.open(RequestStatusModalComponent, {
        width: '600px',
        disableClose: true,
        data: { id: id }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Form Data:', result);
  
          this.apiService.post<any>('user/interest/update', result)
          .subscribe({
            next: (res) => {            
              console.log(res);
              this.notify.success('Request status updated successfully!');
              this.ngOnInit();
              // const currentUrl = this.router.url;
              // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              //   this.router.navigate([currentUrl]);
              // });
              // this.router.navigate(['/dashboard']);                                        
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
      });
    }
}
