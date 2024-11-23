import { Schema, model } from "mongoose";
import { IRating } from "./IProductRating.types";

const ProductRatingSchema = new Schema<IRating>({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: false,
        default: "",
    },
}, { timestamps: true });


export const ProductRating = model<IRating>("ProductRating", ProductRatingSchema);