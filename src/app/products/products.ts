import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { OrderService } from '../services/order.service';
import { Product } from '../models/product.interface';
import { Category } from '../models/category.interface';
import { OrderModalComponent, type OrderPayload } from '../shared/order-modal/order-modal';
import { WhatsAppService } from '../services/whatsapp.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, OrderModalComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // === Données ===
  products: Product[] = [];
  allFilteredProducts: Product[] = []; // Produits filtrés (avant pagination)
  paginatedProducts: Product[] = []; // Produits affichés sur la page actuelle
  categories: Category[] = [];

  // === État Pagination ===
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 0;

  // === Filtres ===
  selectedCategory: string | null = null;
  isDropdownOpen = false;

  // === Modale commande ===
  showOrderModal = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private whatsapp: WhatsAppService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || null;
      this.currentPage = 1; // Réinitialiser la page lors du changement de filtre
      this.filterAndPaginateProducts();
    });
  }

  private loadProducts(): void {
    this.productService.list().subscribe((products) => {
      // Initialiser des flags utiles pour l'affichage (orientation/loading)
      this.products = products.map((p) => ({
        ...p,
        imageOrientation: undefined,
        imageLoaded: false,
      }));
      this.filterAndPaginateProducts();
    });
  }

  private loadCategories(): void {
    this.categoryService.list().subscribe((categories) => {
      this.categories = categories;
    });
  }

  /**
   * Filtre les produits selon la catégorie sélectionnée et recalcule la pagination
   */
  private filterAndPaginateProducts(): void {
    // Appliquer le filtre de catégorie
    if (this.selectedCategory) {
      this.allFilteredProducts = this.products.filter(
        (product) => product.categoryId === this.selectedCategory
      );
    } else {
      this.allFilteredProducts = [...this.products];
    }

    // Recalculer le nombre total de pages
    this.totalPages = Math.ceil(this.allFilteredProducts.length / this.itemsPerPage);

    // S'assurer que la page actuelle est valide
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }

    // Paginer les produits
    this.updatePaginatedProducts();
  }

  /**
   * Met à jour les produits affichés en fonction de la page actuelle
   */
  private updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.allFilteredProducts.slice(startIndex, endIndex);
  }

  /**
   * Filtre par catégorie et réinitialise la pagination
   */
  filterByCategory(categoryId: string | null): void {
    this.selectedCategory = categoryId;
    this.currentPage = 1;
    this.filterAndPaginateProducts();
    this.isDropdownOpen = false;
  }

  /**
   * Affiche tous les produits (réinitialise le filtre)
   */
  showAllProducts(): void {
    this.filterByCategory(null);
  }

  /**
   * Navigue vers une page spécifique
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  /**
   * Navigue vers la page suivante
   */
  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  /**
   * Navigue vers la page précédente
   */
  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  /**
   * Génère un tableau de numéros de pages pour l'affichage
   */
  getPageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  openOrderModal(product: Product): void {
    this.selectedProduct = product;
    this.showOrderModal = true;
  }

  closeOrderModal(): void {
    this.showOrderModal = false;
    this.selectedProduct = null;
  }

  confirmOrder(payload: OrderPayload): void {
    if (!this.selectedProduct) return;

    const productImageUrl =
      this.selectedProduct.images && this.selectedProduct.images.length
        ? this.selectedProduct.images[0]
        : '';

    // 1. Sauvegarder la commande en base de données
    const order = {
      productId: this.selectedProduct.id,
      productName: this.selectedProduct.name,
      productPrice: this.selectedProduct.price,
      productImage: productImageUrl,
      clientPhone: payload.phone,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    this.orderService.create(order).subscribe({
      next: () => {
        // 2. Rediriger vers WhatsApp avec le lien
        const url = this.whatsapp.getWhatsAppUrl(
          {
            name: this.selectedProduct!.name,
            price: this.selectedProduct!.price,
            imageUrl: productImageUrl,
          },
          payload.phone
        );
        window.open(url, '_blank');
        this.closeOrderModal();
      },
      error: (err) => {
        console.error('Erreur lors de la création de la commande', err);
        alert('Erreur lors de la sauvegarde de votre commande. Veuillez réessayer.');
      },
    });
  }

  // Détecte l'orientation de l'image après chargement pour adapter la hauteur du wrapper
  onImageLoad(event: Event, product: any): void {
    const img = event.target as HTMLImageElement;
    if (!img || !img.naturalWidth || !img.naturalHeight) {
      product.imageOrientation = 'landscape';
      product.imageLoaded = true;
      return;
    }
    if (img.naturalHeight > img.naturalWidth) {
      product.imageOrientation = 'portrait';
    } else if (img.naturalHeight < img.naturalWidth) {
      product.imageOrientation = 'landscape';
    } else {
      product.imageOrientation = 'square';
    }
    // Indiquer que l'image est chargée pour retirer le skeleton
    product.imageLoaded = true;
  }
}
