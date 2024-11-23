import { Types } from "mongoose";

export interface IStoreRating { 
    _id: Types.ObjectId;
    storeId: Types.ObjectId;
    customerId: Types.ObjectId;
    rating: number;
    review: string;
    createdAt: Date;
}