import { Types } from "mongoose";

export interface IPayment {
    _id: Types.ObjectId;                   // MongoDB ObjectId
    orderId: Types.ObjectId;               // Reference to the related Order
    customerId: Types.ObjectId;            // Reference to ICustomer
    paymentMethod: "Khalti" | "esewa" | "cash_on_delivery"; // Payment method
    transactionId?: string;                // Optional transaction ID (for online payments)
    paymentStatus: "pending" | "completed" | "failed" | "refunded"; // Payment status
    amount: number;                        // Total payment amount
    paymentDate: Date;                     // Date of payment
}