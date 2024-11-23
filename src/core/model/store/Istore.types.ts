import { Types } from "mongoose"
import { IStoreRating } from "./storeRating";

export interface IStore {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    owner: string;
    email?: string;
    phone?: string;
    address?: IAddress;
    products: Types.ObjectId[];
    categories?: Types.ObjectId[];
    ratings?: IStoreRating[];
    metadata: IStoreMetadata;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    zip: string;
}


export interface IStoreMetadata {
    verified: boolean;
    businessType: 'individual' | 'company';
    businessId?: string;
    businessLicense?: string;
    businessLicenseImage?: string;
    profileImageUrl?: string;
    coverImageUrl?: string;
    socialLinks?: ISocialLinks;
}

export interface ISocialLinks {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
}