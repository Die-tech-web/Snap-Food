import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.interface';

const API_ROOT = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private endpoint = `${API_ROOT}/orders`;

  constructor(private http: HttpClient) {}

  list(): Observable<Order[]> {
    return this.http.get<Order[]>(this.endpoint).pipe(
      catchError((err) => {
        console.error('Order list error', err);
        return throwError(() => err);
      })
    );
  }

  get(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        console.error('Get order error', err);
        return throwError(() => err);
      })
    );
  }

  create(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.endpoint, order).pipe(
      catchError((err) => {
        console.error('Create order error', err);
        return throwError(() => err);
      })
    );
  }

  update(id: string, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.endpoint}/${id}`, order).pipe(
      catchError((err) => {
        console.error('Update order error', err);
        return throwError(() => err);
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      catchError((err) => {
        console.error('Delete order error', err);
        return throwError(() => err);
      })
    );
  }
}
