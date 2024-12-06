export interface Material {
    materialId?: number;
    materialName: string;
    description: string;
    category: string;
    pricePerUnit: number;
    unitType: string;
    availabilityStatus: string; // "In Stock" or "Out of Stock"
  }
  