import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

export interface User {
  id: number;
  name: string;
  email: string;
}

const USER_DATA: User[] = [
  { id: 1, name: 'Debdip', email: 'debdip@example.com' },
  { id: 2, name: 'Rahul', email: 'rahul@example.com' },
  { id: 3, name: 'Sneha', email: 'sneha@example.com' }
];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule // 👈 add this
  ],
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<User>(USER_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
