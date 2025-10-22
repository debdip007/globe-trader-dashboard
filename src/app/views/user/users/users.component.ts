import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../../../core/services/common.service';

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
import { UserResponse, Details } from '../../../core/models/user-response.model';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
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
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private commonService: CommonService       
    ) {      
  }

  searchValue: string = '';
  loading = true;
  userType: string = '';
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'country_code', 'phone', 'status', 'actions'];
  dataSource = new MatTableDataSource<UserResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    // this.userType = this.route.snapshot.paramMap.get('type')!;  
    // this.getUsers(this.userType.toUpperCase());

    this.route.paramMap.subscribe(params => {
      this.userType = params.get('type')!;
      if (this.userType) {
        this.getUsers(this.userType.toUpperCase());
      }
    });
  }

  getUsers(userType : string): void {
    let type = this.userType;
    console.log(userType);
    // return false;

    let requestData = {      
      "user_type" : userType
    };

    this.loading = true;
    this.apiService.post<any>('backend/user-list', requestData)
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.details;
          // this.products = res.products;
          console.log('User data loaded:', res);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.dataSource.data = [];
          console.error(err);
        },
      });
  }

  viewProduct(id: number): void {
    // Implement view product logic here
    console.log('View product with ID:', id);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
}
