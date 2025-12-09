export interface Order {
  id?: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string; // URL de l'image du produit
  clientPhone: string;
  clientImage?: string; // Base64 de la photo de commande du client
  clientImageName?: string; // Nom original du fichier
  notes?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string; // ISO timestamp
}
