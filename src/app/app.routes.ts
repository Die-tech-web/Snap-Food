import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  {
    path: 'produits',
    loadComponent: () => import('./products/products').then(m => m.Products)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then(m => m.Contact)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
