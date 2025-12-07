import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: 'fruits-secs-noix',
      name: 'Fruits secs & Noix',
      icon: '🥜',
      description: 'Noix et fruits secs de qualité supérieure',
    },
    {
      id: 'graines-cereales',
      name: 'Graines & Céréales',
      icon: '🌾',
      description: 'Graines et céréales biologiques',
    },
    {
      id: 'snacks',
      name: 'Snacks & Apéritifs',
      icon: '🍪',
      description: 'Snacks savoureux pour toutes occasions',
    },
    {
      id: 'fruits-legumes',
      name: 'Fruits & Légumes frais',
      icon: '🥗',
      description: 'Produits frais directement des champs',
    },
    {
      id: 'viandes-poissons',
      name: 'Viandes & Poissons',
      icon: '🥖',
      description: 'Viandes et poissons frais',
    },
    {
      id: 'epicerie',
      name: 'Épicerie',
      icon: '🍚',
      description: 'Riz, huile, épices et produits essentiels',
    },
    {
      id: 'produits-laitiers',
      name: 'Produits laitiers',
      icon: '🥛',
      description: 'Lait, fromage et produits laitiers frais',
    },
    {
      id: 'patisseries',
      name: 'Pâtisseries & Desserts',
      icon: '🍰',
      description: 'Douceurs et pâtisseries artisanales',
    },
    {
      id: 'terroir-senegalais',
      name: 'Produits du terroir sénégalais',
      icon: '🇸🇳',
      description: 'Spécialités authentiques du Sénégal',
    },
  ];

  constructor() {}

  getAllCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return of(this.categories.find((c) => c.id === id));
  }
}
