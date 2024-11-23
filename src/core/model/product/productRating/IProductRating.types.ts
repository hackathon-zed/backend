import { Types } from 'mongoose';

export interface IRating {
    _id: Types.ObjectId;                  // MongoDB ObjectId
    productId: Types.ObjectId;            // Reference to Product schema
    customerId: Types.ObjectId;           // Reference to Customer schema
    rating: number;                       // Rating value (e.g., 1-5)
    comment?: string;                     // Optional review comment
    createdAt: Date;                      // Timestamp for rating submission
    updatedAt: Date;                      // Timestamp for last update
}

// Product Rating Interface
export interface IProductRating {
    _id: Types.ObjectId;                  // MongoDB ObjectId
    productId: Types.ObjectId;            // Reference to Product schema
    averageRating: number;                // Average rating for the product
    totalRatings: number;                 // Total number of ratings
    ratings: IRating[];                   // List of individual ratings
    createdAt: Date;                      // Timestamp for rating creation
    updatedAt: Date;                      // Timestamp for last update
}