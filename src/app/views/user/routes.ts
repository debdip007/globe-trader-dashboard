import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile/:id',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    data: {
      title: `User Profile`
    }
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    data: {
      title: `User Profile`
    }
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    data: {
      title: `Product List`
    }
  },
  {
    path: 'product-details/:id',
    loadComponent: () => import('./product-details/product-details.component').then(m => m.ProductDetailsComponent),
    data: {
      title: `Product Details`
    }
  },
  {
    path: 'user-list/:type',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    data: {
      title: `User List`
    }
  }
];

