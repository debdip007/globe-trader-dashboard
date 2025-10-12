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
import { CategoryResponse, CategoryElement } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { DataTransferService } from '../../../core/services/data-transfer.service';

@Component({
  selector: 'app-category-list',
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
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  searchValue: string = '';
  loading = true;
  userType: string = '';
  dataSource = new MatTableDataSource<CategoryResponse>([]);
  displayedColumns: string[] = ['name', 'status', 'actions'];
  
  constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private commonService: CommonService,
        private router: Router,
        private dataService: DataTransferService       
    ) {      
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.loading = true;
    this.apiService.get<any>('common/category')
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.category;
          // this.products = res.products;
          console.log('Category data loaded:', res);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }

  viewCategory(obj: any): void {
    // Implement view product logic here
    this.dataService.setData(obj);
    this.router.navigate(['/settings/category-details']);
    // console.log('View product with ID:', id);
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
