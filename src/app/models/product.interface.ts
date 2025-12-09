export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  available: boolean;
  featured?: boolean;
  // UI helpers (optionnels) utilisés par le composant Products
  imageOrientation?: 'portrait' | 'landscape' | 'square';
  imageLoaded?: boolean;
}
