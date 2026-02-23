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
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/view-cart/view-cart')
      .then(m => m.ViewCart),
  },
  {
    path: 'checkout', loadComponent: () => import('./pages/checkout/checkout')
  },
  {
    path: 'order-success', loadComponent: () => import('./pages/order-success/order-success'),
  }
];
