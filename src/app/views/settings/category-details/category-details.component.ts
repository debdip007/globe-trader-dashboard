import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../core/services/common.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  BadgeComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-category-details',
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
      CardBodyComponent,
      CardComponent,        
      RowComponent,
      ColComponent,
      MatSlideToggleModule,
      ReactiveFormsModule,
      FormsModule,    
      FormDirective,
      GutterDirective,
      ColComponent,
      FormLabelDirective,
      FormControlDirective,
      FormFeedbackComponent,
      FormSelectDirective,
      ButtonDirective,
      RouterLink
    ],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent {
  category: any;
  loading = true;  
  searchValue: string = '';
  customStylesValidated = false;
  dataSource = new MatTableDataSource<CategoryResponse>([]);
  displayedColumns: string[] = ['name', 'status', 'actions'];
  categoryForm: FormGroup;
  canUpdateCategory: boolean = false;

  constructor(
    private router: Router, 
    private dataService: DataTransferService, 
    private apiService: ApiService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {    
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.category = this.dataService.getData();
    this.getSubCategory(this.category?.id);

    this.categoryForm.patchValue({
      name: this.category?.name,
      status: this.category?.status
    });

    this.canUpdateCategory = this.authService.hasPermission('view_category');
  }

  ngOnDestroy(): void {
    this.dataService.clearData();
  }

  getSubCategory(id: any): void {
    this.loading = true;
    if(id) {
      this.apiService.get<any>('common/sub-category/'+id)
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.category;
          console.log('Sub Category data loaded:', res);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
    }    
  }

  categorySubmit(): void {
    console.log("form submited");
  } 

  viewCategory(obj: any): void {
    // Implement view product logic here
    // this.dataService.setData(obj);
    // this.router.navigate(['/settings/category-details']);
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
