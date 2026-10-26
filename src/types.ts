export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  condition: 'New' | 'Used';
  status: 'Available' | 'Sold';
  fuel: string;
  transmission: string;
  engine: string;
  color: string;
  driveType: string;
  bodyType: 'sedan' | 'suv' | 'electric' | 'hybrid' | 'van' | 'truck' | 'compact';
  features: string[];
  image: string;
  description: string;
}

export type Language = 'en' | 'uz' | 'ru';

export interface FilterState {
  brand: string;
  bodyType: string;
  budgetMin: number;
  budgetMax: number;
  condition: string;
  status: string;
  search: string;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';
}
