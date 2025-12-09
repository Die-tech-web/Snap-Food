import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../core/auth.service';
import { Product } from '../../models/product.interface';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  search = '';
  page = 1;
  pageSize = 10;

  showProductModal = false;
  showCategoryModal = false;
  successMessage = '';
  errorMessage = '';

  productForm!: FormGroup;
  categoryForm!: FormGroup;

  // expose Math to template
  readonly Math = Math;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.initForms();
  }

  private initForms(): void {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      images: [''],
      available: [true]
    });

    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      icon: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.categoryService.list().subscribe(
      (cats) => (this.categories = cats),
      (err) => { this.showError('Erreur chargement catégories'); console.error(err); }
    );
    this.productService.list().subscribe(
      (prods) => (this.products = prods),
      (err) => { this.showError('Erreur chargement produits'); console.error(err); }
    );
  }

  // === Statistiques ===
  get totalProducts(): number {
    return this.products.length;
  }

  get totalCategories(): number {
    return this.categories.length;
  }

  get totalRevenue(): number {
    return this.products.reduce((sum, p) => sum + (p.price || 0), 0);
  }

  get availableProducts(): number {
    return this.products.filter((p) => p.available).length;
  }

  // === Product Management ===
  filtered(): Product[] {
    const q = this.search?.toLowerCase() || '';
    return this.products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  paginated(): Product[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filtered().length / this.pageSize) || 1;
  }

  openProductModal(product?: Product): void {
    if (product) {
      this.productForm.patchValue({
        id: product.id ?? null,
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price ?? 0,
        categoryId: product.categoryId ?? '',
        images: (product.images || []).join(','),
        available: product.available ?? true
      });
    } else {
      this.productForm.reset({ available: true });
    }
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
    this.productForm.reset();
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.showError('Formulaire invalide');
      return;
    }

    const val = this.productForm.value;
    const payload: Partial<Product> = {
      name: String(val.name || ''),
      description: String(val.description || ''),
      price: Number(val.price || 0),
      categoryId: String(val.categoryId || ''),
      images: val.images ? String(val.images).split(',').map((s: string) => s.trim()) : [],
      available: !!val.available
    };

    if (val.id) {
      this.productService.update(val.id, payload).subscribe(
        () => {
          this.showSuccess('Produit modifié');
          this.closeProductModal();
          this.loadAll();
        },
        (err) => { this.showError('Erreur modification produit'); console.error(err); }
      );
    } else {
      this.productService.create(payload).subscribe(
        () => {
          this.showSuccess('Produit créé');
          this.closeProductModal();
          this.loadAll();
        },
        (err) => { this.showError('Erreur création produit'); console.error(err); }
      );
    }
  }

  duplicateProduct(p: Product): void {
    const copy: Partial<Product> = { ...p, id: undefined, name: `${p.name} (copie)` };
    this.productService.create(copy).subscribe(
      () => {
        this.showSuccess('Produit dupliqué');
        this.loadAll();
      },
      (err) => { this.showError('Erreur duplication'); console.error(err); }
    );
  }

  deleteProduct(p: Product): void {
    if (!confirm(`Supprimer "${p.name}" ?`)) return;
    this.productService.delete(p.id).subscribe(
      () => {
        this.showSuccess('Produit supprimé');
        this.loadAll();
      },
      (err) => { this.showError('Erreur suppression'); console.error(err); }
    );
  }

  // === Category Management ===
  openCategoryModal(cat?: Category): void {
    if (cat) {
      this.categoryForm.patchValue(cat);
    } else {
      this.categoryForm.reset();
    }
    this.showCategoryModal = true;
  }

  closeCategoryModal(): void {
    this.showCategoryModal = false;
    this.categoryForm.reset();
  }

  saveCategory(): void {
    if (this.categoryForm.invalid) {
      this.showError('Formulaire catégorie invalide');
      return;
    }

    const val = this.categoryForm.value;
    const payload: Partial<Category> = {
      name: String(val.name || ''),
      icon: String(val.icon || ''),
      description: String(val.description || '')
    };

    if (val.id) {
      this.categoryService.update(val.id, payload).subscribe(
        () => {
          this.showSuccess('Catégorie modifiée');
          this.closeCategoryModal();
          this.loadAll();
        },
        (err) => { this.showError('Erreur modification catégorie'); console.error(err); }
      );
    } else {
      this.categoryService.create(payload).subscribe(
        () => {
          this.showSuccess('Catégorie créée');
          this.closeCategoryModal();
          this.loadAll();
        },
        (err) => { this.showError('Erreur création catégorie'); console.error(err); }
      );
    }
  }

  deleteCategory(cat: Category): void {
    if (!confirm(`Supprimer la catégorie "${cat.name}" ?`)) return;
    this.categoryService.delete(cat.id).subscribe(
      () => {
        this.showSuccess('Catégorie supprimée');
        this.loadAll();
      },
      (err) => { this.showError('Erreur suppression catégorie'); console.error(err); }
    );
  }

  // === Notifications ===
  showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  showError(msg: string): void {
    this.errorMessage = msg;
    setTimeout(() => (this.errorMessage = ''), 3000);
  }

  // === Auth ===
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
