import { Types } from "mongoose";

// Main Product Interface
export interface IProduct {
    _id: Types.ObjectId;                // MongoDB ObjectId
    name: string;                       // Product name
    description: string;                // Detailed product description
    category: Types.ObjectId;           // Reference to Category schema
    price: number;                      // Product price
    stock: number;                      // Number of items in stock
    images: IProductImage[];            // Array of product images
    attributes: IProductAttribute[];    // Additional product attributes
    ratings: Types.ObjectId[];          // Customer ratings
    averageRating: number;              // Average rating for the product
    createdAt: Date;                    // Timestamp for product creation
    updatedAt: Date;                    // Timestamp for last update
    isActive: boolean;                  // Flag to indicate if the product is active
    isFeatured: boolean;                // Flag to indicate if the product is featured
    isOnSale: boolean;                  // Flag to indicate if the product is on sale
    salePrice?: number;                 // Sale price (if applicable)
    saleStartDate?: Date;               // Sale start date (if applicable)
    saleEndDate?: Date;                 // Sale end date (if applicable)
    sku: string;                        // Product SKU (Stock Keeping Unit)
    tax: number;                        // Tax percentage
    shippingCost: number;                   // Shipping cost
}


// Product Image Interface
export interface IProductImage {
    url: string;                        // Image URL
    altText: string;                    // Alt text for image
    isPrimary: boolean;                 // Flag to indicate primary image
}

export interface IProductAttribute {
    key: string;                       // Attribute name
    value: string;                      // Attribute value
}

