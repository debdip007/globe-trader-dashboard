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
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../shared/notification/notification.service';
import { FormModalComponent } from '../category-details/category-form-modal.component';

@Component({
  selector: 'app-user-role',
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
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss'
})
export class UserRoleComponent {
  searchValue: string = '';
  loading = true;
  userType: string = '';
  dataSource = new MatTableDataSource<UserRole>([]);
  displayedColumns: string[] = ['name', 'description', 'createdAt', 'actions'];
  
  constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private commonService: CommonService,
        private router: Router,
        private dataService: DataTransferService,
        private dialog: MatDialog,
        private notify: NotificationService       
    ) {      
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.loading = true;
    this.apiService.get<any>('backend/role-list')
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.details;
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
    this.router.navigate(['/settings/role-details']);
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

  openForm(): void {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form Data:', result);

        this.apiService.post<any>('backend/modify-category', result)
        .subscribe({
          next: (res) => {            
            console.log(res);
            this.notify.success('Category Created successfully!');
            
            const currentUrl = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([currentUrl]);
            });
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
