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
import { ProductResponse, Product } from '../../../core/models/product-response.model';
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
  selector: 'app-products',
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
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  loading = true;
  products: Product[] = [];
  constructor(
      private apiService: ApiService        
  ) {
    this.getProducts();
  }

  // dataSource = new MatTableDataSource<User>(USER_DATA);
  searchValue: string = '';
  displayedColumns: string[] = ['image','name','sku', 'country', 'moq', 'capacity', 'status', 'actions'];
  dataSource = new MatTableDataSource<ProductResponse>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {}

  getProducts(): void {
    let requestData = {
      // Define any request parameters if needed
      "page" : 0,
      "page_size" : 10,
      "user_type" : "SELLER"
    };

    this.loading = true;
    this.apiService.post<any>('user/products', requestData)
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.products;
          // this.products = res.products;
          console.log('Products data loaded:', res);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
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
