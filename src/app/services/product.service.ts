import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    // Fruits secs & Noix
    {
      id: '1',
      name: 'Noix de Cajou Grillées',
      description: 'Noix de cajou fraîchement grillées, riches en protéines.',
      price: 15000,
      categoryId: 'fruits-secs-noix',
      images: ['assets/images/Fruits secs-Noix/_ (15).jpeg'],
      available: true,
      featured: true
    },
    {
      id: '2',
      name: 'Amandes Naturelles',
      description: 'Amandes bio, parfaites pour les snacks sains.',
      price: 12000,
      categoryId: 'fruits-secs-noix',
      images: ['assets/images/Fruits secs-Noix/Dreams are like dry fruits_who else want them in sweets....But can\'t deny, manching dry'],
      available: true,
      featured: false
    },
    // Fruits & Légumes frais
    {
      id: '3',
      name: 'Mangue Fraîche',
      description: 'Mangues juteuses du Sénégal, pleines de vitamines.',
      price: 5000,
      categoryId: 'fruits-legumes',
      images: ['assets/images/fruits-legumes/_ (1).jpeg'],
      available: true,
      featured: true
    },
    {
      id: '4',
      name: 'Tomates Bio',
      description: 'Tomates rouges et fermes, cultivées localement.',
      price: 3000,
      categoryId: 'fruits-legumes',
      images: ['assets/images/fruits-legumes/_ (2).jpeg'],
      available: true,
      featured: false
    },
    // Snacks & Apéritifs
    {
      id: '5',
      name: 'Thiéré Fait Maison',
      description: 'Plat traditionnel sénégalais, savoureux et authentique.',
      price: 8000,
      categoryId: 'snacks',
      images: ['assets/images/Snacks/Thiéré fait maison.jpeg'],
      available: true,
      featured: true
    },
    // Ajouter plus selon les catégories...
  ];

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.featured));
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return of(this.products.filter(p => p.categoryId === categoryId));
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }
}