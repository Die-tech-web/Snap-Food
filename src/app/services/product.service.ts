import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.interface';

const API_ROOT = 'http://localhost:3000'; // JSON Server default. Change if needed.

@Injectable({ providedIn: 'root' })
export class ProductService {
  private endpoint = `${API_ROOT}/products`;

  constructor(private http: HttpClient) {}

  list(params?: { _page?: number; _limit?: number; q?: string }): Observable<Product[]> {
    let httpParams = new HttpParams();
    if (params) {
      if (params._page) httpParams = httpParams.set('_page', String(params._page));
      if (params._limit) httpParams = httpParams.set('_limit', String(params._limit));
      if (params.q) httpParams = httpParams.set('q', params.q);
    }
    return this.http.get<Product[]>(this.endpoint, { params: httpParams }).pipe(
      catchError((err) => {
        console.error('Product list error', err);
        return throwError(() => err);
      })
    );
  }

  /** Backwards compatibility helper used by some existing components */
  getFeaturedProducts(): Observable<Product[]> {
    return this.list().pipe(map((products) => products.filter((p) => !!p.featured)));
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        console.error('Get product error', err);
        return throwError(() => err);
      })
    );
  }

  create(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(this.endpoint, product).pipe(
      catchError((err) => {
        console.error('Create product error', err);
        return throwError(() => err);
      })
    );
  }

  update(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.endpoint}/${id}`, product).pipe(
      catchError((err) => {
        console.error('Update product error', err);
        return throwError(() => err);
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        console.error('Delete product error', err);
        return throwError(() => err);
      })
    );
  }
}
