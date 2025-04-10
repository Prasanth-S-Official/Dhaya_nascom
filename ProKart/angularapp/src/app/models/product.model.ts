export interface Product {
    productId?: number;          // Optional, generated by the backend
    productName: string;         // Name of the product
    description: string;         // Description of the product
    price: number;               // Price of the product
    stockQuantity: number;       // Available stock quantity
    category: string;            // Category the product belongs to
    brand: string;               // Brand of the product
    coverImage: string;          // Base64-encoded image string
  }
  