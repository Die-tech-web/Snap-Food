import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.interface';
import { Category } from '../models/category.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  featuredProducts: Product[] = [];
  categories: Category[] = [];
  isDropdownOpen = false;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if (this.video && this.video.nativeElement) {
      const videoElement = this.video.nativeElement;
      videoElement.muted = true;
      videoElement.play().catch((err) => console.log('Video play failed:', err));
    }
  }

  private loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts().subscribe((products) => {
      this.featuredProducts = products;
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  orderOnWhatsApp(productName: string): void {
    const message = encodeURIComponent(`Bonjour, je veux commander ${productName}`);
    window.open(`https://wa.me/221778801947?text=${message}`, '_blank');
  }
}
