import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  // Numéro admin en format international sans '+' (ex: 221778801947)
  adminNumber = '221778801947';

  /**
   * Construit le texte de la commande. Si une image est fournie, on ajoute son URL.
   */
  buildOrderMessage(
    product: { name: string; price: number; imageUrl?: string },
    phone: string
  ): string {
    let msg = `Bonjour,\nJe souhaite commander : *${product.name}*\nPrix : ${product.price} FCFA\nNuméro du client : ${phone}\n`;
    if (product.imageUrl) {
      msg += `Photo du produit : ${product.imageUrl}\n`;
    }
    msg += `Merci de me confirmer la disponibilité.`;
    return msg;
  }

  getWhatsAppUrl(
    product: { name: string; price: number; imageUrl?: string },
    phone: string
  ): string {
    const message = encodeURIComponent(this.buildOrderMessage(product, phone));
    return `https://wa.me/${this.adminNumber}?text=${message}`;
  }
}
