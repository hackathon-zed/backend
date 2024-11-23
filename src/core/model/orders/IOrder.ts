import { Types } from "mongoose";

export interface IOrder {
    _id: Types.ObjectId;                   // MongoDB ObjectId
    customerId: Types.ObjectId;            // Reference to ICustomer
    items: IOrderItem[];                   // List of items in the order
    totalAmount: number;                   // Total cost of the order
    paymentDetails: Types.ObjectId;       // Payment information
    shippingDetails: IShippingDetails;     // Shipping address and details
    status: "pending" | "confirmed" | "shipped" | "delivered" | "canceled"; // Order status
    createdAt: Date;                       // Timestamp for order creation
    updatedAt: Date;                       // Timestamp for last update
}

export interface IOrderItem {
    productId: Types.ObjectId;             // Reference to the product
    productName: string;                   // Name of the product
    quantity: number;                      // Quantity ordered
    price: number;                         // Price per unit
    discount?: number;                     // Discount applied to the item
    totalPrice: number;                    // Total price for the item (quantity * price)
}

export interface IShippingDetails {
    address: string;                       // Shipping address
    city: string;                          // City
    state: string;                         // State/Region
    postalCode: string;                    // Postal code
    country: string;                       // Country
    contactNumber: string;                 // Contact phone number
    deliveryDate?: Date;                   // Optional expected delivery date
}
