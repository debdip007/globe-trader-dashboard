import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'category',
    loadComponent: () => import('./category-list/category-list.component').then(m => m.CategoryListComponent),
    data: {
      title: `Category List`
    }
  },
  {
    path: 'category-details',
    loadComponent: () => import('./category-details/category-details.component').then(m => m.CategoryDetailsComponent),
    data: {
      title: `Category Details`
    }
  },
  {
    path: 'role',
    loadComponent: () => import('./user-role/user-role.component').then(m => m.UserRoleComponent),
    data: {
      title: `Role List`
    }
  },
  {
    path: 'product-details/:id',
    loadComponent: () => import('./user-role-details/user-role-details.component').then(m => m.UserRoleDetailsComponent),
    data: {
      title: `Role Details`
    }
  }
];