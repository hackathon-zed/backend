import { IStore, IAddress, ISocialLinks, IStoreMetadata } from "./Istore.types";
import { Schema, model } from "mongoose";


const addressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip: { type: String, required: true },
    postalCode: { type: String, required: true },
})

const socialLinksSchema = new Schema<ISocialLinks>({
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
})

const storeMetadataSchema = new Schema<IStoreMetadata>({

    businessId: { type: String },
    businessLicense: { type: String },
    businessLicenseImage: { type: String },
    profileImageUrl: { type: String },
    coverImageUrl: { type: String },
    businessType: { type: String, enum: ['individual', 'company'], default: 'individual' },
    socialLinks: socialLinksSchema,
    verified: { type: Boolean, default: false },
})

const storeSchema = new Schema<IStore>({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: addressSchema,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    ratings: [{ type: Schema.Types.ObjectId, ref: 'StoreRating' }],
    metadata: storeMetadataSchema,
}, { timestamps: true });


export const Store = model<IStore>("Store", storeSchema);