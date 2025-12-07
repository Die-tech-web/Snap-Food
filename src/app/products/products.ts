import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.interface';
import { Category } from '../models/category.interface';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string | null = null;
  isDropdownOpen = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || null;
      this.filterProducts();
    });
  }

  private loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.filterProducts();
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private filterProducts(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        (product) => product.categoryId === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  orderOnWhatsApp(productName: string): void {
    const message = encodeURIComponent(`Bonjour, je veux commander ${productName}`);
    window.open(`https://wa.me/221778801947?text=${message}`, '_blank');
  }
}
