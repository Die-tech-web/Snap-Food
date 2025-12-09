import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.interface';

const API_ROOT = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private endpoint = `${API_ROOT}/categories`;

  constructor(private http: HttpClient) {}

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.endpoint).pipe(
      catchError((err) => {
        console.error('Category list error', err);
        return throwError(() => err);
      })
    );
  }

  /** Backwards compatibility alias used by some components */
  getAllCategories(): Observable<Category[]> {
    return this.list();
  }

  get(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        console.error('Get category error', err);
        return throwError(() => err);
      })
    );
  }

  create(cat: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.endpoint, cat).pipe(
      catchError((err) => {
        console.error('Create category error', err);
        return throwError(() => err);
      })
    );
  }

  update(id: string, cat: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.endpoint}/${id}`, cat).pipe(
      catchError((err) => {
        console.error('Update category error', err);
        return throwError(() => err);
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        console.error('Delete category error', err);
        return throwError(() => err);
      })
    );
  }
}
