import { Schema, model } from "mongoose";
import { IStoreRating, } from "./IStoreRating,types";

const StoreRatingSchema = new Schema<IStoreRating>({
    storeId: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        required: true,
        default: '',
    },
}, { timestamps: true });

export const StoreRating = model<IStoreRating>("StoreRating", StoreRatingSchema);