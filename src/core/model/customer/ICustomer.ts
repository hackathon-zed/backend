import { Types } from "mongoose";
import { IPreferences } from "../preferences/IPrefences.types";

export interface ICustomer {
    _id: Types.ObjectId;
    name: string;
    email?: string;
    passwordHash?: string;
    phone?: string;
    role: string;                   // enum ["customer", "admin", "superadmin"]
    metadata: IMetadata;
    preferences: IPreferences;
    wishlist?: Types.ObjectId[];    // Reference to products
    orders?: Types.ObjectId[];      // Reference to orders
    cart: ICartItem[];              // Array of cart items
    createdAt: Date;
    updatedAt: Date;
}

export interface IMetadata {
    googleId?: string;                  // Optional, for Google users
    facebookId?: string;                // Optional, for Facebook users
    phoneVerified?: boolean;            // Indicates if phone number is verified
    emailVerified?: boolean;            // Indicates if email is verified
    provider: "google" | "facebook" | "phone" | "local"; // Enum for authentication providers
    profileImageUrl?: string;           // Optional, URL to profile image
}


export interface ICartItem {
    productId: Types.ObjectId;           // Reference to the product
    quantity: number;                    // Quantity of the product
    priceAtAdded: number;                // Price when the product was added to the cart
    addedAt: Date;                       // Timestamp of when the item was added
}
