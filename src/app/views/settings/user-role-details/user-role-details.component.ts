import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../core/services/common.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/notification/notification.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

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
import { UserRole } from '../../../core/models/user-role.model';
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
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-role-details',
  templateUrl: './user-role-details.component.html',
  styleUrl: './user-role-details.component.scss',
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
})
export class UserRoleDetailsComponent {
  role: any;
  loading = true;  
  searchValue: string = '';
  customStylesValidated = false;
  dataSource = new MatTableDataSource<CategoryResponse>([]);
  displayedColumns: string[] = ['name', 'status', 'actions'];
  roleForm: FormGroup;
  canUpdateRole: boolean = false;
  option: any;
  options: any[] = [];

  constructor(
    private router: Router, 
    private dataService: DataTransferService, 
    private apiService: ApiService,
    private fb: FormBuilder,
    public authService: AuthService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {    
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      permissions: this.fb.array([])
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.role = this.dataService.getData();
    
    this.roleForm.patchValue({
      name: this.role?.name,
      description: this.role?.description
    });

    this.getPermissionList();

    this.canUpdateRole = this.authService.hasPermission('edit_role');
  }

  get selections(): FormArray {
    return this.roleForm.get('permissions') as FormArray;
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked) {
      this.selections.push(this.fb.control(value));
    } else {
      const index = this.selections.controls.findIndex(x => x.value === value);
      this.selections.removeAt(index);
    }
  }

  ngOnDestroy(): void {
    this.dataService.clearData();
  }

  categorySubmit(): void {
    if (this.roleForm.valid) {
      const categoryData = this.roleForm.value;
      categoryData.category_id = this.role?.id;
      console.log(categoryData);
      
      this.apiService.post<any>('backend/modify-category', categoryData)
        .subscribe({
          next: (res) => {   
            this.notify.success('Category updated successfully!')         
            console.log(res);
            // this.router.navigate(['/dashboard']);                                        
          },
          error: (err) => {
            this.notify.error('Something went wrong. Please try after some time.');
            console.error(err);
          },
        });
    }
    
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

  async getPermissionList() {
    let selectedId: number[] = [];
    const options = await firstValueFrom(this.apiService.get<UserRole>('backend/permission-list'));    
    const options$ = of(options?.details).pipe(delay(500));

    console.log(this.role?.Permissions);
    this.role?.Permissions.forEach((option : any) => {
      selectedId.push(option.id);
    });
    // Example: API returns selected IDs (e.g., [2, 4])
    const selectedIds$ = of(selectedId).pipe(delay(600));

    // Combine simulated responses
    options$.subscribe(options => {
      this.options = options;

      selectedIds$.subscribe(selectedIds => {
        this.setPreselectedOptions(selectedIds);
        console.log(selectedIds);
      });
    });
  }

  setPreselectedOptions(selectedIds: number[]) {
    const formArray = this.roleForm.get('permissions') as FormArray;
    formArray.clear();

    selectedIds.forEach(id => {
      formArray.push(this.fb.control(id));
    });
  }

  // openForm(): void {
  //   const dialogRef = this.dialog.open(FormSubModalComponent, {
  //     width: '600px',
  //     disableClose: true
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       result.parent_id = this.category?.id;
        
  //       this.apiService.post<any>('backend/modify-category', result)
  //       .subscribe({
  //         next: (res) => {            
  //           console.log(res);
  //           this.notify.success('Sub-category Created successfully!');
  //           const currentUrl = this.router.url;
  //           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //             this.router.navigate([currentUrl]);
  //           });
  //           // this.router.navigate(['/dashboard']);                                        
  //         },
  //         error: (err) => {
  //           this.notify.error('Something went wrong. Please try after some time.');
  //           console.error(err);
  //         },
  //       });
  //     }
  //   });
  // }
}
