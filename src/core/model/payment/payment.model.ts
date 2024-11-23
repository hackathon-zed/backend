import { Schema, model } from "mongoose";
import { IPayment } from "./Ipaymeent.types";

const PaymentSchema = new Schema<IPayment>({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'online'],
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        required: true,
    },
}, { timestamps: true });


export const Payment = model<IPayment>("Payment", PaymentSchema);