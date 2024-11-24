import { Schema, model } from "mongoose";
import { IProduct } from "./iProduct.types";


const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    attributes: {
        type: [String],
        required: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    images: {
        type: [String],
        required: false,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    ratings: {
        type: [Schema.Types.ObjectId],
        ref: 'ProductRating',
        default: [],
    },

    shippingCost: {
        type: Number,
        default: 0,

    },
    tax: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    isOnSale: {
        type: Boolean,
        default: false,
    },
    salePrice: {
        type: Number,
        required: false,
    },
    saleStartDate: {
        type: Date,
        required: false,
    },
    saleEndDate: {
        type: Date,
        required: false,
    },
    sku: {
        type: String,
    },
}
    , { timestamps: true });


export const Product = model<IProduct>("Product", ProductSchema);