import { Schema, model } from "mongoose";

import { IOrder, IOrderItem, IShippingDetails } from "./IOrder";

const OrderItemSchema = new Schema<IOrderItem>({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
});

const ShippingDetailsSchema = new Schema<IShippingDetails>({
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
    contactNumber: { type: String },
    deliveryDate: { type: Date }
})

const OrderSchema = new Schema<IOrder>({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    paymentDetails: {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
    shippingDetails: { type: ShippingDetailsSchema, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'],
        required: true,
        default: 'pending'
    }
})

export const Order = model<IOrder>("Order", OrderSchema);