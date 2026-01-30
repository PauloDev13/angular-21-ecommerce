import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products/todas',
  },
  {
    path: 'products/:category', loadComponent: () => import('./pages/products-grid/products-grid'),
  },
  {
    path: 'favorites', loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
  }
];
