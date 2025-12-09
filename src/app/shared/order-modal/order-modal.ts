import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

export interface OrderPayload {
  phone: string;
}

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-modal.html',
  styleUrls: ['./order-modal.css'],
})
export class OrderModalComponent {
  @Input() productName: string | undefined = '';
  @Input() productPrice: number | undefined = 0;
  @Input() productImage: string | undefined = '';
  @Input() productId: string | undefined = '';
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<OrderPayload>();

  phone: string = '';
  error: string = '';
  loading = false;

  validatePhone(): boolean {
    const regex = /^(7|6|3)\d{8}$/;
    if (!this.phone.match(regex)) {
      this.error = 'Numéro invalide. Exemple : 778801947';
      return false;
    }
    this.error = '';
    return true;
  }

  onConfirm() {
    if (!this.validatePhone()) return;

    this.loading = true;
    const payload: OrderPayload = {
      phone: this.phone,
    };
    this.confirm.emit(payload);
    this.loading = false;
  }

  onClose() {
    this.phone = '';
    this.error = '';
    this.close.emit();
  }
}
