// src/types/types.ts

export interface Property {
    _id: string;
    address: string;
    price: number;
    description: string;
    images: string[]; // Array of image URLs
    contactInfo: string;
  }
  